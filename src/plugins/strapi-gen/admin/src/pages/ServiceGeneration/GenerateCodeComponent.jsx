import React, { useState, useEffect } from 'react';
import { FaSpinner } from 'react-icons/fa'; // Importing the spinner icon from react-icons/fa
import axios from 'axios';
import { useHistory ,useLocation} from 'react-router-dom'; // Import useHistory from react-router-dom
import './GenerateCodeComponent.css'; // Import CSS file
import './DockerFileGenerator.css'; // Import CSS for styling

const CodeGenerator = () => {
  const [method, setMethod] = useState({
    POST: false,
    GET: false,
    PATCH: false,
    DELETE: false,
  });

  const [modelName, setModelName] = useState('');
  const [responseJson, setResponseJson] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [workflowStatus, setWorkflowStatus] = useState(null);
  const [workflowRuns, setWorkflowRuns] = useState([]); // State to hold workflow runs
  const history = useHistory(); // Get the history object
  const location = useLocation();
  const selectedRepo = location.state ? location.state.selectedRepo : null;
  const tokenGitOauth = location.state ? location.state.tokenGitOauth : null; 


  console.log('Selected Repo :', selectedRepo);
  
  const handleModelNameChange = (event) => {
    setModelName(event.target.value);
  };
  
  const toggleMethod = (methodName) => {
    setMethod((prevState) => ({
      ...prevState,
      [methodName]: !prevState[methodName],
    }));
  };

  const generateCode = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        'http://localhost:1337/strapi-gen/generate-backend',
        {
          method: Object.keys(method).filter((key) => method[key]).join(','),
          model: modelName,
          selectedRepo: selectedRepo ,
          tokenGitOauth: tokenGitOauth
        }
      );
      console.log(response.data.message);
      setResponseJson(response.data.message);
      fetchWorkflowStatus();

    } catch (error) {
      console.error('Error generating code:', error);
      // Handle error
    } finally {
      setIsLoading(false);
    }
  };
  const fetchWorkflowStatus = async () => {
    try {
      const response = await axios.get(`https://api.github.com/repos/${selectedRepo}/actions/runs`, {
        headers: {
          Authorization: `Bearer <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>`,
        },
      });
      console.log('Workflow status:', response.data);
      // Get the status of the latest workflow run
      const latestRun = response.data.workflow_runs[0];
      setWorkflowStatus(latestRun.status);
      fetchWorkflowRuns(); // Fetch workflow runs after getting status
    } catch (error) {
      console.error('Error fetching workflow status:', error);
    }
  };

  const fetchWorkflowRuns = async () => {
    try {
      const response = await axios.get(`https://api.github.com/repos/${selectedRepo}/actions/runs`, {
        headers: {
          Authorization: `Bearer <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>`,
        },
      });
      console.log('Workflow runs:', response.data);
      setWorkflowRuns(response.data.workflow_runs);
    } catch (error) {
      console.error('Error fetching workflow runs:', error);
    }
  };

  useEffect(() => {
    if (selectedRepo) {
      fetchWorkflowRuns();
    }
  }, [selectedRepo]);

  const navigateBack = () => {
    history.push('/plugins/strapi-gen/Overview'); // Navigate to the specified route
  };

  return (
    <div className='container'>

      <div className='row align-items-center'>
        <div className='col-3'>
          <div className='container'>
            <div className='row'>
              <h2 className="docker-file-generator-title">
                <strong style={{ fontSize: '1rem', marginBottom: '20px' }}>Select the desired Model</strong></h2>
            </div>
            <div className='row'>
              {/* <label>
                <input
                  type="checkbox"
                  checked={modelName === 'BLOGS'}
                  onChange={() => setModelName(modelName === 'BLOGS' ? '' : 'BLOGS')}
                />
                BLOGS
              </label> */}
              <div className="container">
      <ul className="ks-cboxtags">
        <li>
          <input type="checkbox" id="checkboxOne" value="BLOGS"
          checked={modelName === 'BLOGS'}
          onChange={() => setModelName(modelName === 'BLOGS' ? '' : 'BLOGS')}
           />
          <label htmlFor="checkboxOne">BLOGS</label>
        </li>
        {/* Add other list items similarly */}
      </ul>
    </div>

            </div>
          </div>
        </div>
        <div className='col-9'>
          <div className="docker-file-generator-container">

            <div className="docker-file-generator-content">
              <h2 className="docker-file-generator-title">
                <strong style={{ fontSize: '3rem', marginBottom: '20px' }}>Generate Code</strong></h2>

              <p className="docker-file-generator-description">Your project will be automatically generated with all the selected rest API Toggle , and thanks </p>
              <div style={{ borderRadius: '20px', padding: '20px' }}>

                <div className="toggle-container">

                  <p style={{ color: 'white', marginRight: '15px' }}>tap to enssure the methode Post, Endpoint: "/"</p>
                  <label className="toggle-switch">
                    <input type="checkbox" checked={method.POST} onChange={() => toggleMethod('POST')} />
                    <span className="toggle-slider"></span>
                  </label>
                  <label style={{ color: 'blue', marginLeft: '10px' }}>/POST</label>
                </div>


                <div className="toggle-container">
                  <p style={{ color: 'white', marginRight: '15px' }}>tap to enssure the methode Get, Endpoint: "/All"</p>

                  <label className="toggle-switch">
                    <input type="checkbox" checked={method.GET} onChange={() => toggleMethod('GET')} />
                    <span className="toggle-slider"></span>
                  </label>
                  <label style={{ color: 'green', marginLeft: '10px' }}>/GET</label>
                </div>

                <div className="toggle-container">
                  <p style={{ color: 'white', marginRight: '15px' }}>tap to enssure the methode Patch, Endpoint: "/updateBlog/:id"</p>

                  <label className="toggle-switch">
                    <input type="checkbox" checked={method.PATCH} onChange={() => toggleMethod('PATCH')} />
                    <span className="toggle-slider"></span>
                  </label>
                  <label style={{ color: 'purple', marginLeft: '10px' }}>/PATCH</label>
                </div>


                <div className="toggle-container">
                  <p style={{ color: 'white', marginRight: '15px' }}>tap to enssure the methode Delete, Endpoint: "/delete/:id"</p>

                  <label className="toggle-switch">

                    <input type="checkbox" checked={method.DELETE} onChange={() => toggleMethod('DELETE')} />
                    <span className="toggle-slider"></span>
                  </label>
                  <label style={{ color: 'red', marginLeft: '10px' }}>/DELETE</label>
                </div>


              </div>
              <button className="docker-file-generator-button" onClick={generateCode} style={{ marginTop: '30px' }}>
                {isLoading ? <FaSpinner className="spinner-icon" /> : 'Generate Code'}
              </button>
              {/* Popup modal */}
              {responseJson && (
                <div className="modal">
                  <div className="modal-content">
                    <span className="close" onClick={() => setResponseJson(null)}  style={{ color: 'red'}}>&times;</span>
                    <h2  className='success_message' style={{ color: 'blue'}}>{responseJson}</h2>
                    <p style={{ color: 'purple', marginRight: '2rem' }}>Click <a href={`https://github.com/${selectedRepo}`}>GitHub Repository</a> to view the repository.</p>
                    <pre>{JSON.stringify(responseJson, null, 2)}</pre>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
       {/* Display workflow runs */}
    <div className="row">
      <div className="col">
        <h3>Workflow Runs</h3>
        <ul>
          {workflowRuns.map((run) => (
            <li key={run.id}>
              <p>Run ID: {run.id}</p>
              <p>Status: {run.status}</p>
              <p>Conclusion: {run.conclusion}</p>
              {/* Add more details as needed */}
            </li>
          ))}
        </ul>
      </div>
    </div>
    </div>
  );
};

export default CodeGenerator;