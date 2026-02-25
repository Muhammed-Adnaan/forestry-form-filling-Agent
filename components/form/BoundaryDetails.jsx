import React from 'react';

const BoundaryDetails = ({ formData, handleInputChange }) => {
    return (
        <div>
            <div style={{ borderBottom: '10px solid #E18728' }}>
                <h2 className="StepTitle">
                    <span>ಪ್ರದೇಶದ ಗಡಿ ವಿವರಗಳು/Site boundary details (Chakbandi)</span>
                </h2>
            </div>

            <table cellPadding="2" cellSpacing="2" style={{ width: '100%' }}>
                <tbody>
                    <tr>
                        <td align="right" style={{ width: '20%' }}>
                            <label>ಪೂರ್ವ/East</label>
                        </td>
                        <td align="left" style={{ width: '30%' }}>
                            <textarea name="east" value={formData.east} onChange={handleInputChange} style={{ width: '90%' }} rows="2" />
                            <b style={{ color: 'red', fontSize: 'larger' }}>*</b>
                        </td>
                        <td align="right" style={{ width: '20%' }}>
                            <label>ಪಶ್ಚಿಮ/West</label>
                        </td>
                        <td align="left" style={{ width: '30%' }}>
                            <textarea name="west" value={formData.west} onChange={handleInputChange} style={{ width: '90%' }} rows="2" />
                            <b style={{ color: 'red', fontSize: 'larger' }}>*</b>
                        </td>
                    </tr>
                    <tr>
                        <td align="right">
                            <label>ಉತ್ತರ/North</label>
                        </td>
                        <td align="left">
                            <textarea name="north" value={formData.north} onChange={handleInputChange} style={{ width: '90%' }} rows="2" />
                            <b style={{ color: 'red', fontSize: 'larger' }}>*</b>
                        </td>
                        <td align="right">
                            <label>ದಕ್ಷಿಣ/South</label>
                        </td>
                        <td align="left">
                            <textarea name="south" value={formData.south} onChange={handleInputChange} style={{ width: '90%' }} rows="2" />
                            <b style={{ color: 'red', fontSize: 'larger' }}>*</b>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default BoundaryDetails;
