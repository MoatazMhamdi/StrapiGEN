import React, { useState } from 'react';
import './ModelPage.css';

const ModelPage = () => {
  const [isGraphQLSelected, setIsGraphQLSelected] = useState(true);
  const [isAPIMetaSelected, setIsAPIMetaSelected] = useState(false);
  const [isDeleteUserSelected, setIsDeleteUserSelected] = useState(false);
  const [isUpdateUserSelected, setIsUpdateUserSelected] = useState(false);
  const [isCreateUserSelected, setIsCreateUserSelected] = useState(false);
  const [isUserSelected, setIsUserSelected] = useState(false);
  const [selectedModule, setSelectedModule] = useState('user');
  const [searchTerm, setSearchTerm] = useState('');

  const handleGraphQLSwitchChange = () => {
    setIsGraphQLSelected(!isGraphQLSelected);
  };

  const handleAPIMetaSwitchChange = () => {
    setIsAPIMetaSelected(!isAPIMetaSelected);
  };

  const handleDeleteUserSwitchChange = () => {
    setIsDeleteUserSelected(!isDeleteUserSelected);
  };

  const handleUpdateUserSwitchChange = () => {
    setIsUpdateUserSelected(!isUpdateUserSelected);
  };

  const handleCreateUserSwitchChange = () => {
    setIsCreateUserSelected(!isCreateUserSelected);
  };

  const handleUserSwitchChange = () => {
    setIsUserSelected(!isUserSelected);
    setSelectedModule('user');
  };

  const handleCategorySwitchChange = () => {
    setSelectedModule('category');
  };

  const getAPIPath = (path) => {
    if (selectedModule === 'category') {
      return path.replace('user', 'category');
    }
    return path;
  };

  const filteredModules = ['user', 'category'].filter(module =>
    module.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <div className="top-container">
        <div className="customize-container">
          <div className="title">Customize your services</div>
          <div className="description">
            Here you can choose the services you want to use and customize their behavior.
          </div>
        </div>
        <div className="switch-container">
          <div className="api-label">GraphQL API</div>
          <label className="switch">
            <input type="checkbox" onChange={handleGraphQLSwitchChange} checked={isGraphQLSelected} />
            <span className="slider round"></span>
          </label>
          <div className="api-label">REST API</div>
        </div>
      </div>
      <div className="bottom-container">
        <div className="left-container">
          <div className="search-container-wrapper">
            <div className="search-container">
              <input 
                type="text" 
                placeholder="SEARCH" 
                className="search-input" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="modules-container">
              {filteredModules.map(module => (
                <div 
                  key={module} 
                  className={`module ${module}-module`} 
                  onClick={module === 'user' ? handleUserSwitchChange : handleCategorySwitchChange}
                >
                  {module.toUpperCase()}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="right-container">
          <div className="api-container-wrapper">
            <div className="api-container">
              {/* API description */}
              <div className="api-description">
                {selectedModule === 'user' ? 'Here you can manage user-related operations.' : 'Here you can manage category-related operations.'}
              </div>
              {/* API items */}
              <div className="api-item-container">
                {/* New User box */}
                {selectedModule === 'user' && (
                  <div className="api-item">
                    <div className="switch-container-small">
                      <label className="switch-small">
                        <input type="checkbox" onChange={handleUserSwitchChange} checked={isUserSelected} />
                        <span className="slider-small round"></span>
                      </label>
                    </div>
                    <div className="method">GET</div>
                    <div className="path">{getAPIPath('/api/user')}</div>
                    <div className="description">User</div>
                  </div>
                )}
                {/* New Category box */}
                {selectedModule === 'category' && (
                  <div className="api-item">
                    <div className="switch-container-small">
                      <label className="switch-small">
                        <input type="checkbox" onChange={handleCategorySwitchChange} checked={!isUserSelected} />
                        <span className="slider-small round"></span>
                      </label>
                    </div>
                    <div className="method">GET</div>
                    <div className="path">{getAPIPath('/api/category')}</div>
                    <div className="description">Category</div>
                  </div>
                )}
                {/* Existing boxes */}
                <div className="api-item">
                  <div className="switch-container-small">
                    <label className="switch-small">
                      <input type="checkbox" onChange={handleAPIMetaSwitchChange} checked={isAPIMetaSelected} />
                      <span className="slider-small round"></span>
                    </label>
                  </div>
                  <div className="method">GET</div>
                  <div className="path">{getAPIPath('/api/user/:id/meta')}</div>
                  <div className="description">USERS META</div>
                </div>
                <div className="api-item">
                  <div className="switch-container-small">
                    <label className="switch-small">
                      <input type="checkbox" onChange={handleDeleteUserSwitchChange} checked={isDeleteUserSelected} />
                      <span className="slider-small round"></span>
                    </label>
                  </div>
                  <div className="method">DELETE</div>
                  <div className="path">{getAPIPath('/api/user/:id')}</div>
                  <div className="description">Delete User</div>
                </div>
                <div className="api-item">
                  <div className="switch-container-small">
                    <label className="switch-small">
                      <input type="checkbox" onChange={handleUpdateUserSwitchChange} checked={isUpdateUserSelected} />
                      <span className="slider-small round"></span>
                    </label>
                  </div>
                  <div className="method">PATCH</div>
                  <div className="path">{getAPIPath('/api/user/:id')}</div>
                  <div className="description">Update User</div>
                </div>
                <div className="api-item">
                  <div className="switch-container-small">
                    <label className="switch-small">
                      <input type="checkbox" onChange={handleCreateUserSwitchChange} checked={isCreateUserSelected} />
                      <span className="slider-small round"></span>
                    </label>
                  </div>
                  <div className="method">POST</div>
                  <div className="path">{getAPIPath('/api/user')}</div>
                  <div className="description">Create User</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Duplicate of the search wrapper */}
      <div className="left-container">
        <div className="search-container-wrapper">
          {/* Text field for committing changes */}
          <input 
            type="text" 
            placeholder="Commit your changes" 
            className="search-input" 
          />
          {/* Button to generate code */}
          <button className="button">Generate the code</button>
          {/* Button to go to view code */}
          <button className="button">Go to view code</button>
        </div>
      </div>
    </div>
  );
};

export default ModelPage;