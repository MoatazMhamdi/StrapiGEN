import React, { useState } from 'react';
import { generateCode } from '../../Services/codeGenerationService';
import './GenerateCodeComponent.css'; 

const GenerateCodeComponent = () => {
  const [methods, setMethods] = useState([
    { id: 1, method: 'POST', selected: false },
    { id: 2, method: 'GET', selected: false },
    { id: 3, method: 'PATCH', selected: false },
    { id: 4, method: 'DELETE', selected: false },
  ]);
  const [model, setModel] = useState('');
  const [route, setRoute] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleMethodToggle = (id) => {
    setMethods((prevMethods) =>
      prevMethods.map((method) =>
        method.id === id
          ? { ...method, selected: !method.selected }
          : method
      )
    );
  };

  const handleSelectAll = () => {
    setMethods(
      methods.map((method) => ({
        ...method,
        selected: true, 
        generatedString: method.generatedString || "POST,GET,PATCH,DELETE", // Simule la saisie de la chaîne de caractères
      }))
    );
  };
  

  const handleDeselectAll = () => {
    setMethods(methods.map((method) => ({ ...method, selected: false })));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const selectedMethodIds = methods.filter((m) => m.selected).map((m) => m.method);
      for (const selectedMethod of selectedMethodIds) {
        const response = await generateCode({ method: selectedMethod, model, route });
        console.log(`Generated code for ${selectedMethod}:`, response);
      }
    } catch (error) {
      console.error('Error generating code:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Modules</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Method</th>
            <th>Model</th>
            <th>Route</th>
          </tr>
        </thead>
        <tbody>
          {methods.map((method) => (
            <tr key={method.id}>
              <td>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={method.selected}
                    onChange={() => handleMethodToggle(method.id)}
                  />
                  <span className="slider round"></span>
                </label>
              </td>
              <td>{method.method}</td>
              <td>
                <input type="text" value={model} onChange={(e) => setModel(e.target.value)} />
              </td>
              <td>
                <input type="text" value={route} onChange={(e) => setRoute(e.target.value)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="button-container">
        <button type="button" onClick={handleSelectAll}>
          Select All
        </button>
        <button type="button" onClick={handleDeselectAll}>
          Deselect All
        </button>
      </div>
      <button type="submit" disabled={!methods.some((m) => m.selected)}>
        {isLoading ? 'Generating...' : 'Generate Code'}
      </button>
      {/* ... display error message if any */}
    </form>
  );
};

export default GenerateCodeComponent;
