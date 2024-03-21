import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory, useLocation } from 'react-router-dom';
import './setting.css';

const ProjectSettings = () => {
    const location = useLocation();
    const selectedRepoFromLocation = location.state ? location.state.selectedRepo : null;
    const [selectedRepo, setSelectedRepo] = useState(selectedRepoFromLocation);
    const [repos, setRepos] = useState([]);
    const history = useHistory();

    useEffect(() => {
        const fetchRepos = async () => {
            try {
                const response = await axios.get('https://api.github.com/user/repos', {
                    headers: {
                        Authorization: 'token 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',
                    },
                });
                setRepos(response.data);
            } catch (error) {
                console.error('Error fetching repositories:', error);
            }
        };

        fetchRepos();
    }, []);

    const handleRepoSelect = (e) => {
        const selectedFullName = e.target.value;
        setSelectedRepo(selectedFullName);
    };

    const handleSaveSettings = () => {
        // Implement save settings logic here
    };

    const handleDeleteProject = () => {
        // Implement delete project logic here
    };

    return (
        <div className="docker-file-generator-container" style={{ marginTop: '40px' }}>
            <div className="docker-file-generator-content">
                <h1>⚙️ Settings ⚙️</h1>
                <p>Actual GitHub Repo: <a style={{ color: '#029d89' }}> {selectedRepo} </a></p>
                <div className="setting-dropdown" style={{ display: 'flex', alignItems: 'center' }}>
                    <label htmlFor="repositories">Current Repo</label>
                    <select
                        id="repositories"
                        onChange={handleRepoSelect}
                        value={selectedRepo}
                        className="dark-dropdown"
                    >
                        <option value="">Select a repository</option>
                        {repos.map((repo) => (
                            <option key={repo.id} value={repo.full_name}>
                                {repo.full_name} - <span style={{ color: repo.private ? 'red' : 'green' }}>{repo.private ? 'Private' : 'Public'}</span>
                            </option>
                        ))}
                    </select>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <label htmlFor="projectName">Name:</label>
                    <input 
                        type="text" 
                        id="projectName" 
                        className="dark-textfield" 
                        style={{ margin: '10px' }} 
                        placeholder="Change your Project name.." 
                        value={selectedRepo}
                    />
                    <button className="btn btn-outline-info" style={{ margin: '15px' }} onClick={handleSaveSettings}>
                        Change 
                    </button>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        className="dark-textfield"
                        rows="3"
                        placeholder="Enter description for your Project.."
                        style={{ margin: '10px' }}
                    />
                    <button className="btn btn-outline-info" style={{ margin: '15px' }} onClick={handleSaveSettings}>
                        Change 
                    </button>
                </div>
                <div style={{ position: 'relative', marginBottom: '10px', borderRadius: '12px' }}>
                    <div style={{ position: 'relative', zIndex: 1, border: '1px solid red', padding: '10px', borderRadius: '12px' }}>
                        <p>
                            Once you delete a project, there is no going back. Please be certain.
                            <button onClick={handleDeleteProject} className="btn btn-outline-danger" style={{ margin: '15px' }}>
                                Delete <i className="fas fa-trash"></i>
                            </button>
                        </p>
                    </div>
                    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to top, rgba(255,0,0,0.2) 0%, rgba(255,0,0,0) 100%)', borderRadius: '12px', zIndex: 0 }}></div>
                </div>
 
             </div>
        </div>
    );
};

export default ProjectSettings;
