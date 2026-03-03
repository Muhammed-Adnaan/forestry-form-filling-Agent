import React from 'react';

const sectionHeader = 'bg-[#3d3d3d] border-b-4 border-[#E18728] px-[10px] py-[6px] mb-0';
const sectionTitle = '!text-white text-[13px] m-0 p-0 font-normal';
const labelClass = 'text-[13px] text-[#242424]';
const tdRight = 'p-[5px] align-top text-right w-1/5';
const tdLeft = 'p-[5px] align-top text-left w-[30%]';
const textareaClass =
  'px-1 py-[4px] text-[#333] border border-[#ccc] rounded-[3px] bg-white w-[90%]';
const requiredStar = 'text-red-600 text-lg font-bold';

const BoundaryDetails = ({ formData, handleInputChange }) => {
  return (
    <div data-section="BoundaryDetails">
      <div className={sectionHeader}>
        <h2 className={sectionTitle}>ಪ್ರದೇಶದ ಗಡಿ ವಿವರಗಳು/Site boundary details (Chakbandi)</h2>
      </div>

      <table cellPadding="2" cellSpacing="2" className="w-full border-collapse">
        <tbody>
          <tr>
            <td className={tdRight}>
              <label className={labelClass}>ಪೂರ್ವ/East</label>
            </td>
            <td className={tdLeft}>
              <textarea
                name="east"
                value={formData.east}
                onChange={handleInputChange}
                className={textareaClass}
                rows="2"
              />
              <b className={requiredStar}>*</b>
            </td>
            <td className={tdRight}>
              <label className={labelClass}>ಪಶ್ಚಿಮ/West</label>
            </td>
            <td className={tdLeft}>
              <textarea
                name="west"
                value={formData.west}
                onChange={handleInputChange}
                className={textareaClass}
                rows="2"
              />
              <b className={requiredStar}>*</b>
            </td>
          </tr>
          <tr>
            <td className={tdRight}>
              <label className={labelClass}>ಉತ್ತರ/North</label>
            </td>
            <td className={tdLeft}>
              <textarea
                name="north"
                value={formData.north}
                onChange={handleInputChange}
                className={textareaClass}
                rows="2"
              />
              <b className={requiredStar}>*</b>
            </td>
            <td className={tdRight}>
              <label className={labelClass}>ದಕ್ಷಿಣ/South</label>
            </td>
            <td className={tdLeft}>
              <textarea
                name="south"
                value={formData.south}
                onChange={handleInputChange}
                className={textareaClass}
                rows="2"
              />
              <b className={requiredStar}>*</b>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default BoundaryDetails;
