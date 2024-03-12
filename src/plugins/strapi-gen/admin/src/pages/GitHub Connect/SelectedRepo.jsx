import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import './Git.css';

const SelectedRepo = () => {
  const [repos, setRepos] = useState([]);
  const [selectedRepo, setSelectedRepo] = useState('');
  const history = useHistory();

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await axios.get('https://api.github.com/user/repos', {
          headers: {
            Authorization: `token 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`,
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

  const handleNextButtonClick = () => {
    if (!selectedRepo) {
      console.error('Please select a repository');
      return;
    }
    history.push({
      pathname: '/plugins/strapi-gen/Services',
      
    });
  
    history.push({
      pathname: '/plugins/strapi-gen/DockerConfigForm',
      state: { selectedRepo: selectedRepo }
    });
  };

  return (
    <div className="container-fluid">
      <div>
        <h1>Select your Github Repository</h1>
        <p>Choose a repository to push the generated code to.</p>
        <div className="select-container">
          <select onChange={(e) => handleRepoSelect(e)}>
            <option value="">Select a repository</option>
            {repos.map((repo) => (
              <option key={repo.id} value={repo.full_name}>
                {repo.full_name}
              </option>
            ))}
          </select>
        </div>
        {selectedRepo && (
          <div>
            <p>Selected Repository: {selectedRepo}</p>
          </div>
        )}
        <button onClick={handleNextButtonClick}>Next</button>
      </div>
    </div>
  );
};

export default SelectedRepo;
