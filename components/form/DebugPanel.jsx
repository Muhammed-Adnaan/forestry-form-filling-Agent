import React, { useState } from 'react';
import { fillFormDetails, getFormDetails } from '@/lib/tool';

const DebugPanel = ({ showAlert }) => {
  const [jsonInput, setJsonInput] = useState('');
  const [jsonOutput, setJsonOutput] = useState('');

  const handleFillDetails = () => {
    try {
      const data = JSON.parse(jsonInput);
      fillFormDetails(data);
      console.log('Form filled successfully! Please check the fields.');
      if (showAlert) showAlert('Form filled successfully!', 'success');
    } catch (e) {
      showAlert
        ? showAlert('Invalid JSON format in the input area.', 'alert')
        : alert('Invalid JSON format in the input area.');
      console.error(e);
    }
  };

  const loadSampleData = () => {
    const sampleData = {
      areaType: 'rural_area',
      district: 'hassan',
      taluk: 'hassan',
      hobli: 'hassan',
      village: 'hassan',
      surveyNo: '123/A',
      khataNo: '456',
      acres: '2',
      guntas: '15',
      anna: '8',
      applicantType: 'individual',
      applicantName: 'John Doe',
      address: '123 Forest View, Bangalore',
      applicantDistrict: 'hassan',
      applicantTaluk: 'hassan',
      pincode: '560001',
      mobile: '9876543210',
      email: 'john.doe@example.com',
      east: 'River',
      west: 'Road',
      north: 'Govt Land',
      south: 'Private Farm',
      purpose: 'Clearing space for new plantation',
      surveyBoundary: 'yes',
      govtSite: 'no',
      consent: '1',
      license: '2',
      declaration: '1',
    };
    setJsonInput(JSON.stringify(sampleData, null, 2));
  };

  return (
    <div
      style={{
        marginTop: '40px',
        padding: '20px',
        backgroundColor: 'rgba(0, 0, 0, 1)',
        border: '1px solid rgba(0, 255, 34, 1)',
        borderRadius: '5px',
        color: 'white',
      }}
    >
      <h3 style={{ borderBottom: '2px solid #333', paddingBottom: '10px' }}>
        Debug Panel: Test tools.js Functions
      </h3>

      <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <h4>
            Test <code>getFormDetails()</code>
          </h4>
          <p>Click the button below to extract the current form state.</p>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button
              onClick={() => {
                const data = getFormDetails();
                setJsonOutput(JSON.stringify(data, null, 2));
              }}
              className="btn-success"
              style={{
                backgroundColor: '#0026ffff',
                borderColor: '#ffffffff',
                flex: 1,
                minWidth: '120px',
              }}
            >
              Get All Data
            </button>
            <button
              onClick={() => {
                const data = getFormDetails('ApplicantDetails');
                setJsonOutput(JSON.stringify(data, null, 2));
              }}
              className="btn-success"
              style={{
                backgroundColor: '#4caf50',
                borderColor: '#ffffffff',
                flex: 1,
                minWidth: '120px',
              }}
            >
              Applicant
            </button>
            <button
              onClick={() => {
                const data = getFormDetails('LocationDetails');
                setJsonOutput(JSON.stringify(data, null, 2));
              }}
              className="btn-success"
              style={{
                backgroundColor: '#2196f3',
                borderColor: '#ffffffff',
                flex: 1,
                minWidth: '120px',
              }}
            >
              Location
            </button>
            <button
              onClick={() => {
                const data = getFormDetails('BoundaryDetails');
                setJsonOutput(JSON.stringify(data, null, 2));
              }}
              className="btn-success"
              style={{
                backgroundColor: '#9c27b0',
                borderColor: '#ffffffff',
                flex: 1,
                minWidth: '120px',
              }}
            >
              Boundary
            </button>
            <button
              onClick={() => {
                const data = getFormDetails('LandExtent');
                setJsonOutput(JSON.stringify(data, null, 2));
              }}
              className="btn-success"
              style={{
                backgroundColor: '#ff5722',
                borderColor: '#ffffffff',
                flex: 1,
                minWidth: '120px',
              }}
            >
              Land Extent
            </button>
            <button
              onClick={() => {
                const data = getFormDetails('OtherDetails');
                setJsonOutput(JSON.stringify(data, null, 2));
              }}
              className="btn-success"
              style={{
                backgroundColor: '#795548',
                borderColor: '#ffffffff',
                flex: 1,
                minWidth: '120px',
              }}
            >
              Other
            </button>
            <button
              onClick={() => {
                const data = getFormDetails('UploadSection');
                setJsonOutput(JSON.stringify(data, null, 2));
              }}
              className="btn-success"
              style={{
                backgroundColor: '#607d8b',
                borderColor: '#ffffffff',
                flex: 1,
                minWidth: '120px',
              }}
            >
              Uploads
            </button>
            <button
              onClick={() => {
                const data = getFormDetails('Declaration');
                setJsonOutput(JSON.stringify(data, null, 2));
              }}
              className="btn-success"
              style={{
                backgroundColor: '#e91e63',
                borderColor: '#ffffffff',
                flex: 1,
                minWidth: '120px',
              }}
            >
              Declaration
            </button>
          </div>
          <textarea
            value={jsonOutput}
            readOnly
            rows="15"
            style={{ width: '100%', fontFamily: 'monospace', fontSize: '12px' }}
            placeholder="Extracted JSON will appear here..."
          />
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <h4>
            Test <code>fillFormDetails()</code>
          </h4>
          <p>
            Paste JSON data below and click Fill, or{' '}
            <a
              href="#/"
              onClick={(e) => {
                e.preventDefault();
                loadSampleData();
              }}
              style={{ color: 'blue', textDecoration: 'underline' }}
            >
              load sample data
            </a>
            .
          </p>
          <button
            onClick={handleFillDetails}
            className="btn-success"
            style={{ backgroundColor: '#ff9800', borderColor: '#e68a00' }}
          >
            Fill Form From JSON
          </button>
          <textarea
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            rows="15"
            style={{ width: '100%', fontFamily: 'monospace', fontSize: '12px' }}
            placeholder='Paste JSON here, e.g. {"applicantName": "Adnaan"}'
          />
        </div>
      </div>
    </div>
  );
};

export default DebugPanel;
