"use client";
import './App.css';
import React, { useState, useEffect } from 'react';
import FormHeader from '@/components/form/FormHeader';
import LocationDetails from '@/components/form/LocationDetails';
import LandExtent from '@/components/form/LandExtent';
import ApplicantDetails from '@/components/form/ApplicantDetails';
import BoundaryDetails from '@/components/form/BoundaryDetails';
import OtherDetails from '@/components/form/OtherDetails';
import UploadSection from '@/components/form/UploadSection';
import Declaration from '@/components/form/Declaration';
import DebugPanel from '@/components/form/DebugPanel';

import AgentClient from '@/components/embed-popup/agent-client';

function App() {
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
        fupLocation: null,
        fupTreeRights: null,
        fupKhataExtract: null,
        fupRightCertificate: null,
        fupLicenseCertificate: null,
        fupGPA: null,
        declaration: '0'
    });

    // Expose React state globally so tools.js can interact with it flawlessly
    useEffect(() => {
        window.__setReactFormData = (data) => {
            setFormData(prev => ({ ...prev, ...data }));
        };
        window.__getReactFormData = () => formData;
    }, [formData]);

    const handleInputChange = (e: any) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            setFormData({
                ...formData,
                [name]: files[0]
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        // Replicate FieldValidation () logic from original form
        let msg = '';
        let isValid = true;

        if (formData.applicantType === '0') { isValid = false; msg += 'Applicant Type\n'; }
        if (formData.applicantName === '') { isValid = false; msg += 'Applicant Name\n'; }
        if (formData.address === '') { isValid = false; msg += 'Address\n'; }
        if (formData.mobile === '') { isValid = false; msg += 'Mobile Number\n'; }

        // Add more granular validations as per FieldValidation()
        if (formData.purpose === '') { isValid = false; msg += 'The purpose for which the trees are to be felled\n'; }
        if (!formData.fupLocation) { isValid = false; msg += 'Upload purpose for which the trees are to be felled (Survey Sketch)\n'; }

        if (formData.consent === '1' && !formData.fupTreeRights) { isValid = false; msg += 'Upload Documents related to sharing rights to land and trees\n'; }
        if (!formData.fupKhataExtract) { isValid = false; msg += 'Upload Extract regarding tenure of the land from Tahasildar or concerned Revenue Authority\n'; }
        if (!formData.fupRightCertificate) { isValid = false; msg += 'Upload Certificate of right over land and tree growth from Tahasildar or concerned Revenue Authority\n'; }
        if (formData.license === '1' && !formData.fupLicenseCertificate) { isValid = false; msg += 'Upload License Certificate\n'; }

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
        videoFilter: 'none',
        videoFit: 'cover',
        language: 'en',
        voice: 'alloy',
        supportsChatInput: true,
        supportsVideoInput: false,
        supportsScreenShare: false,
        isPreConnectBufferEnabled: true,
    };

    return (
        <div className="App">
            <div className="container" style={{ width: 'auto', margin: '0 auto', backgroundColor: '#fff', padding: '20px', border: '1px solid #ccc' }}>
                <form onSubmit={handleSubmit}>
                    <FormHeader />
                    <br />
                    <LocationDetails formData={formData} handleInputChange={handleInputChange} />
                    <br />
                    <LandExtent formData={formData} handleInputChange={handleInputChange} />
                    <br />
                    <ApplicantDetails formData={formData} handleInputChange={handleInputChange} />
                    <br />
                    <BoundaryDetails formData={formData} handleInputChange={handleInputChange} />
                    <br />
                    <OtherDetails formData={formData} handleInputChange={handleInputChange} />
                    <br />
                    <UploadSection formData={formData} handleInputChange={handleInputChange} />
                    <br />
                    <Declaration formData={formData} handleInputChange={handleInputChange} handleSubmit={handleSubmit} />
                </form>

                <DebugPanel />
            </div>

            {/* LiveKit Popup Agent embedded on top of everything */}
            <AgentClient appConfig={agentConfig} />
        </div>
    );
}

export default App;
