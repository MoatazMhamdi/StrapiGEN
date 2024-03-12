import React, { useState } from 'react';
import { useHistory,useLocation } from "react-router-dom";

const ServiceManagementPage = () => {
  const history = useHistory();

  const location = useLocation();
  const selectedRepo = location.state ? location.state.selectedRepo : null;

  const redirectToOverview = () => {
    history.push("/plugins/strapi-gen/Overview");
  };
  const handleDockerizeProject = () => {
    history.push({
      pathname: '/plugins/strapi-gen/DockerConfigForm',
      state: { selectedRepo: selectedRepo }
    });
  };
  return (
    <div className="home-page">
      <div className="title-section">
        <h2>Service created successfully<span role="img" aria-label="Congratulations" style={{ fontSize: "1.5rem", marginLeft: "10px" }}>🎉</span></h2>
        <p>What should we do next?</p>
      </div>
      <div className="flex space-x-10">
        <div className="box">
          <h3>Create entities for my service</h3>
          <span role="img" aria-label="File Manager">📁</span>
        </div>
        <div className="box" onClick={handleDockerizeProject}>
          <h3>Dockerize your project</h3>
          <span role="img" aria-label="Docker">🐳</span>
        </div>
        <div className="box" onClick={redirectToOverview}>
          <h3>I’m done! View my services</h3>
          <span role="img" aria-label="Rocket">🚀</span>
        </div>
      </div>
    </div>
  );
};

export default ServiceManagementPage;