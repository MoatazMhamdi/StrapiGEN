import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './ForumPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

const ForumPage = () => {
  const [formData, setFormData] = useState({
    databaseClient: '',
    databaseHost: '',
    databasePort: '',
    databaseName: '',
    databaseUsername: '',
    databasePassword: '',
    jwtSecret: '',
    adminJwtSecret: '',
    appKeys: '',
    nodeEnv: '',
  });

  const history = useHistory();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Generate docker-compose.yaml content
    const dockerComposeContent = `version: "3"
services:
  strapi:
    container_name: strapi
    # Add other configuration based on form inputs
    environment:
      DATABASE_CLIENT: ${formData.databaseClient}
      DATABASE_HOST: ${formData.databaseHost}
      DATABASE_PORT: ${formData.databasePort}
      DATABASE_NAME: ${formData.databaseName}
      DATABASE_USERNAME: ${formData.databaseUsername}
      DATABASE_PASSWORD: ${formData.databasePassword}
      JWT_SECRET: ${formData.jwtSecret}
      ADMIN_JWT_SECRET: ${formData.adminJwtSecret}
      APP_KEYS: ${formData.appKeys}
      NODE_ENV: ${formData.nodeEnv}
    # Add other sections like volumes, ports, networks, etc.
`;

    // Log docker-compose.yaml content to console
    console.log(dockerComposeContent);
  };

  return (
    <div className="container-fluid">
      <div className="form-container">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Docker Forum</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {Object.keys(formData).map((fieldName) => (
            <div key={fieldName} className="mb-4">
              <label htmlFor={fieldName} className="form-label">
                {fieldName}
                <i className="fa fa-question-circle text-gray-500 ml-2" aria-hidden="true" />
                <span className="form-description">
                  Provide the {fieldName} value for your Strapi application.
                </span>
              </label>
              <input
                type="text"
                name={fieldName}
                value={formData[fieldName]}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
          ))}
          <button
            type="submit"
            className="btn btn-primary btn-block"
          >
            Generate Docker Compose
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForumPage;