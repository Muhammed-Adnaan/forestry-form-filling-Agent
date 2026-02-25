import React from 'react';

const ApplicantDetails = ({ formData, handleInputChange }) => {

    // Pattern validations from script block
    const validateMobile = (e) => {
        const pattern = /^\d{10}$/;
        if (!pattern.test(e.target.value) && e.target.value !== '') {
            alert("Phone number should be in 0123456789 format");
            e.target.focus();
        } else {
            handleInputChange(e);
        }
    };

    const validateEmail = (e) => {
        const filter = /^([a-z A-Z 0-9 _.-])+@(([a-z A-Z 0-9-])+.)+([a-z A-z 0-9]{3,3})+$/;
        if (!filter.test(e.target.value) && e.target.value !== '') {
            alert("Email is in www.gmail.com format (e.g., user@domain.com)");
            e.target.focus();
        } else {
            handleInputChange(e);
        }
    };

    const validatePincode = (e) => {
        const pat1 = /^\d{6}$/;
        if (!pat1.test(e.target.value) && e.target.value !== '') {
            alert("Pin code should be 6 digits");
            e.target.focus();
        } else {
            handleInputChange(e);
        }
    };

    return (
        <div>
            <div style={{ borderBottom: '10px solid #E18728' }}>
                <h2 className="StepTitle">
                    <span>ಅರ್ಜಿದಾರರ ವಿವರಗಳು/Applicant Details(Communication Address)</span>
                </h2>
            </div>

            <table cellPadding="2" cellSpacing="2" style={{ width: '100%' }}>
                <tbody>
                    <tr>
                        <td align="right">
                            <label>ಅರ್ಜಿದಾರರ ವಿಧ</label><br />
                            <label>Applicant Type</label>
                        </td>
                        <td align="left">
                            <select name="applicantType" value={formData.applicantType} onChange={handleInputChange} style={{ width: '92%' }} className="drop-down-style">
                                <option value="0">&lt;--Select--&gt;</option>
                                <option value="individual">Individual</option>
                                <option value="company">Company</option>
                                <option value="gpa">GPA Holder</option>
                            </select>
                            <b style={{ color: 'red', fontSize: 'larger' }}>*</b>
                        </td>
                        <td align="right">
                            <label>ಅರ್ಜಿದಾರರ ಹೆಸರು</label><br />
                            <label>Applicant Name</label>
                        </td>
                        <td align="left">
                            <input type="text" name="applicantName" value={formData.applicantName} onChange={handleInputChange} style={{ width: '90%' }} />
                            <b style={{ color: 'red', fontSize: 'larger' }}>*</b>
                        </td>
                    </tr>
                    <tr>
                        <td align="right">
                            <label>ವಿಳಾಸ</label><br />
                            <label>Address</label>
                        </td>
                        <td align="left">
                            <textarea name="address" value={formData.address} onChange={handleInputChange} style={{ width: '90%' }} rows="3" />
                            <b style={{ color: 'red', fontSize: 'larger' }}>*</b>
                        </td>
                        <td align="right">
                            <label>ಜಿಲ್ಲೆ</label><br />
                            <label>District</label>
                        </td>
                        <td align="left">
                            <select name="applicantDistrict" value={formData.applicantDistrict} onChange={handleInputChange} style={{ width: '92%' }} className="drop-down-style">
                                <option value="0">&lt;--Select--&gt;</option>
                                <option value="hassan">Hassan</option>
                            </select>
                            <b style={{ color: 'red', fontSize: 'larger' }}>*</b>
                        </td>
                    </tr>
                    <tr>
                        <td align="right">
                            <label>ತಾಲ್ಲೂಕು</label><br />
                            <label>Taluk</label>
                        </td>
                        <td align="left">
                            <select name="applicantTaluk" value={formData.applicantTaluk} onChange={handleInputChange} style={{ width: '92%' }} className="drop-down-style">
                                <option value="0">&lt;--Select--&gt;</option>
                                <option value="hassan">Hassan</option>
                            </select>
                            <b style={{ color: 'red', fontSize: 'larger' }}>*</b>
                        </td>
                        <td align="right">
                            <label>ಪಿನ್ ಕೋಡ್</label><br />
                            <label>Pincode</label>
                        </td>
                        <td align="left">
                            <input type="text" name="pincode" value={formData.pincode} onChange={handleInputChange} onBlur={validatePincode} maxLength="6" style={{ width: '90%' }} />
                            <b style={{ color: 'red', fontSize: 'larger' }}>*</b>
                        </td>
                    </tr>
                    <tr>
                        <td align="right">
                            <label>ಮೊಬೈಲ್ ಸಂಖ್ಯೆ</label><br />
                            <label>Mobile Number</label>
                        </td>
                        <td align="left">
                            <input type="text" name="mobile" value={formData.mobile} onChange={handleInputChange} onBlur={validateMobile} maxLength="10" style={{ width: '90%' }} />
                            <b style={{ color: 'red', fontSize: 'larger' }}>*</b>
                        </td>
                        <td align="right">
                            <label>ಇಮೇಲ್ ಐಡಿ</label><br />
                            <label>Email Id</label>
                        </td>
                        <td align="left">
                            <input type="text" name="email" value={formData.email} onChange={handleInputChange} onBlur={validateEmail} style={{ width: '90%' }} />
                        </td>
                    </tr>
                </tbody>
            </table>

            {/* Conditional Land Owner Details based on Applicant Type */}
            {formData.applicantType === 'gpa' && (
                <div>
                    <div style={{ borderBottom: '10px solid #E18728' }}>
                        <h2 className="StepTitle">
                            <span>Land Owner Details:</span>
                        </h2>
                    </div>
                    <table cellPadding="2" cellSpacing="2" style={{ width: '100%' }}>
                        <tbody>
                            <tr>
                                <td align="right">
                                    <label>ಸ್ಥಳದ ಮಾಲೀಕರ ಹೆಸರು</label><br />
                                    <label>Land Owner Name</label>
                                </td>
                                <td align="left">
                                    <input type="text" name="landOwnerName" value={formData.landOwnerName} onChange={handleInputChange} style={{ width: '90%' }} />
                                    <b style={{ color: 'red', fontSize: 'larger' }}>*</b>
                                </td>
                                <td align="right">
                                    <label>ಸ್ಥಳದ ಮಾಲೀಕರ ವಿಳಾಸ</label><br />
                                    <label>Land Owner Address</label>
                                </td>
                                <td align="left">
                                    <textarea name="landOwnerAddress" value={formData.landOwnerAddress} onChange={handleInputChange} style={{ width: '90%' }} rows="3" />
                                    <b style={{ color: 'red', fontSize: 'larger' }}>*</b>
                                </td>
                            </tr>
                            <tr>
                                <td align="right">
                                    <label>ಜಿಲ್ಲೆ</label><br />
                                    <label>District</label>
                                </td>
                                <td align="left">
                                    <select name="landOwnerDistrict" value={formData.landOwnerDistrict} onChange={handleInputChange} style={{ width: '92%' }} className="drop-down-style">
                                        <option value="0">&lt;--Select--&gt;</option>
                                        <option value="hassan">Hassan</option>
                                    </select>
                                    <b style={{ color: 'red', fontSize: 'larger' }}>*</b>
                                </td>
                                <td align="right">
                                    <label>ತಾಲ್ಲೂಕು</label><br />
                                    <label>Taluk</label>
                                </td>
                                <td align="left">
                                    <select name="landOwnerTaluk" value={formData.landOwnerTaluk} onChange={handleInputChange} style={{ width: '92%' }} className="drop-down-style">
                                        <option value="0">&lt;--Select--&gt;</option>
                                        <option value="hassan">Hassan</option>
                                    </select>
                                    <b style={{ color: 'red', fontSize: 'larger' }}>*</b>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ApplicantDetails;
