import React from 'react';
import './setting.css';
import { useHistory, useLocation } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

const ProjectSettings = () => {
    const location = useLocation();
    const selectedRepo = location.state ? location.state.selectedRepo : null;

    return (
        <div className="docker-file-generator-container" style={{ marginTop: '40px' }}>
            <div className="docker-file-generator-content">
                <h1>⚙️ Settings ⚙️</h1>
                <p>Actual GitHub Repo: <div style={{ color: '#029d89' }}> {selectedRepo} </div></p>
                <p>
                    Name:
                    <input type="text" className="dark-textfield" style={{ margin:'10px' }}/>
                </p>
                <p>
                    Description:
                    <textarea className="dark-textfield" rows="3" placeholder="Enter description for your Project.." style={{ margin:'10px' }}>
                    </textarea>
                </p>
                <div style={{ position: 'relative', marginBottom: '10px', borderRadius: '12px' }}>
                    <div style={{ position: 'relative', zIndex: 1, border: '1px solid red', padding: '10px', borderRadius: '12px' }}>
                        <p>
                            Once you delete a project, there is no going back. Please be certain.
                            <button className="btn btn-outline-danger" style={{ margin: '15px' }}>
   Delete <i className="fas fa-trash"></i>
</button>                        </p>
                    </div>
                    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to top, rgba(255,0,0,0.2) 0%, rgba(255,0,0,0) 100%)', borderRadius: '12px', zIndex: 0 }}></div>
                </div>
            </div>
        </div>
    );
};

export default ProjectSettings;
