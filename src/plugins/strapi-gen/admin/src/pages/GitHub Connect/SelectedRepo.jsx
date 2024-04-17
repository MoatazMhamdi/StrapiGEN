// localStorage.setItem('githubToken', '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')
        // const githubToken = localStorage.getItem('githubToken');

        // console.log(localStorage.key)
        // console.log("GitHub token from localStorage:", githubToken);
        // if (!githubToken) {
        //   console.error('GitHub token not found in localStorage');
        //   return;
        // }

        import React, { useEffect, useState } from 'react';
        import axios from 'axios';
        import { useHistory } from 'react-router-dom';
        import './Git.css';
        
        const SelectedRepo = () => {
          const [repos, setRepos] = useState([]);
          const [selectedRepo, setSelectedRepo] = useState(null);
          const history = useHistory();
        
          useEffect(() => {
            console.log("Fetching repositories...");
            const fetchRepos = async () => {
              try {
                const response = await axios.get('https://api.github.com/user/repos', {
                  headers: {
                    Authorization: 'token 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',
                  },
                });
                console.log('Response:', response);
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
            history.push('/plugins/strapi-gen/Services');
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
                    <button onClick={handleNextButtonClick}>Next</button>
                  </div>
                )}
              </div>
            </div>
          );
        };
        
        export default SelectedRepo;