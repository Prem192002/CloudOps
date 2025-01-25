from flask import Flask, request, jsonify
import subprocess
import shutil
import os
from flask_cors import CORS  # Import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/deploy', methods=['POST'])
def deploy():
    data = request.json
    repo_url = data['repoUrl']

    # Remove the 'app' directory if it exists to ensure a clean start
    if os.path.exists('app'):
        print("Removing existing 'app' directory...")
        shutil.rmtree('app')  # Use shutil to remove the directory

    # Clone the repo and build Docker image
    print("Cloning the repository...")
    clone_process = subprocess.run(f"git clone {repo_url} app", shell=True, text=True, capture_output=True)
    print("Git Clone stdout:", clone_process.stdout)
    print("Git Clone stderr:", clone_process.stderr)

    if clone_process.returncode != 0:
	 return jsonify({'message': f'Failed to clone the repository: {clone_process.stderr}'}), 500

    print("Building Docker image...")
    build_process = subprocess.run("cd app && docker build -t myapp .", shell=True, text=True, capture_output=True)
    print("Docker Build stdout:", build_process.stdout)
    print("Docker Build stderr:", build_process.stderr)

    if build_process.returncode != 0:
        return jsonify({'message': f'Failed to build the Docker image: {build_process.stderr}'}), 500

    # Push the image to AWS ECR (Assume credentials are set)
    print("Tagging the Docker image...")
    tag_process = subprocess.run("docker tag myapp:latest 992382487320.dkr.ecr.ap-south-1.amazonaws.com/myapp:latest",
                                 shell=True, text=True, capture_output=True)
    print("Docker Tag stdout:", tag_process.stdout)
    print("Docker Tag stderr:", tag_process.stderr)

    if tag_process.returncode != 0:
        return jsonify({'message': f'Failed to tag the Docker image: {tag_process.stderr}'}), 500

print("Pushing the Docker image to AWS ECR...")
    push_process = subprocess.run("docker push 992382487320.dkr.ecr.ap-south-1.amazonaws.com/myapp:latest",
                                  shell=True, text=True, capture_output=True)
    print("Docker Push stdout:", push_process.stdout)
    print("Docker Push stderr:", push_process.stderr)

    if push_process.returncode != 0:
        return jsonify({'message': f'Failed to push the Docker image: {push_process.stderr}'}), 500

    return jsonify({'message': 'Deployment started successfully'}), 200

    if __name__ == '__main__':
    app.run(debug=True)