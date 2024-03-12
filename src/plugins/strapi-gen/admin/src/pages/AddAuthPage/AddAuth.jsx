import React from "react";
import { useHistory ,useLocation} from "react-router-dom";
import pluginId from "../../pluginId";
import './AddAuth.css';

const AddAuthPage = () => {
  const history = useHistory();
  const location = useLocation();
  const selectedRepo = location.state ? location.state.selectedRepo : null; // Import de useHistory

  // Fonction de redirection vers ServiceManagementPage
  const redirectToServiceManagement = () => {
    history.push({
      pathname: '/plugins/strapi-gen/ServiceManagement',
      state: { selectedRepo: selectedRepo }
    });
  };

  return (
    <div className="home-page">
      <div className="title-section">
        <h2>Does your service need Authentication?</h2>
        <p>Choose whether or not to enable authentication and authorization for your service.</p>
      </div>
      <div className="flex space-x-10">
        {/* Ajoutez un onClick pour déclencher la redirection vers ServiceManagementPage */}
        <div className="box" onClick={redirectToServiceManagement}>
          <h3>Include Auth Module</h3>
          <p>Generate the code needed for authentication and authorization.</p>
        </div>
        <div className="box" onClick={redirectToServiceManagement}>
          <h3>Skip Auth Module</h3>
          <p>Do not include code for authentication.</p>
        </div>
      </div>
    </div>
  );
};

export default AddAuthPage;
