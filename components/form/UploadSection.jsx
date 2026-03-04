import React from 'react';

const sectionHeader = 'bg-[#3d3d3d] border-b-4 border-[#E18728] px-[10px] py-[6px] mb-0';
const sectionTitle = '!text-white text-[13px] m-0 p-0 font-normal';
const labelClass = 'text-[13px] text-[#242424]';
const fileInputClass =
  'px-1 py-[4px] text-[#333] border border-[#ccc] rounded-[3px] bg-white cursor-pointer';

const UploadSection = ({ formData, handleInputChange }) => {
  return (
    <div data-section="UploadSection">
      <div className={sectionHeader}>
        <h2 className={sectionTitle}>ಲಗತ್ತುಗಳು/Uploads(Only jpg Files &lt; 200 kb )</h2>
      </div>

      <table cellPadding="0" cellSpacing="0" className="w-full border-collapse">
        <tbody>
          <tr className="border-b border-gray-200">
            <td className="w-[65%] p-[10px_12px] align-middle text-[13px]">
              <label className={labelClass}>ಸ್ಥಳದ ಮೋಜಣಿ ನಕ್ಷೆ ಮೋಜಣಿ ಸಂಖ್ಯೆಯೊಂದಿಗೆ</label>
              <br />
              <label className={labelClass}>Location of the survey number with survey sketch</label>
            </td>
            <td className="w-[35%] p-[10px_12px] text-right align-middle">
              <input
                type="file"
                name="fupLocation"
                onChange={handleInputChange}
                accept=".jpg,.jpeg,image/jpeg"
                className={fileInputClass}
              />
            </td>
          </tr>

          {formData.consent === '1' && (
            <tr className="border-b border-gray-200">
              <td className="w-[65%] p-[10px_12px] align-middle text-[13px]">
                <label className={labelClass}>
                  ಭೂಮಿ ಮತ್ತು ಮರಗಳ ಮೇಲಿನ ಹಕ್ಕಿಗೆ ಪಾಲುದಾರರಾದ ಮಾಲೀಕರ ಒಪ್ಪಿಗೆ ಪತ್ರ
                </label>
                <br />
                <label className={labelClass}>
                  Unconditional consent of the other owners having share in the right on land and
                  the trees
                </label>
              </td>
              <td className="w-[35%] p-[10px_12px] text-right align-middle">
                <input
                  type="file"
                  name="fupTreeRights"
                  onChange={handleInputChange}
                  accept=".jpg,.jpeg,image/jpeg"
                  className={fileInputClass}
                />
              </td>
            </tr>
          )}

          <tr className="border-b border-gray-200">
            <td className="w-[65%] p-[10px_12px] align-middle text-[13px]">
              <label className={labelClass}>
                ತಹಸೀಲ್ದಾರ್ ಅಥವಾ ಸಂಬಂಧಪಟ್ಟ ಕಂದಾಯ ಅಧಿಕಾರಿಯಿಂದ ಭೂಮಿಯ ಬಗ್ಗೆ ಪಡೆದ ಖಾತಾ ಪತ್ರ .
              </label>
              <br />
              <label className={labelClass}>
                Khatha Extract regarding tenure of the land from concerned Revenue Authority.
              </label>
            </td>
            <td className="w-[35%] p-[10px_12px] text-right align-middle">
              <input
                type="file"
                name="fupKhataExtract"
                onChange={handleInputChange}
                accept=".jpg,.jpeg,image/jpeg"
                className={fileInputClass}
              />
            </td>
          </tr>

          <tr className="border-b border-gray-200">
            <td className="w-[65%] p-[10px_12px] align-middle text-[13px]">
              <label className={labelClass}>
                ತಹಸೀಲ್ದಾರ್ ಅಥವಾ ಸಂಬಂಧಪಟ್ಟ ಕಂದಾಯ ಅಧಿಕಾರಿಯಿಂದ ಭೂಮಿ ಮತ್ತು ಮರಗಳ ಮೇಲಿನ ಹಕ್ಕಿನ ಬಗ್ಗೆ
                ಪ್ರಮಾಣಪತ್ರ.
              </label>
              <br />
              <label className={labelClass}>
                Certificate of right over land and tree growth from concerned Revenue Authority.
              </label>
            </td>
            <td className="w-[35%] p-[10px_12px] text-right align-middle">
              <input
                type="file"
                name="fupRightCertificate"
                onChange={handleInputChange}
                accept=".jpg,.jpeg,image/jpeg"
                className={fileInputClass}
              />
            </td>
          </tr>

          {formData.license === '1' && (
            <tr className="border-b border-gray-200">
              <td className="w-[65%] p-[10px_12px] align-middle text-[13px]">
                <label className={labelClass}>ಸಾಗುವಳಿ ಪರವಾನಗಿ ಪ್ರಮಾಣಪತ್ರ.</label>
                <br />
                <label className={labelClass}>Cultivation Licence Certificate</label>
              </td>
              <td className="w-[35%] p-[10px_12px] text-right align-middle">
                <input
                  type="file"
                  name="fupLicenseCertificate"
                  onChange={handleInputChange}
                  accept=".jpg,.jpeg,image/jpeg"
                  className={fileInputClass}
                />
              </td>
            </tr>
          )}

          {formData.applicantType === 'gpa' && (
            <>
              <tr>
                <td colSpan="2" className="p-0">
                  <div className={sectionHeader}>
                    <h2 className={sectionTitle}>
                      ಜಿಪಿಎ ದಾಖಲೆ/GPA Documents(Only JPG Formate only)
                    </h2>
                  </div>
                </td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="w-[65%] p-[10px_12px] align-middle text-[13px]">
                  <label className={labelClass}>ಜಿಪಿಎ ದಾಖಲೆ/GPA Document</label>
                </td>
                <td className="w-[35%] p-[10px_12px] text-right align-middle">
                  <input
                    type="file"
                    name="fupGPA"
                    onChange={handleInputChange}
                    accept=".jpg,.jpeg,image/jpeg"
                    className={fileInputClass}
                  />
                </td>
              </tr>
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UploadSection;
