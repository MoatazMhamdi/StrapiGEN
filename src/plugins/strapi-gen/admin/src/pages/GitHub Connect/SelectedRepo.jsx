import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import './DockerFileGenerator.css'; // Import the CSS file for styling
import strapigenImage from './logoStrapiGen.png'; // Import the image


const SelectedRepo = () => {
  const [repos, setRepos] = useState([]);
  const [selectedRepo, setSelectedRepo] = useState('');
  const [user, setUser] = useState(null); // State to store GitHub user information
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

    const fetchUser = async () => {
      try {
        const response = await axios.get('https://api.github.com/user', {
          headers: {
            Authorization: 'token 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',
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchRepos();
    fetchUser();
  }, []);

  const handleRepoSelect = (e) => {
    const selectedFullName = e.target.value;
    setSelectedRepo(selectedFullName);
  };

  const handleNextButtonClick = () => {
    if (!selectedRepo) {
      console.error('Please select a repository');
      return;
    }

    history.push({
      pathname: '/plugins/strapi-gen/Services',
      state: { selectedRepo: selectedRepo },
    });
  };

  return (
    <div className="docker-file-generator-container" style={{marginTop:'40px'}}> {/* Apply the container styling */}
      <div className="docker-file-generator-content"> {/* Apply the content styling */}
      <img 
            src={strapigenImage} 
            alt="StrapiGEN" 
            className="strapigen-image" 
            style={{ width: '350px', height: 'auto', marginBottom: '-80px'}} // Adjusted width and height
          /> {/* Image */}
        <h1 className="docker-file-generator-title" style={{marginBottom:'30px',marginTop:'50px'}}>Select your Github Repository</h1>
         {/* Apply title styling */}
         {user && (
          <div className="user-info"> {/* Container for user information */}
            <p className="user-name">hello Mr/Mrs {user.login} 👋, StrapiGen is Happy to serve you 🚀</p> {/* Display user name */}
          </div>
        )}
        <p className="docker-file-generator-description" style={{marginBottom:'30px'}}>Choose a repository to push the generated web services you'll create or to dockerize your project ⚡️</p> {/* Apply description styling */}
        <div className="docker-file-generator-inputs"> {/* Apply inputs container styling */}
          <select onChange={(e) => handleRepoSelect(e)} className="docker-file-generator-select"> {/* Apply input styling */}
            <option value="">Select a repository</option>
            {repos.map((repo) => (
              <option key={repo.id} value={repo.full_name}>
                {repo.full_name}
              </option>
            ))}
          </select>
        </div>
        {selectedRepo && <p>Selected Repository: {selectedRepo}</p>}
        <button onClick={handleNextButtonClick} className="docker-file-generator-button" style={{marginTop:'50px'}}>Next</button> {/* Apply button styling */}
      </div>
    </div>
  );
};

export default SelectedRepo;
