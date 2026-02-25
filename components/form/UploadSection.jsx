import React from 'react';

const UploadSection = ({ formData, handleInputChange }) => {
    return (
        <div>
            <div style={{ borderBottom: '10px solid #E18728' }}>
                <h2 className="StepTitle">
                    <span>ಲಗತ್ತುಗಳು/Uploads(Only jpg Files &lt; 200 kb )</span>
                </h2>
            </div>

            <table cellPadding="2" cellSpacing="2" style={{ width: '100%' }}>
                <tbody>
                    <tr>
                        <td align="left" colSpan="6">
                            <label>ಸ್ಥಳದ ಮೋಜಣಿ ನಕ್ಷೆ ಮೋಜಣಿ ಸಂಖ್ಯೆಯೊಂದಿಗೆ</label><br />
                            <label>Location of the survey number with survey sketch</label>
                        </td>
                        <td align="left">
                            <input type="file" name="fupLocation" onChange={handleInputChange} style={{ width: '95%' }} accept=".jpg,.jpeg,.png,.gif" />
                        </td>
                    </tr>

                    {formData.consent === '1' && (
                        <tr>
                            <td align="left" colSpan="6">
                                <label>ಭೂಮಿ ಮತ್ತು ಮರಗಳ ಮೇಲಿನ ಹಕ್ಕಿಗೆ ಪಾಲುದಾರರಾದ ಮಾಲೀಕರ ಒಪ್ಪಿಗೆ ಪತ್ರ</label><br />
                                <label>Unconditional consent of the other owners having share in the right on land and the trees</label>
                            </td>
                            <td align="left">
                                <input type="file" name="fupTreeRights" onChange={handleInputChange} style={{ width: '95%' }} accept=".jpg,.jpeg,.png,.gif" />
                            </td>
                        </tr>
                    )}

                    <tr>
                        <td align="left" colSpan="6">
                            <label>ತಹಸೀಲ್ದಾರ್ ಅಥವಾ ಸಂಬಂಧಪಟ್ಟ ಕಂದಾಯ ಅಧಿಕಾರಿಯಿಂದ ಭೂಮಿಯ ಬಗ್ಗೆ ಪಡೆದ ಖಾತಾ ಪತ್ರ .</label><br />
                            <label>Khatha Extract regarding tenure of the land from concerned Revenue Authority.</label>
                        </td>
                        <td align="left">
                            <input type="file" name="fupKhataExtract" onChange={handleInputChange} style={{ width: '95%' }} accept=".jpg,.jpeg,.png,.gif" />
                        </td>
                    </tr>

                    <tr>
                        <td align="left" colSpan="6">
                            <label>ತಹಸೀಲ್ದಾರ್ ಅಥವಾ ಸಂಬಂಧಪಟ್ಟ ಕಂದಾಯ ಅಧಿಕಾರಿಯಿಂದ ಭೂಮಿ ಮತ್ತು ಮರಗಳ ಮೇಲಿನ ಹಕ್ಕಿನ ಬಗ್ಗೆ ಪ್ರಮಾಣಪತ್ರ. </label><br />
                            <label>Certificate of right over land and tree growth from concerned Revenue Authority.</label>
                        </td>
                        <td align="left">
                            <input type="file" name="fupRightCertificate" onChange={handleInputChange} style={{ width: '95%' }} accept=".jpg,.jpeg,.png,.gif" />
                        </td>
                    </tr>

                    {formData.license === '1' && (
                        <tr>
                            <td align="left" colSpan="6">
                                <label>ಸಾಗುವಳಿ ಪರವಾನಗಿ ಪ್ರಮಾಣಪತ್ರ.</label><br />
                                <label>Cultivation Licence Certificate</label>
                            </td>
                            <td align="left">
                                <input type="file" name="fupLicenseCertificate" onChange={handleInputChange} style={{ width: '95%' }} accept=".jpg,.jpeg,.png,.gif" />
                            </td>
                        </tr>
                    )}

                    {formData.applicantType === 'gpa' && (
                        <tr>
                            <td colSpan="8" align="left">
                                <div style={{ borderBottom: '10px solid #E18728' }}>
                                    <h2 className="StepTitle">
                                        <span>ಜಿಪಿಎ ದಾಖಲೆ/GPA Documents(Only JPG Formate only)</span>
                                    </h2>
                                </div>
                                <table style={{ width: '100%' }}>
                                    <tbody>
                                        <tr>
                                            <td align="left" colSpan="6">
                                                <label>ಜಿಪಿಎ ದಾಖಲೆ/GPA Document</label>
                                            </td>
                                            <td align="left">
                                                <input type="file" name="fupGPA" onChange={handleInputChange} style={{ width: '95%' }} accept=".jpg,.jpeg,.png,.gif" />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default UploadSection;
