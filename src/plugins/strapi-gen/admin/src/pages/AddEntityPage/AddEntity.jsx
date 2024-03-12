import React from "react";
import { useHistory ,useLocation} from "react-router-dom";
import pluginId from "../../pluginId";
import './AddEntity.css';

const AddEntity = () => {
  const history = useHistory();
  const location = useLocation();
  const selectedRepo = location.state ? location.state.selectedRepo : null;

  // Fonction de redirection vers AddAuthPage
  const redirectToAddAuth = () => {
    history.push({
      pathname: '/plugins/strapi-gen/AddAuth',
      state: { selectedRepo: selectedRepo }
    });
  };

  return (
    <div className="home-page">
      <div className="title-section">
        <h2>Add entities to your data model ?</h2>
        <p>
          Start from an empty schema or use one of our templates to jump-start your DB with a pre-defined set of entities and fields based on popular use cases
        </p>
      </div>
      <div className="flex space-x-10">
        {/* Ajoutez un onClick pour déclencher la redirection vers AddAuthPage */}
        <div className="box" onClick={redirectToAddAuth}>
          <h3>Empty</h3>
          <p>(Start from Scratch)</p>
          <p color="grey">Manually define your own entities and fields</p>
        </div>
        <div className="box" onClick={redirectToAddAuth}>
          <h3>Use a Template</h3>
          <p>(Order Management)</p>
          <p color="grey">Pre-defined set of entities and fields Address, Orders, User</p>
        </div>
      </div>
    </div>
  );
};

export default AddEntity;