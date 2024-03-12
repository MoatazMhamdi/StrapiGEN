import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { AnErrorOccurred } from '@strapi/helper-plugin';
import HomePage from '../HomePage/HomePage';
import ProjectNamePage from '../ProjectNamePage/ProjectNamePage';
import GitConnect from '../GitHub Connect/Git';
import SelectedRepo from '../GitHub Connect/SelectedRepo';
import ServicesType from '../Services Type/Services';
import AddEntity from '../AddEntityPage/AddEntity';
import AddAuthPage from '../AddAuthPage/AddAuth';
import ServiceManagementPage from '../ServiceManagement/ServiceManagmentPage';
import OverViewPage from '../OverviewPage/OverViewPage';
import DockerFileGenerator from '../DockerizePage/DockerPage'

const App = () => {
  return (
    <div>
      <Switch>
        <Route path="/plugins/strapi-gen" component={HomePage} exact />
        <Route path="/plugins/strapi-gen/ProjectName" component={ProjectNamePage} />
        <Route path="/plugins/strapi-gen/GitConnect" component={GitConnect} />

        <Route path="/plugins/strapi-gen/Services" component={ServicesType} />
        <Route path="/plugins/strapi-gen/DockerConfigForm" component={DockerFileGenerator} />

        <Route path="/plugins/strapi-gen/Entities" component={AddEntity} />
        <Route path="/plugins/strapi-gen/AddAuth" component={AddAuthPage} />
        <Route path="/plugins/strapi-gen/ServiceManagement" component={ServiceManagementPage} />
        <Route path="/plugins/strapi-gen/selectedrepository" component={SelectedRepo} />

     
        <Route path="/plugins/strapi-gen/Overview" component={OverViewPage} />

        <Route component={AnErrorOccurred} />
      </Switch>
    </div>
  );
};

export default App;