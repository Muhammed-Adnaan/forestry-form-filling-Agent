import React from 'react';

const Declaration = ({ formData, handleInputChange, handleSubmit }) => {
    return (
        <div>
            <table cellPadding="2" cellSpacing="2" style={{ width: '100%', marginTop: '20px', color: '#333' }}>
                <tbody>
                    <tr>
                        <td colSpan="8" align="center">
                            <table style={{ textAlign: 'left', maxWidth: '800px' }}>
                                <tbody>
                                    <tr>
                                        <td>
                                            <ul>
                                                <u><li>ನಾನು / ನಾವು ಮೇಲೆ ತಿಳಿಸಿದ ಸರ್ವೆಯ ಸಂಖ್ಯೆಯ ಪ್ರದೇಶದಲ್ಲಿ ಮರಗಳನ್ನು ಕಡಿತಗೊಳಿಸಲು ಅನುಮತಿ ನೀಡಲು ವಿನಂತಿಸುತ್ತೇನೆ/ವೆ..</li></u>
                                                <u>I/We therefore request you to accord permission to fell trees from survey number mentioned above.</u>
                                                <li>ನಾನು / ನಾವು ಕೆಳಗಿನ ಅಂಶಗಳಿಗೆ ಬದ್ಧರಾಗಿರುತ್ತೇವೆ</li>
                                                I/We undertake to
                                                <ul>
                                                    <li>ತಪಾಸಣೆ ಸಮಯದಲ್ಲಿ ಮರದ ಅಧಿಕಾರಿಗೆ ಅವಶ್ಯವಿರುವ ಇತರ ವಿವರಗಳನ್ನು ಒದಗಿಸಲು ಸಿದ್ಧರಾಗಿರುತ್ತೇನೆ/ವೆ. </li>
                                                    Furnish other particulars if any require and demanded by Tree Officer in this regard during the course of inspection.
                                                    <li>ಅಸ್ತಿತ್ವದಲ್ಲಿರುವ ನಿಯಮಗಳು ಮತ್ತು ನಿಬಂಧನೆಗಳ ಪ್ರಕಾರ ಕರ್ನಾಟಕ ಅರಣ್ಯ ಇಲಾಖೆಯ ಬೇಡಿಕೆಯಂತೆ ಹಣವನ್ನು ಠೇವಣಿ ಮಾಡಿ.</li>
                                                    Deposit money as demanded by Karnataka Forest Department as per the existing rules and regulations.
                                                </ul>
                                                <li>ನಾನು / ನಾವು ಕರ್ನಾಟಕ ಮರ ಸಂರಕ್ಷಣಾ ಕಾಯಿದೆ,1976 ಮತ್ತು ಕರ್ನಾಟಕ ಅರಣ್ಯ ಕಾಯಿದೆ,1963 ಮತ್ತು ಇವುಗಳ ಅಡಿಯ ನಿಯಮಗಳನ್ನು ಮತ್ತು ಮರ ಅಧಿಕಾರಿ ವಿಧಿಸಬಹುದಾದ ಇತರ ನಿಯಮಗಳನ್ನು ಅನುಸರಿಸಲು ಸಮ್ಮತಿಸುತ್ತೇನೆವೆ.</li>
                                                I/We agree to abide by the provision of the Karnataka Preservation of Trees Act, 1976 and the Karnataka Forest Act, 1963 and the Rules made thereunder and such other conditions that may be imposed by the Tree Officer.
                                                <li>ನನ್ನಿಂದ/ನಮ್ಮಿಂದ ಒದಗಿಸಲಾದ ತಪ್ಪು ಮಾಹಿತಿಯನ್ವಯ ಮರ ಅಧಿಕಾರಿ ನೀಡಿದ ಅನುಮತಿಯಿಂದ ಉಂಟಾಗಿವ ಯಾವುದೇ ನಷ್ಟ ಅಥವಾ ಹಾನಿಗೆ ನಾನು/ವು ಕರ್ನಾಟಕ ಸರ್ಕಾರಕ್ಕೆ ಪರಿಹಾರ ಕಟ್ಟಿಕೊಡಲು ಒಪ್ಪುತ್ತೇನೆ/ವೆ.</li>
                                                I/We do hereby agree to indemnify Government of Karnataka against any loss or damage caused on account of permission accorded to me by the Tree Officer based on erroneous or wrong information furnished by me.
                                                <u>
                                                    <li>
                                                        ಒದಗಿಸಿರುವ ಎಲ್ಲಾ ಮಾಹಿತಿ ಹಾಗೂ ದಾಖಲೆಗಳು ಸತ್ಯ ಹಾಗೂ ಮೂಲ ದಾಖಲೆಯ ಪೂರ್ಣ ಪ್ರತಿಗಳಾಗಿರುತ್ತವೆ. ಸದರಿ ಮಾಹಿತಿಯು ಪೂರ್ಣ/ಭಾಗಶಃ ತಪ್ಪು ಎಂದು ಕಂಡುಬಂದಲ್ಲಿ ಅಥವಾ ಒದಗಿಸಿರುವ ದಾಖಲೆಗಳು ಮೂಲ ದಾಖಲೆಗಳ ಮಾರ್ಪಡಿಸಿದ/ತಿರುಚಿದ ಪ್ರತಿಗಳಾಗಿದ್ದಲ್ಲಿ, ಕಾನೂನಿನಿಂದ ಸೂಚಿಸಲ್ಪಡುವ ಕ್ರಮಕ್ಕೆ ನಾನು/ನಾವು ಬದ್ದನಾಗಿರುತ್ತೇನೆ/ಬದ್ದರಾಗಿರುತ್ತೇವೆ
                                                    </li>
                                                </u>
                                                <b>
                                                    I certify that all the information and documents uploaded are true and complete copies of the originals.
                                                    In case any information is found at any point of time to be wholly/ partly false, and/or
                                                    if any document uploaded is found to be altered, manipulated or not a true copy of the original,
                                                    I am agreeable to such action as may be prescribed by law.
                                                </b>
                                            </ul>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="center" style={{ paddingTop: '20px' }}>
                                            <table>
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <input type="radio" id="rbtnAgree" name="declaration" value="1" onChange={handleInputChange} checked={formData.declaration === '1'} />
                                                            <label htmlFor="rbtnAgree" style={{ marginLeft: '5px' }}>ಮೇಲೆ ತಿಳಿಸಲಾದ ಷರತ್ತುಗಳಿಗೆ ನಾನು ಒಪ್ಪುತ್ತೇನೆ/ವೆ/I Agree for the conditions mentioned above</label>
                                                        </td>
                                                        <td style={{ paddingLeft: '20px' }}>
                                                            <input type="radio" id="rbtnDecline" name="declaration" value="2" onChange={handleInputChange} checked={formData.declaration === '2'} />
                                                            <label htmlFor="rbtnDecline" style={{ marginLeft: '5px' }}>ನಿರಾಕರಿಸು/Decline</label>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>

                    {formData.declaration === '1' && (
                        <tr>
                            <td colSpan="8" align="center" style={{ paddingTop: '20px' }}>
                                <button type="button" onClick={handleSubmit} className="btn-success" style={{ width: '275px', height: '35px', marginRight: '10px' }}>
                                    Generate Application Id and add tree details
                                </button>
                                <button type="button" onClick={() => window.location.reload()} className="btn-success" style={{ width: '75px', height: '35px' }}>
                                    Clear
                                </button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Declaration;
