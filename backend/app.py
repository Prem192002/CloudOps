from flask import Flask, request, jsonify
import subprocess
import shutil
import os
import paramiko  # For SSH access to EC2
from flask_cors import CORS
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
CORS(app)

# AWS & EC2 Configuration from environment variables
AWS_ACCOUNT_ID = os.getenv('AWS_ACCOUNT_ID')
AWS_REGION = os.getenv('AWS_REGION')
ECR_REPO_NAME = os.getenv('ECR_REPO_NAME')
EC2_HOST = os.getenv('EC2_HOST')
EC2_USERNAME = os.getenv('EC2_USERNAME')
EC2_PRIVATE_KEY = os.getenv('EC2_PRIVATE_KEY')

@app.route('/deploy', methods=['POST'])
def deploy():
    data = request.json
    repo_url = data['repoUrl']

    # Remove old application directory if exists
    if os.path.exists('app'):
        print("Removing existing 'app' directory...")
        shutil.rmtree('app')

    # Clone the GitHub repository
    print("Cloning the repository...")
    clone_process = subprocess.run(f"git clone {repo_url} app", shell=True, text=True, capture_output=True)
    if clone_process.returncode != 0:
        return jsonify({'message': f'Failed to clone repository: {clone_process.stderr}'}), 500

    # Build Docker image
    print("Building Docker image...")
    build_process = subprocess.run("cd app && docker build -t myapp .", shell=True, text=True, capture_output=True)
    if build_process.returncode != 0:
        return jsonify({'message': f'Failed to build Docker image: {build_process.stderr}'}), 500

    # Tag Docker image for ECR
    ecr_url = f"{AWS_ACCOUNT_ID}.dkr.ecr.{AWS_REGION}.amazonaws.com/{ECR_REPO_NAME}:latest"
    print(f"Tagging Docker image: docker tag myapp:latest {ecr_url}")
    tag_command = f"docker tag myapp:latest {ecr_url}"
    tag_process = subprocess.run(tag_command, shell=True, text=True, capture_output=True)
    if tag_process.returncode != 0:
        return jsonify({'message': f'Failed to tag Docker image: {tag_process.stderr}'}), 500

    # Push Docker image to AWS ECR
    print(f"Pushing Docker image to AWS ECR: {ecr_url}")
    push_command = f"docker push {ecr_url}"
    push_process = subprocess.run(push_command, shell=True, text=True, capture_output=True)
    if push_process.returncode != 0:
        # Capture error output
        error_msg = push_process.stderr if push_process.stderr else "Unknown error"
        print(f"Error pushing Docker image: {error_msg}")
        return jsonify({'message': f'Failed to push Docker image: {error_msg}'}), 500
    else:
        print(f"Push successful: {push_process.stdout}")

    # Deploy on EC2 instance
    try:
        deploy_on_ec2(ecr_url)
    except Exception as e:
        return jsonify({'message': f'Failed to deploy on EC2: {str(e)}'}), 500

    return jsonify({'message': 'Deployment successful!'}), 200

def deploy_on_ec2(ecr_url):
    print(f"Connecting to EC2 instance: {EC2_HOST}...")
    print(f"Using private key: {EC2_PRIVATE_KEY}")
    ssh_key_path = EC2_PRIVATE_KEY.replace("\\", "/")  # Fix Windows path
    ssh_client = paramiko.SSHClient()
    ssh_client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    try:
        ssh_client.connect(EC2_HOST, username=EC2_USERNAME, key_filename=ssh_key_path)
        print("SSH connection successful.")
    except Exception as e:
        raise Exception(f"SSH connection failed: {str(e)}")

    commands = [
        "docker stop myapp-container || true",
        "docker rm myapp-container || true",
        f"docker pull {ecr_url}",
        f"docker run -d --name myapp-container -p 8000:8000 {ecr_url}"
    ]

    for cmd in commands:
        stdin, stdout, stderr = ssh_client.exec_command(cmd)
        exit_status = stdout.channel.recv_exit_status()
        output = stdout.read().decode()
        error_output = stderr.read().decode()
        print(f"Executing: {cmd}")
        print(f"Output: {output}")
        if exit_status != 0:
            raise Exception(f"Command failed: {cmd}\nError: {error_output}")
        if error_output:
            print(f"Warning: {error_output}")

    ssh_client.close()
    print("Deployment completed on EC2.")

if __name__ == '__main__':
    app.run(debug=True)