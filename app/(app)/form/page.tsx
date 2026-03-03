'use client';

import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
// import DebugPanel from '@/components/form/DebugPanel';

import AgentClient from '@/components/embed-popup/agent-client';
import ApplicantDetails from '@/components/form/ApplicantDetails';
import BoundaryDetails from '@/components/form/BoundaryDetails';
import Declaration from '@/components/form/Declaration';
import FormHeader from '@/components/form/FormHeader';
import LandExtent from '@/components/form/LandExtent';
import LocationDetails from '@/components/form/LocationDetails';
import OtherDetails from '@/components/form/OtherDetails';
import SubmittedTo from '@/components/form/SubmittedTo';
import TopNavbar from '@/components/form/TopNavbar';
import UploadSection from '@/components/form/UploadSection';
import '@/styles/App.css';

function App() {
  const [isAgentOpen, setIsAgentOpen] = useState(false);
  const [language, setLanguage] = useState('english');
  const [formData, setFormData] = useState({
    areaType: '0',
    district: '0',
    taluk: '0',
    hobli: '0',
    village: '0',
    urbanArea: '0',
    surveyNo: '',
    khataNo: '',
    acres: '',
    guntas: '',
    anna: '',
    applicantType: '0',
    applicantName: '',
    address: '',
    applicantDistrict: '0',
    applicantTaluk: '0',
    pincode: '',
    mobile: '',
    email: '',
    aadhaarNo: '',
    landOwnerName: '',
    landOwnerAddress: '',
    landOwnerDistrict: '0',
    landOwnerTaluk: '0',
    east: '',
    west: '',
    north: '',
    south: '',
    purpose: '',
    surveyBoundary: '0',
    govtSite: '0',
    govtSiteDetails: '',
    consent: '0',
    license: '0',
    licenseCert: '',
    fupLocation: null as File | null,
    fupTreeRights: null as File | null,
    fupKhataExtract: null as File | null,
    fupRightCertificate: null as File | null,
    fupLicenseCertificate: null as File | null,
    fupGPA: null as File | null,
    declaration: '0',
  });

  useEffect(() => {
    window.__setReactFormData = (data: Record<string, unknown>) => {
      setFormData((prev) => ({ ...prev, ...data }));
    };
    window.__getReactFormData = () => formData as Record<string, unknown>;
  }, [formData]);

  // Fixed 'any' by using ChangeEvent
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'file') {
      const fileInput = e.target as HTMLInputElement;
      if (fileInput.files && fileInput.files[0]) {
        setFormData((prev) => ({
          ...prev,
          [name]: fileInput.files![0],
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Fixed 'any' by using FormEvent
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    let msg = '';
    let isValid = true;

    if (formData.applicantType === '0') {
      isValid = false;
      msg += 'Applicant Type\n';
    }
    if (formData.applicantName === '') {
      isValid = false;
      msg += 'Applicant Name\n';
    }
    if (formData.address === '') {
      isValid = false;
      msg += 'Address\n';
    }
    if (formData.mobile === '') {
      isValid = false;
      msg += 'Mobile Number\n';
    }

    if (formData.purpose === '') {
      isValid = false;
      msg += 'The purpose for which the trees are to be felled\n';
    }
    if (!formData.fupLocation) {
      isValid = false;
      msg += 'Upload purpose for which the trees are to be felled (Survey Sketch)\n';
    }

    if (formData.consent === '1' && !formData.fupTreeRights) {
      isValid = false;
      msg += 'Upload Documents related to sharing rights to land and trees\n';
    }
    if (!formData.fupKhataExtract) {
      isValid = false;
      msg +=
        'Upload Extract regarding tenure of the land from Tahasildar or concerned Revenue Authority\n';
    }
    if (!formData.fupRightCertificate) {
      isValid = false;
      msg +=
        'Upload Certificate of right over land and tree growth from Tahasildar or concerned Revenue Authority\n';
    }
    if (formData.license === '1' && !formData.fupLicenseCertificate) {
      isValid = false;
      msg += 'Upload License Certificate\n';
    }

    if (!isValid) {
      alert(msg + ' is mandatory.');
      return;
    }

    alert('Form submitted successfully!');
    console.log('Submitted Data:', formData);
  };

  const agentConfig = {
    title: 'Assistant',
    description: 'I can help you fill out this form.',
    showTitle: true,
    logo: '',
    videoFilter: 'none' as const, // Cast to const to satisfy strict string unions
    videoFit: 'cover' as const, // Cast to const to satisfy strict string unions
    language: 'en',
    voice: 'alloy',
    supportsChatInput: true,
    supportsVideoInput: false,
    supportsScreenShare: false,
    isPreConnectBufferEnabled: true,
    agentName: 'form-assistant',
  };

  return (
    <div className="App">
      <TopNavbar language={language} setLanguage={setLanguage} />
      <div
        className="container"
        style={{
          width: isAgentOpen ? '60%' : '80%',
          margin: isAgentOpen ? '0 350px 50px 150px' : '0 auto 50px 150px',
          backgroundColor: '#fff',
          padding: '20px',
          borderRadius: '0',
          border: '1px solid #ccc',
          transition: 'all 0.3s ease-in-out',
        }}
      >
        <FormHeader />
        <br />
        <form className="form" onSubmit={handleSubmit}>
          <LocationDetails formData={formData} handleInputChange={handleInputChange} />
          <br />
          <LandExtent formData={formData} handleInputChange={handleInputChange} />
          <br />
          <SubmittedTo />
          <br />
          <ApplicantDetails formData={formData} handleInputChange={handleInputChange} />
          <br />
          <BoundaryDetails formData={formData} handleInputChange={handleInputChange} />
          <br />
          <OtherDetails formData={formData} handleInputChange={handleInputChange} />
          <br />
          <UploadSection formData={formData} handleInputChange={handleInputChange} />
          <br />
          <Declaration
            formData={formData}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
          />
        </form>
      </div>

      <AgentClient appConfig={agentConfig} onPopupStateChange={setIsAgentOpen} />
    </div>
  );
}

export default App;
