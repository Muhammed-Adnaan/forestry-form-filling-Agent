import React from 'react';

// Shared Tailwind class strings for reuse
const sectionHeader = 'bg-[#3d3d3d] border-b-4 border-[#E18728] px-[10px] py-[6px] mb-0';
const sectionTitle = '!text-white text-[13px] m-0 p-0 font-normal';
const labelClass = 'text-[13px] text-[#242424]';
const inputClass = 'px-1 py-[4px] text-[#333] border border-[#ccc] rounded-[3px] bg-white w-[90%]';
const selectClass = 'px-1 py-[3px] text-[#333] border border-[#ccc] rounded-[3px] bg-white w-[92%]';
const tdRight = 'p-[5px] align-top text-right';
const tdLeft = 'p-[5px] align-top text-left';
const requiredStar = 'text-red-600 text-lg font-bold';

const ApplicantDetails = ({ formData, handleInputChange }) => {
  const validateMobile = (e) => {
    const pattern = /^\d{10}$/;
    if (!pattern.test(e.target.value) && e.target.value !== '') {
      alert('Phone number should be in 0123456789 format');
      e.target.focus();
    } else {
      handleInputChange(e);
    }
  };

  const validateEmail = (e) => {
    const filter = /^([a-z A-Z 0-9 _.-])+@(([a-z A-Z 0-9-])+.)+([a-z A-z 0-9]{3,3})+$/;
    if (!filter.test(e.target.value) && e.target.value !== '') {
      alert('Email is in www.gmail.com format (e.g., user@domain.com)');
      e.target.focus();
    } else {
      handleInputChange(e);
    }
  };

  const validatePincode = (e) => {
    const pat1 = /^\d{6}$/;
    if (!pat1.test(e.target.value) && e.target.value !== '') {
      alert('Pin code should be 6 digits');
      e.target.focus();
    } else {
      handleInputChange(e);
    }
  };

  return (
    <div>
      <div className={sectionHeader}>
        <h2 className={sectionTitle}>ಅರ್ಜಿದಾರರ ವಿವರಗಳು/Applicant Details(Communication Address)</h2>
      </div>

      <table cellPadding="2" cellSpacing="2" className="w-full border-collapse">
        <tbody>
          <tr>
            <td className={tdRight}>
              <label className={labelClass}>ಅರ್ಜಿದಾರರ ವಿಧ</label>
              <br />
              <label className={labelClass}>Applicant Type</label>
            </td>
            <td className={tdLeft}>
              <select
                name="applicantType"
                value={formData.applicantType}
                onChange={handleInputChange}
                className={selectClass}
              >
                <option value="0">&lt;--Select--&gt;</option>
                <option value="individual">Individual</option>
                <option value="company">Company</option>
                <option value="gpa">GPA Holder</option>
              </select>
              <b className={requiredStar}>*</b>
            </td>
            <td className={tdRight}>
              <label className={labelClass}>ಅರ್ಜಿದಾರರ ಹೆಸರು</label>
              <br />
              <label className={labelClass}>Applicant Name</label>
            </td>
            <td className={tdLeft}>
              <input
                type="text"
                name="applicantName"
                value={formData.applicantName}
                onChange={handleInputChange}
                className={inputClass}
              />
              <b className={requiredStar}>*</b>
            </td>
          </tr>
          <tr>
            <td className={tdRight}>
              <label className={labelClass}>ವಿಳಾಸ</label>
              <br />
              <label className={labelClass}>Address</label>
            </td>
            <td className={tdLeft}>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className={inputClass}
                rows="3"
              />
              <b className={requiredStar}>*</b>
            </td>
            <td className={tdRight}>
              <label className={labelClass}>ಜಿಲ್ಲೆ</label>
              <br />
              <label className={labelClass}>District</label>
            </td>
            <td className={tdLeft}>
              <select
                name="applicantDistrict"
                value={formData.applicantDistrict}
                onChange={handleInputChange}
                className={selectClass}
              >
                <option value="0">&lt;--Select--&gt;</option>
                <option value="hassan">Hassan</option>
              </select>
              <b className={requiredStar}>*</b>
            </td>
          </tr>
          <tr>
            <td className={tdRight}>
              <label className={labelClass}>ತಾಲ್ಲೂಕು</label>
              <br />
              <label className={labelClass}>Taluk</label>
            </td>
            <td className={tdLeft}>
              <select
                name="applicantTaluk"
                value={formData.applicantTaluk}
                onChange={handleInputChange}
                className={selectClass}
              >
                <option value="0">&lt;--Select--&gt;</option>
                <option value="hassan">Hassan</option>
              </select>
              <b className={requiredStar}>*</b>
            </td>
            <td className={tdRight}>
              <label className={labelClass}>ಪಿನ್ ಕೋಡ್</label>
              <br />
              <label className={labelClass}>Pincode</label>
            </td>
            <td className={tdLeft}>
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleInputChange}
                onBlur={validatePincode}
                maxLength="6"
                className={inputClass}
              />
              <b className={requiredStar}>*</b>
            </td>
          </tr>
          <tr>
            <td className={tdRight}>
              <label className={labelClass}>ಮೊಬೈಲ್ ಸಂಖ್ಯೆ</label>
              <br />
              <label className={labelClass}>Mobile Number</label>
            </td>
            <td className={tdLeft}>
              <input
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
                onBlur={validateMobile}
                maxLength="10"
                className={inputClass}
              />
              <b className={requiredStar}>*</b>
            </td>
            <td className={tdRight}>
              <label className={labelClass}>ಇಮೇಲ್ ಐಡಿ</label>
              <br />
              <label className={labelClass}>Email Id</label>
            </td>
            <td className={tdLeft}>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                onBlur={validateEmail}
                className={inputClass}
              />
            </td>
          </tr>
        </tbody>
      </table>

      {/* Conditional Land Owner Details based on Applicant Type */}
      {formData.applicantType === 'gpa' && (
        <div>
          <div className={sectionHeader}>
            <h2 className={sectionTitle}>Land Owner Details:</h2>
          </div>
          <table cellPadding="2" cellSpacing="2" className="w-full border-collapse">
            <tbody>
              <tr>
                <td className={tdRight}>
                  <label className={labelClass}>ಸ್ಥಳದ ಮಾಲೀಕರ ಹೆಸರು</label>
                  <br />
                  <label className={labelClass}>Land Owner Name</label>
                </td>
                <td className={tdLeft}>
                  <input
                    type="text"
                    name="landOwnerName"
                    value={formData.landOwnerName}
                    onChange={handleInputChange}
                    className={inputClass}
                  />
                  <b className={requiredStar}>*</b>
                </td>
                <td className={tdRight}>
                  <label className={labelClass}>ಸ್ಥಳದ ಮಾಲೀಕರ ವಿಳಾಸ</label>
                  <br />
                  <label className={labelClass}>Land Owner Address</label>
                </td>
                <td className={tdLeft}>
                  <textarea
                    name="landOwnerAddress"
                    value={formData.landOwnerAddress}
                    onChange={handleInputChange}
                    className={inputClass}
                    rows="3"
                  />
                  <b className={requiredStar}>*</b>
                </td>
              </tr>
              <tr>
                <td className={tdRight}>
                  <label className={labelClass}>ಜಿಲ್ಲೆ</label>
                  <br />
                  <label className={labelClass}>District</label>
                </td>
                <td className={tdLeft}>
                  <select
                    name="landOwnerDistrict"
                    value={formData.landOwnerDistrict}
                    onChange={handleInputChange}
                    className={selectClass}
                  >
                    <option value="0">&lt;--Select--&gt;</option>
                    <option value="hassan">Hassan</option>
                  </select>
                  <b className={requiredStar}>*</b>
                </td>
                <td className={tdRight}>
                  <label className={labelClass}>ತಾಲ್ಲೂಕು</label>
                  <br />
                  <label className={labelClass}>Taluk</label>
                </td>
                <td className={tdLeft}>
                  <select
                    name="landOwnerTaluk"
                    value={formData.landOwnerTaluk}
                    onChange={handleInputChange}
                    className={selectClass}
                  >
                    <option value="0">&lt;--Select--&gt;</option>
                    <option value="hassan">Hassan</option>
                  </select>
                  <b className={requiredStar}>*</b>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ApplicantDetails;
