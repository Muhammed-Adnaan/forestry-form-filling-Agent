import React from 'react';

const sectionHeader = 'bg-[#3d3d3d] border-b-4 border-[#E18728] px-[10px] py-[6px] mb-0';
const sectionTitle = '!text-white text-[13px] m-0 p-0 font-normal';
const labelClass = 'text-[13px] text-[#242424]';
const selectClass = 'px-1 py-[3px] text-[#333] border border-[#ccc] rounded-[3px] bg-white w-full';
const textareaClass =
  'px-1 py-[4px] text-[#333] border border-[#ccc] rounded-[3px] bg-white w-full';
const tdLeft4 = 'p-[5px] align-top text-left';
const tdRight4 = 'p-[5px] align-top text-right ';
const requiredStar = 'text-red-600 text-lg font-bold';

const OtherDetails = ({ formData, handleInputChange }) => {
  return (
    <div data-section="OtherDetails">
      <div className={sectionHeader}>
        <h2 className={sectionTitle}>ಇತರೆ ವಿವರಗಳು/Other Details</h2>
      </div>

      <table cellPadding="2" cellSpacing="2" className="w-full border-collapse">
        <tbody>
          <tr>
            <td colSpan="8" className={tdLeft4}>
              <label className={labelClass}>1.) ಮರಗಳು ಕಡಿಯುವ ಉದ್ದೇಶ..</label>
              <br />
              <label className={labelClass}>
                The purpose for which the trees are to be felled (to be typed in the box given
                below).
              </label>
            </td>
          </tr>
          <tr>
            <td colSpan="8" className={tdRight4}>
              <textarea
                name="purpose"
                value={formData.purpose}
                onChange={handleInputChange}
                rows="5"
                className={textareaClass}
              />
              <b className={requiredStar}>*</b>
            </td>
          </tr>
          <tr>
            <td colSpan="4" className={tdLeft4}>
              <label className={labelClass}>
                2.) ಮೋಜಣಿ ಸಂಖ್ಯೆಯ ಸರಹದ್ದು ಸ್ಪಷ್ಟವಾಗಿದೆಯೇ ಮತ್ತು ನೆಲದ ಮೇಲೆ ಅದನ್ನು ಗುರುತು ಮಾಡಿದೆಯೇ?
              </label>
              <br />
              <label className={labelClass}>
                Whether the boundary of survey number is clear and demarcated properly on the ground
              </label>
            </td>
            <td colSpan="4" className={tdRight4}>
              <select
                name="surveyBoundary"
                value={formData.surveyBoundary}
                onChange={handleInputChange}
                className={selectClass}
              >
                <option value="0">&lt;--Select--&gt;</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
              <b className={requiredStar}>*</b>
            </td>
          </tr>
          <tr>
            <td colSpan="4" className={tdLeft4}>
              <label className={labelClass}>
                3.) ಕಟಾವಣೆಗೊಳಿಸಬೇಕಾದ ಮರವು ಸರ್ಕಾರಕ್ಕೆ ಮೀಸಲಾಗಿದೆಯೇ?
              </label>
              <br />
              <label className={labelClass}>
                Whether any tree proposed to be felled is reserved to Government.
              </label>
            </td>
            <td colSpan="4" className={tdRight4}>
              <select
                name="govtSite"
                value={formData.govtSite}
                onChange={handleInputChange}
                className={selectClass}
              >
                <option value="0">&lt;--Select--&gt;</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
              <b className={requiredStar}>*</b>
            </td>
          </tr>
          {formData.govtSite === 'yes' && (
            <tr>
              <td colSpan="8" className="p-[5px]">
                <label className={labelClass}>Please provide details</label>
                <b className={requiredStar}>*</b>
                <br />
                <textarea
                  name="govtSiteDetails"
                  value={formData.govtSiteDetails}
                  onChange={handleInputChange}
                  rows="5"
                  className={textareaClass}
                />
              </td>
            </tr>
          )}
          <tr>
            <td colSpan="4" className={tdLeft4}>
              <label className={labelClass}>
                4.) ಭೂಮಿ ಮತ್ತು ಮರಗಳ ಮೇಲಿನ ಹಕ್ಕಿಗೆ ಪಾಲುದಾರರಾದ ಇತರೆ ಮಾಲೀಕರು ಇದ್ದರೆ, ಅವರ ಒಪ್ಪಿಗೆ ಪತ್ರ
                ಒದಗಿಸುವುದು.
              </label>
              <br />
              <label className={labelClass}>
                Whether unconditional consent of the other owners having share in the right to land
                and the trees if any is obtained
              </label>
            </td>
            <td colSpan="4" className={tdRight4}>
              <select
                name="consent"
                value={formData.consent}
                onChange={handleInputChange}
                className={selectClass}
              >
                <option value="0">&lt;--Select--&gt;</option>
                <option value="1">Yes</option>
                <option value="2">No</option>
              </select>
              <b className={requiredStar}>*</b>
            </td>
          </tr>
          <tr>
            <td colSpan="4" className={tdLeft4}>
              <label className={labelClass}>
                5.) ಈ ಕೆಳಗಿನ ಪ್ರದೇಶಗಳಲ್ಲಿ ಮರ ಕಡಿತಲೆಗೆ ಅರ್ಜಿ ಸಲ್ಲಿಸಿದಲ್ಲಿ, ಪರವಾನಗಿ ಅಥವಾ
                ಪ್ರಮಾಣಪತ್ರವನ್ನು ಲಗತ್ತಿಸಲಾಗಿದೆಯೆ?
              </label>
              <br />
              <label className={labelClass}>
                Whether the license or certificate irrespective of the following is enclosed in case
                the purpose of felling is for
              </label>
            </td>
            <td colSpan="4" className={tdRight4}>
              <select
                name="license"
                value={formData.license}
                onChange={handleInputChange}
                className={selectClass}
              >
                <option value="0">&lt;--Select--&gt;</option>
                <option value="1">Yes</option>
                <option value="2">No</option>
              </select>
              <b className={requiredStar}>*</b>
            </td>
          </tr>
          {formData.license === '1' && (
            <tr>
              <td colSpan="8" className="p-[5px]">
                <div className="mt-[10px] flex flex-col gap-[5px]">
                  <label className={labelClass}>
                    <input
                      type="radio"
                      name="licenseCert"
                      value="0"
                      onChange={handleInputChange}
                      checked={formData.licenseCert === '0'}
                    />{' '}
                    (i) ಕಾಫಿ ಬೋರ್ಡ್ ನಿಂದ ಕಾಫಿ-ಸಾಗುವಳಿ ಪ್ರಮಾಣಪತ್ರ/Coffee-cultivation certificate from
                    Coffee Board
                  </label>
                  <label className={labelClass}>
                    <input
                      type="radio"
                      name="licenseCert"
                      value="1"
                      onChange={handleInputChange}
                      checked={formData.licenseCert === '1'}
                    />{' '}
                    (ii) ರಬ್ಬರ್ ಬೋರ್ಡ್ ನಿಂದ ರಬ್ಬರ್-ಸಾಗುವಳಿ ಪ್ರಮಾಣಪತ್ರ/Rubber-cultivation certificate
                    from Rubber Board
                  </label>
                  <label className={labelClass}>
                    <input
                      type="radio"
                      name="licenseCert"
                      value="2"
                      onChange={handleInputChange}
                      checked={formData.licenseCert === '2'}
                    />{' '}
                    (III) ಕಾರ್ಡಮಮ್ ಬೋರ್ಡ್ ನಿಂದ ಕಾರ್ಡಮಮ್(ಏಲಕ್ಕಿ)-ಸಾಗುವಳಿ
                    ಪ್ರಮಾಣಪತ್ರ/Cardamum-cultivation certificate from Cardamum Board
                  </label>
                  <label className={labelClass}>
                    <input
                      type="radio"
                      name="licenseCert"
                      value="3"
                      onChange={handleInputChange}
                      checked={formData.licenseCert === '3'}
                    />{' '}
                    (iv) ಕಟ್ಟಡ ನಿರ್ಮಾಣಕ್ಕಾಗಿ ಗ್ರಾಮ ಪಂಚಾಯತಿಯಿಂದ ಅಥವಾ ಪುರಸಭೆಯ ಕಾರ್ಯನಿರ್ವಾಹಕ
                    ಅಧಿಕಾರಿಯಿಂದ ಪ್ರಮಾಣಪತ್ರ/For construction of building Certificate from Village
                    Panchayat or Executive Officers of the municipality as the case may be
                  </label>
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
