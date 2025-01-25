import { useState } from 'react';
import axios from 'axios';

function DeployForm() {
    const [repoUrl, setRepoUrl] = useState('');
    const [platform, setPlatform] = useState('AWS');

    const handleDeploy = async () => {
        try {
            const response = await axios.post('http://localhost:5000/deploy', {
                repoUrl
            });
            alert(response.data.message);
        } catch (error) {
            console.error("Deployment failed:", error);
            alert("Deployment failed. Check console for details.");
        }
    };
    

    return (
        <div>
            <h2>Deploy Your Application</h2>
            <input 
              type="text" 
              placeholder="GitHub Repo URL" 
              value={repoUrl} 
              onChange={(e) => setRepoUrl(e.target.value)} 
            />
            <select value={platform} onChange={(e) => setPlatform(e.target.value)}>
                <option value="AWS">AWS</option>
            </select>
            <button onClick={handleDeploy}>Deploy</button>
        </div>
    );
}

export default DeployForm;
