import React from 'react';

const labelClass = 'text-[13px] text-[#242424]';
const inputClass = 'px-1 py-[4px] text-[#333] border border-[#ccc] rounded-[3px] bg-white';
const tdRight = 'p-[5px] align-top text-right';
const tdLeft = 'p-[5px] align-top text-left';
const requiredStar = 'text-red-600 text-lg font-bold';

const LandExtent = ({ formData, handleInputChange }) => {
  const handleGuntasChange = (e) => {
    let val = parseInt(e.target.value, 10);
    if (val < 0 || val > 39) {
      alert('Guntas must be between 1 and 39');
      e.target.value = '';
    } else {
      handleInputChange(e);
    }
  };

  const handleAnnaChange = (e) => {
    let val = parseInt(e.target.value, 10);
    if (val < 0 || val > 15) {
      alert('Anna must be between 1 and 15');
      e.target.value = '';
    } else {
      handleInputChange(e);
    }
  };

  return (
    <div data-section="LandExtent">
      <table cellPadding="2" cellSpacing="2" className="border-collapse">
        <tbody>
          <tr>
            <td className={tdRight}>
              <label className={labelClass}>ಸರ್ವೆ ಸಂಖ್ಯೆ</label>
              <br />
              <label className={labelClass}>Survey Number</label>
            </td>
            <td className={tdLeft}>
              <input
                type="text"
                name="surveyNo"
                value={formData.surveyNo}
                onChange={handleInputChange}
                className={`${inputClass} w-[90%]`}
              />
              <b className={requiredStar}>*</b>
            </td>
          </tr>
          <tr>
            <td className={tdRight}>
              <label className={labelClass}>ಖಾತಾ ಸಂಖ್ಯೆ</label>
              <br />
              <label className={labelClass}>Khata Number</label>
            </td>
            <td className={tdLeft}>
              <input
                type="text"
                name="khataNo"
                value={formData.khataNo}
                onChange={handleInputChange}
                className={`${inputClass} w-[90%]`}
              />
              <b className={requiredStar}>*</b>
            </td>
          </tr>
          <tr>
            <td className={tdRight}>
              <label className={labelClass}>ಒಟ್ಟು ವಿಸ್ತೀರ್ಣ/Total Extent:</label>
            </td>
            <td className={tdLeft}>
              <label className={labelClass}>ಎಕರೆ/Acres :</label>
              <input
                type="number"
                name="acres"
                value={formData.acres}
                onChange={handleInputChange}
                className={`${inputClass} w-[45%]`}
              />
            </td>
            <td className="flex flex-row items-center gap-1 p-[5px] align-middle">
              <label className={labelClass}>ಗುಂಟೆ/Guntas </label>
              <input
                type="number"
                name="guntas"
                value={formData.guntas}
                onChange={handleGuntasChange}
                className={`${inputClass} w-[45%]`}
                min="0"
                max="39"
              />

              <label className={labelClass}>ಆಣೆ/Anna </label>
              <input
                type="number"
                name="anna"
                value={formData.anna}
                onChange={handleAnnaChange}
                className={`${inputClass} w-[45%]`}
                min="0"
                max="15"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default LandExtent;
