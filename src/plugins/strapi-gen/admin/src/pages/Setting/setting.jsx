import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory, useLocation } from 'react-router-dom';
import { FaSync } from 'react-icons/fa'; // Import FaSync icon
import './setting.css';
import RepositoryContents from './RepositoryContents';


const ProjectSettings = () => {
    const location = useLocation();
    const selectedRepoFromLocation = location.state ? location.state.selectedRepo : null;
    const [selectedRepo, setSelectedRepo] = useState(selectedRepoFromLocation);
    const [repos, setRepos] = useState([]);
    const [projectName, setProjectName] = useState(selectedRepo); // Add projectName state
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


    const handleLogout = () => {
        history.push('/auth/login');
      };



    const handleDeleteProject = async () => {
        try {
            if (selectedRepo) {
                // Ask for confirmation before deleting
                const confirmed = window.confirm('Are you sure you want to delete this project? This action cannot be undone.');
    
                if (confirmed) {
                    // Make a DELETE request to GitHub API to delete the repository
                    await axios.delete('https://api.github.com/repos/${selectedRepo}', {
                        headers: {
                            Authorization: 'token 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',
                        },
                    });
    
                    // Optionally, you can show a success message or perform any other action upon successful deletion
                    console.log('Repository deleted successfully.');
                    alert('Your Repository was successfully deleted');
    
                    // Optionally, you can redirect the user to a different page after deletion
                    // history.push('/redirect-url');
                }
            }
        } catch (error) {
            console.error('Error deleting repository:', error);
        }
    };
    
    

    const handleSaveSettings = async () => {
        try {
            // Check if selectedRepo is not empty and project name is not empty
            if (selectedRepo && projectName !== '') {
                // Update the selected repository name with the value entered in the text field
                setSelectedRepo(projectName);
                
                // Make a PATCH request to GitHub API to update repository name
                await axios.patch('https://api.github.com/repos/${selectedRepo}', {
                    name: projectName
                }, {
                    headers: {
                        Authorization: 'token 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',
                        'Content-Type': 'application/json'
                    }
                });
    
                // Optionally, you can show a success message or perform any other action upon successful update
                console.log('Repository name updated successfully.');
            }
        } catch (error) {
            console.error('Error updating repository name:', error);
        }
    };

    const handleRefresh = async () => {
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

    

    return (
        <div className="settings-container" style={{ display: 'flex', alignItems: 'center' }}>
            {/* New container */}
            {/* <div className="docker-file-generator-container" style={{ width: '40%', marginRight: '20px' }}>
                <div className="docker-file-generator-content">
                    <h2>Repository Contents</h2>
                    <RepositoryContents repo={selectedRepo} />
                </div>
            </div> */}
    
            {/* Existing container */}
            <div className="docker-file-generator-container" style={{ marginTop: '40px', width: '80%' }}>
                <div className="docker-file-generator-content">
                    <h1>⚙️ Settings ⚙️</h1>
                    <p>Actual GitHub Repo: <a style={{ color: '#029d89' }}> {selectedRepo} </a></p>
                    <div className="setting-dropdown" style={{ display: 'flex', alignItems: 'center', marginBottom: '50px' }}>
                        <label htmlFor="repositories">Current Repo</label>
                        <select
                            id="repositories"
                            onChange={handleRepoSelect}
                            value={selectedRepo}
                            className="dark-dropdown"
                        >
                            <option value="">Select a Repository from your Git</option>
                            {repos.map((repo) => (
                                <option key={repo.id} value={repo.full_name}>
                                    {repo.full_name} - <span style={{ color: repo.private ? 'red' : 'green' }}>{repo.private ? 'Private' : 'Public'}</span>
                                </option>
                            ))}
                        </select>
                        <button className="btn btn-outline-info" style={{ marginLeft: '10px' }} onClick={handleRefresh}>
                            Refrech
                        </button>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <label htmlFor="projectName">Name:</label>
                        <input
                            type="text"
                            id="projectName"
                            className="dark-textfield"
                            style={{ margin: '10px' }}
                            placeholder="Change your Project name.."
                            value={projectName} // Add value prop
                            onChange={(e) => setProjectName(e.target.value)} // Add onChange handler
                        />
                        <button className="btn btn-info" style={{ margin: '15px' }} onClick={handleSaveSettings}>
                        PATCH
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
                        <button className="btn btn-info" style={{ margin: '15px' }} onClick={handleSaveSettings}>
                            PATCH
                        </button>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <label htmlFor="description">Logout from your session:</label>
                        
                        <button className="btn btn-danger" style={{ margin: '15px' }} onClick={handleLogout}>
                            Logout <i className="fas fa-sign-out-alt"></i>
                        </button>
                    </div>
                    <div style={{ position: 'relative', marginBottom: '10px', borderRadius: '12px', marginTop: '40px' }}>
                        <div style={{ position: 'relative', zIndex: 1, border: '1px solid red', padding: '10px', borderRadius: '10px', height: '85px' }}>
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
        </div>
    );
    
};

export default ProjectSettings;