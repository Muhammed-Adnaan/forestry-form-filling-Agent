import React from 'react';

const LocationDetails = ({ formData, handleInputChange }) => {
    return (
        <div>
            <div style={{ borderBottom: '10px solid #E18728' }}>
                <h2 className="StepTitle">
                    <span>ಮರ ಕಟಾವಣೆಗೆ ಕೋರಿರುವ ಸ್ಥಳದ ಕುರಿತು ವಿವರಗಳು/Details regarding location where felling is being applied for</span>
                </h2>
            </div>
            <br />

            <table cellPadding="2" cellSpacing="2">
                <tbody>
                    <tr>
                        <td align="right">
                            <label>ಪ್ರದೇಶದ ವಿಧ</label><br />
                            <label style={{ fontWeight: 'bold' }}>In Area Type:</label>
                        </td>
                        <td align="left" colSpan="3">
                            <select
                                name="areaType"
                                value={formData.areaType}
                                onChange={handleInputChange}
                                style={{ width: '92%' }}
                                className="drop-down-style"
                            >
                                <option value="0">&lt;--Select--&gt;</option>
                                <option value="urban_area">ನಗರ/ಪಟ್ಟಣ ಪ್ರದೇಶ/Urban Area(ULB Including Corporations, Municipalities etc..)</option>
                                <option value="rural_area">ಗ್ರಾಮೀಣ ಪ್ರದೇಶ/Rural Area</option>
                            </select>
                        </td>
                    </tr>

                    <tr>
                        <td align="right">
                            <label>ಜಿಲ್ಲೆ</label><br />
                            <label>District</label>
                        </td>
                        <td align="left">
                            <select name="district" value={formData.district} onChange={handleInputChange} style={{ width: '92%' }} className="drop-down-style">
                                <option value="0">&lt;--Select--&gt;</option>
                                <option value="Hassan">Hassan</option>
                                <option value="Mysore">Mysore</option>
                            </select>
                            <b style={{ color: 'red', fontSize: 'larger' }}>*</b>
                        </td>
                        <td align="right">
                            <label>ತಾಲ್ಲೂಕು</label><br />
                            <label>Taluk</label>
                        </td>
                        <td align="left">
                            <select name="taluk" value={formData.taluk} onChange={handleInputChange} style={{ width: '92%' }} className="drop-down-style">
                                <option value="0">&lt;--Select--&gt;</option>
                                <option value="Hassan">Hassan</option>
                                <option value="Mysore">Mysore</option>
                            </select>
                            <b style={{ color: 'red', fontSize: 'larger' }}>*</b>
                        </td>
                    </tr>
                    {/* Show only if Rural Area (2) is selected */}
                    {formData.areaType === 'rural_area' && (
                        <>
                            <tr>
                                <td align="right">
                                    <label>ಹೋಬಳಿ</label><br />
                                    <label>Hobli</label>
                                </td>
                                <td align="left">
                                    <select name="hobli" value={formData.hobli} onChange={handleInputChange} style={{ width: '92%' }} className="drop-down-style">
                                        <option value="0">&lt;--Select--&gt;</option>
                                        <option value="kasaba">Kasaba</option>
                                        <option value="dudda">Dudda</option>
                                    </select>
                                    <b style={{ color: 'red', fontSize: 'larger' }}>*</b>
                                </td>
                                <td align="right">
                                    <label>ಗ್ರಾಮ</label><br />
                                    <label>City/Village</label>
                                </td>
                                <td align="left">
                                    <select name="village" value={formData.village} onChange={handleInputChange} style={{ width: '92%' }} className="drop-down-style">
                                        <option value="0">&lt;--Select--&gt;</option>
                                        <option value="agile">Agile</option>
                                        <option value="aduvalli">Aduvalli</option>
                                    </select>
                                    <b style={{ color: 'red', fontSize: 'larger' }}>*</b>
                                </td>
                            </tr>
                        </>
                    )}

                    {/* Show only if Urban Area (1) is selected */}
                    {formData.areaType === 'urban_area' && (
                        <tr>
                            <td colSpan="4">
                                <div>
                                    <label>ನಗರ/ಪಟ್ಟಣ ಪ್ರದೇಶವನ್ನು ಆಯ್ಕೆ ಮಾಡಿ</label><br />
                                    <label>Select Urban Area</label><br />
                                    <select name="urbanArea" value={formData.urbanArea} onChange={handleInputChange} style={{ width: '92%' }} className="drop-down-style">
                                        <option value="0">&lt;--Select--&gt;</option>
                                        <option value="woodlots">Woodlots</option>
                                        <option value="governmentland">Government Land</option>
                                        <option value="privateownedland">Private Owned Land</option>
                                        <option value="other">Other</option>
                                    </select>
                                    <b style={{ color: 'red', fontSize: 'larger' }}>*</b>
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default LocationDetails;
