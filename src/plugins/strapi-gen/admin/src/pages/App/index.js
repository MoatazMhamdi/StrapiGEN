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
import DockerFileGenerator from '../DockerizePage/DockerPage';
import DockerizationSuccessPage from '../DockerizePage/dockerizeSuccessfully';
import FAQPage from '../FAQ_Section/FAQpage';
import ProjectSettings from '../Setting/setting';
import 'bootstrap/dist/css/bootstrap.min.css';
import ContentTypeList from '../EntityComponant/EntityListPage';// Assuming the path is correct
import GenerateCodeComponent from '../ServiceGeneration/GenerateCodeComponent';
import EntityDetails from '../EntityComponant/EntityDetailsPage';


import '@fortawesome/fontawesome-free/css/all.min.css';



const App = () => {
  return (
    <div>
      <Switch>
        <Route path="/plugins/strapi-gen" component={HomePage} exact />
        <Route path="/plugins/strapi-gen/ProjectName" component={ProjectNamePage} />
        <Route path="/plugins/strapi-gen/dockersuccess" component={DockerizationSuccessPage} />

        <Route path="/plugins/strapi-gen/GitConnect" component={GitConnect} />

        <Route path="/plugins/strapi-gen/Services" component={ServicesType} />
        <Route path="/plugins/strapi-gen/DockerConfigForm" component={DockerFileGenerator} />
        <Route path="/plugins/strapi-gen/settings" component={ProjectSettings} />

        <Route path="/plugins/strapi-gen/Entities" component={AddEntity} />
        <Route path="/plugins/strapi-gen/AddAuth" component={AddAuthPage} />
        <Route path="/plugins/strapi-gen/ServiceManagement" component={ServiceManagementPage} />
        <Route path="/plugins/strapi-gen/selectedrepository" component={SelectedRepo} />
        <Route path="/plugins/strapi-gen/faq_section" component={FAQPage} />

        <Route path="/plugins/strapi-gen/ServiceGenerate" component={GenerateCodeComponent} />
        <Route path="/plugins/strapi-gen/entities/:uid" component={EntityDetails} />
        <Route path="/plugins/strapi-gen/entities" component={ContentTypeList} />
     
        <Route path="/plugins/strapi-gen/Overview" component={OverViewPage} />

        <Route component={AnErrorOccurred} />
      </Switch>
    </div>
  );
};

export default App;