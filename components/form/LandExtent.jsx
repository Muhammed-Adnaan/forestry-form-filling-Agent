import React from 'react';

const LandExtent = ({ formData, handleInputChange }) => {

    // Implement validation locally for Guntas and Anna based on original form logic
    const handleGuntasChange = (e) => {
        let val = parseInt(e.target.value, 10);
        if (val < 0 || val > 39) {
            alert("Guntas must be between 1 and 39");
            e.target.value = '';
        } else {
            handleInputChange(e);
        }
    };

    const handleAnnaChange = (e) => {
        let val = parseInt(e.target.value, 10);
        if (val < 0 || val > 15) {
            alert("Anna must be between 1 and 15");
            e.target.value = '';
        } else {
            handleInputChange(e);
        }
    };

    return (
        <table cellPadding="2" cellSpacing="2">
            <tbody>
                <tr>
                    <td align="right">
                        <label>ಸರ್ವೆ ಸಂಖ್ಯೆ</label><br />
                        <label>Survey Number</label>
                    </td>
                    <td align="left">
                        <input type="text" name="surveyNo" value={formData.surveyNo} onChange={handleInputChange} style={{ width: '90%' }} />
                        <b style={{ color: 'red', fontSize: 'larger' }}>*</b>
                    </td>
                </tr>
                <tr>
                    <td align="right">
                        <label>ಖಾತಾ ಸಂಖ್ಯೆ</label><br />
                        <label>Khata Number</label>
                    </td>
                    <td align="left">
                        <input type="text" name="khataNo" value={formData.khataNo} onChange={handleInputChange} style={{ width: '90%' }} />
                        <b style={{ color: 'red', fontSize: 'larger' }}>*</b>
                    </td>
                </tr>
                <tr>
                    <td align="right">
                        <label>ಒಟ್ಟು ವಿಸ್ತೀರ್ಣ/Total Extent:</label>
                    </td>
                    <td align="left">
                        <label>ಎಕರೆ/Acres :</label>
                        <input type="number" name="acres" value={formData.acres} onChange={handleInputChange} style={{ width: '45%' }} />
                    </td>
                    <td style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <label>ಗುಂಟೆ/Guntas </label>
                        <input type="number" name="guntas" value={formData.guntas} onChange={handleGuntasChange} style={{ width: '45%' }} min="0" max="39" />

                        <label>ಆಣೆ/Anna </label>
                        <input type="number" name="anna" value={formData.anna} onChange={handleAnnaChange} style={{ width: '45%' }} min="0" max="15" />
                    </td>
                </tr>
            </tbody>
        </table>
    );
};

export default LandExtent;
