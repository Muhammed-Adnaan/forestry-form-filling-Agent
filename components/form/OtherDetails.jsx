import React from 'react';

const OtherDetails = ({ formData, handleInputChange }) => {
    return (
        <div>
            <div style={{ borderBottom: '10px solid #E18728' }}>
                <h2 className="StepTitle">
                    <span>ಇತರೆ ವಿವರಗಳು/Other Details</span>
                </h2>
            </div>

            <table cellPadding="2" cellSpacing="2" style={{ width: '100%' }}>
                <tbody>
                    <tr>
                        <td align="left" colSpan="8">
                            <label>1.) ಮರಗಳು ಕಡಿಯುವ ಉದ್ದೇಶ..</label><br />
                            <label>The purpose for which the trees are to be felled (to be typed in the box given below).</label>
                        </td>
                    </tr>
                    <tr>
                        <td align="right" colSpan="8">
                            <textarea name="purpose" value={formData.purpose} onChange={handleInputChange} rows="5" style={{ width: '100%' }} />
                            <b style={{ color: 'red', fontSize: 'larger' }}>*</b>
                        </td>
                    </tr>
                    <tr>
                        <td align="left" colSpan="4">
                            <label>2.) ಮೋಜಣಿ ಸಂಖ್ಯೆಯ ಸರಹದ್ದು ಸ್ಪಷ್ಟವಾಗಿದೆಯೇ ಮತ್ತು ನೆಲದ ಮೇಲೆ ಅದನ್ನು ಗುರುತು ಮಾಡಿದೆಯೇ?</label><br />
                            <label>Whether the boundary of survey number is clear and demarcated properly on the ground</label>
                        </td>
                        <td align="right" colSpan="4">
                            <select name="surveyBoundary" value={formData.surveyBoundary} onChange={handleInputChange} className="drop-down-style" style={{ width: '100%' }}>
                                <option value="0">&lt;--Select--&gt;</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                            <b style={{ color: 'red', fontSize: 'larger' }}>*</b>
                        </td>
                    </tr>
                    <tr>
                        <td align="left" colSpan="4">
                            <label>3.) ಕಟಾವಣೆಗೊಳಿಸಬೇಕಾದ ಮರವು ಸರ್ಕಾರಕ್ಕೆ ಮೀಸಲಾಗಿದೆಯೇ?</label><br />
                            <label>Whether any tree proposed to be felled is reserved to Government.</label>
                        </td>
                        <td align="right" colSpan="4">
                            <select name="govtSite" value={formData.govtSite} onChange={handleInputChange} className="drop-down-style" style={{ width: '100%' }}>
                                <option value="0">&lt;--Select--&gt;</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                            <b style={{ color: 'red', fontSize: 'larger' }}>*</b>
                        </td>
                    </tr>
                    {formData.govtSite === 'yes' && (
                        <tr>
                            <td colSpan="8">
                                <label>Please provide details</label>
                                <b style={{ color: 'red', fontSize: 'larger' }}>*</b><br />
                                <textarea name="govtSiteDetails" value={formData.govtSiteDetails} onChange={handleInputChange} rows="5" style={{ width: '100%' }} />
                            </td>
                        </tr>
                    )}
                    <tr>
                        <td align="left" colSpan="4">
                            <label>4.) ಭೂಮಿ ಮತ್ತು ಮರಗಳ ಮೇಲಿನ ಹಕ್ಕಿಗೆ ಪಾಲುದಾರರಾದ ಇತರೆ ಮಾಲೀಕರು ಇದ್ದರೆ, ಅವರ ಒಪ್ಪಿಗೆ ಪತ್ರ ಒದಗಿಸುವುದು.</label><br />
                            <label>Whether unconditional consent of the other owners having share in the right to land and the trees if any is obtained</label>
                        </td>
                        <td align="right" colSpan="4">
                            <select name="consent" value={formData.consent} onChange={handleInputChange} className="drop-down-style" style={{ width: '100%' }}>
                                <option value="0">&lt;--Select--&gt;</option>
                                <option value="1">Yes</option>
                                <option value="2">No</option>
                            </select>
                            <b style={{ color: 'red', fontSize: 'larger' }}>*</b>
                        </td>
                    </tr>
                    <tr>
                        <td align="left" colSpan="4">
                            <label>5.) ಈ ಕೆಳಗಿನ ಪ್ರದೇಶಗಳಲ್ಲಿ ಮರ ಕಡಿತಲೆಗೆ ಅರ್ಜಿ ಸಲ್ಲಿಸಿದಲ್ಲಿ, ಪರವಾನಗಿ ಅಥವಾ ಪ್ರಮಾಣಪತ್ರವನ್ನು ಲಗತ್ತಿಸಲಾಗಿದೆಯೆ?</label><br />
                            <label>Whether the license or certificate irrespective of the following is enclosed in case the purpose of felling is for</label>
                        </td>
                        <td align="right" colSpan="4">
                            <select name="license" value={formData.license} onChange={handleInputChange} className="drop-down-style" style={{ width: '100%' }}>
                                <option value="0">&lt;--Select--&gt;</option>
                                <option value="1">Yes</option>
                                <option value="2">No</option>
                            </select>
                            <b style={{ color: 'red', fontSize: 'larger' }}>*</b>
                        </td>
                    </tr>
                    {formData.license === '1' && (
                        <tr>
                            <td colSpan="8">
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', marginTop: '10px' }}>
                                    <label><input type="radio" name="licenseCert" value="0" onChange={handleInputChange} checked={formData.licenseCert === '0'} /> (i) ಕಾಫಿ ಬೋರ್ಡ್ ನಿಂದ ಕಾಫಿ-ಸಾಗುವಳಿ ಪ್ರಮಾಣಪತ್ರ/Coffee-cultivation certificate from Coffee Board</label>
                                    <label><input type="radio" name="licenseCert" value="1" onChange={handleInputChange} checked={formData.licenseCert === '1'} /> (ii) ರಬ್ಬರ್ ಬೋರ್ಡ್ ನಿಂದ ರಬ್ಬರ್-ಸಾಗುವಳಿ ಪ್ರಮಾಣಪತ್ರ/Rubber-cultivation certificate from Rubber Board</label>
                                    <label><input type="radio" name="licenseCert" value="2" onChange={handleInputChange} checked={formData.licenseCert === '2'} /> (III) ಕಾರ್ಡಮಮ್ ಬೋರ್ಡ್ ನಿಂದ ಕಾರ್ಡಮಮ್(ಏಲಕ್ಕಿ)-ಸಾಗುವಳಿ ಪ್ರಮಾಣಪತ್ರ/Cardamum-cultivation certificate from Cardamum Board</label>
                                    <label><input type="radio" name="licenseCert" value="3" onChange={handleInputChange} checked={formData.licenseCert === '3'} /> (iv) ಕಟ್ಟಡ ನಿರ್ಮಾಣಕ್ಕಾಗಿ ಗ್ರಾಮ ಪಂಚಾಯತಿಯಿಂದ ಅಥವಾ ಪುರಸಭೆಯ ಕಾರ್ಯನಿರ್ವಾಹಕ ಅಧಿಕಾರಿಯಿಂದ ಪ್ರಮಾಣಪತ್ರ/For construction of building Certificate from Village Panchayat or Executive Officers of the municipality as the case may be</label>
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default OtherDetails;
