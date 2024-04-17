import React from 'react';
import { useHistory } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const history = useHistory();

  const handleStartClick = () => {
    history.push('/plugins/strapi-gen/ProjectName');
  };

  return (
    <div className="container-fluid">
      <div>
        <h1>
          Welcome to <span>StrapiGEN</span>
        </h1>
        <p>Let's help you create new web Services</p>
        <button
          className="focus:outline-none focus:ring-2 focus:ring-[#01deaf] focus:ring-opacity-50 hover:bg-[#029d89] transition-colors"
          onClick={handleStartClick}
        >
          Let's Start
        </button>
      </div>
    </div>
  );
};

export default HomePage;