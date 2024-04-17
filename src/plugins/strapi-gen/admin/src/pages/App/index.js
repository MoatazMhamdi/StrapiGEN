import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { AnErrorOccurred } from '@strapi/helper-plugin';
import HomePage from '../HomePage/HomePage';
import ProjectNamePage from '../ProjectNamePage/ProjectNamePage';
import GitConnect from '../GitHub Connect/Git';
import ServicesType from '../Services Type/Services';
import AddEntity from '../AddEntityPage/AddEntity';
import AddAuthPage from '../AddAuthPage/AddAuth';
import ServiceManagementPage from '../ServiceManagement/ServiceManagmentPage';
import OverViewPage from '../OverviewPage/OverViewPage';
import AddEntityForm from '../EntityComponant/AddEntityForm';
import EntitiesListPage from '../EntityComponant/EntityListPage';
import SelectedRepo from '../GitHub Connect/SelectedRepo';
import DockerFileGenerator from '../docker/DockerFileGenerator';
import ModelPage from '../ModelPage/ModelPage';
import ForumPage from '../docker/Dockerfileform';
import ContentTypeList from '../EntityComponant/EntityListPage';// Assuming the path is correct
import GenerateCodeComponent from '../ServiceGeneration/GenerateCodeComponent';
import DataModelPage from '../DataModelPage/DataModelPage';

const App = () => {
  return (
    <div>
      <Switch>
        <Route path="/plugins/strapi-gen" component={HomePage} exact />
        <Route path="/plugins/strapi-gen/ProjectName" component={ProjectNamePage} />
        <Route path="/plugins/strapi-gen/GitConnect" component={GitConnect} />

        <Route path="/plugins/strapi-gen/Services" component={ServicesType} />

        <Route path="/plugins/strapi-gen/Entities" component={AddEntity} />
        <Route path="/plugins/strapi-gen/AddAuth" component={AddAuthPage} />
        <Route path="/plugins/strapi-gen/ServiceManagement" component={ServiceManagementPage} />

        <Route path="/plugins/strapi-gen/Overview" component={OverViewPage} />
        <Route path="/plugins/strapi-gen/ListEntity" component={ContentTypeList} />
        <Route path="/plugins/strapi-gen/selectedrepository" component={SelectedRepo} />
        <Route path="/plugins/strapi-gen/createdockerfile" component={DockerFileGenerator} />
        <Route path="/plugins/strapi-gen/ModelPage" component={ModelPage} />

        <Route path="/plugins/strapi-gen/DockerComposer" component={ForumPage} />
        <Route path="/plugins/strapi-gen/ServiceGenerate" component={GenerateCodeComponent} />
        <Route path="/plugins/strapi-gen/DataModel" component={DataModelPage} />



        <Route component={AnErrorOccurred} />
      </Switch>
    </div>
  );
};

export default App;