import React, { useEffect, useState } from 'react';

const sectionHeader = 'bg-[#3d3d3d] border-b-4 border-[#E18728] px-[10px] py-[6px] mb-0';
const sectionTitle = '!text-white text-[13px] m-0 p-0 font-normal';
const labelClass = 'text-[13px] text-[#242424]';
const selectClass = 'px-1 py-[3px] text-[#333] border border-[#ccc] rounded-[3px] bg-white w-5/8';
const tdRight = 'p-[5px] align-top text-right';
const tdLeft = 'p-[5px] align-top text-left';
const requiredStar = 'text-red-600 text-lg font-bold';

const LocationDetails = ({ formData, handleInputChange }) => {
  const [districts, setDistricts] = useState([]);
  const [taluks, setTaluks] = useState([]);
  const [villages, setVillages] = useState([]);

  useEffect(() => {
    // Fetch Districts on mount
    const fetchDistricts = async () => {
      try {
        const res = await fetch('/api/locations/districts');
        const data = await res.json();
        setDistricts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Failed to fetch districts', error);
        setDistricts([]);
      }
    };
    fetchDistricts();
  }, []);

  useEffect(() => {
    // Fetch Taluks when a district is selected
    const fetchTaluks = async () => {
      if (formData.district && formData.district !== '0') {
        try {
          const res = await fetch(`/api/locations/taluks?districtId=${formData.district}`);
          const data = await res.json();
          setTaluks(Array.isArray(data) ? data : []);
        } catch (error) {
          console.error('Failed to fetch taluks', error);
          setTaluks([]);
        }
      } else {
        setTaluks([]);
      }
    };
    fetchTaluks();
  }, [formData.district]);

  useEffect(() => {
    // Fetch Villages when a taluk is selected (and area is rural)
    const fetchVillages = async () => {
      if (formData.areaType === 'rural_area' && formData.taluk && formData.taluk !== '0') {
        try {
          const res = await fetch(`/api/locations/villages?talukId=${formData.taluk}`);
          const data = await res.json();
          setVillages(Array.isArray(data) ? data : []);
        } catch (error) {
          console.error('Failed to fetch villages', error);
          setVillages([]);
        }
      } else {
        setVillages([]);
      }
    };
    fetchVillages();
  }, [formData.taluk, formData.areaType]);

  return (
    <div>
      <div className={sectionHeader}>
        <h2 className={sectionTitle}>
          ಮರ ಕಟಾವಣೆಗೆ ಕೋರಿರುವ ಸ್ಥಳದ ಕುರಿತು ವಿವರಗಳು/Details regarding location where felling is being
          applied for
        </h2>
      </div>
      <br />

      <table cellPadding="2" cellSpacing="2" className="w-full border-collapse">
        <tbody>
          <tr>
            <td className={tdRight}>
              <label className={labelClass}>ಪ್ರದೇಶದ ವಿಧ</label>
              <br />
              <label className={`${labelClass} font-bold`}>In Area Type:</label>
            </td>
            <td className={tdLeft} colSpan="3">
              <select
                name="areaType"
                value={formData.areaType || '0'}
                onChange={handleInputChange}
                className={selectClass}
              >
                <option value="0">&lt;--Select--&gt;</option>
                <option value="urban_area">
                  ನಗರ/ಪಟ್ಟಣ ಪ್ರದೇಶ/Urban Area(ULB Including Corporations, Municipalities etc..)
                </option>
                <option value="rural_area">ಗ್ರಾಮೀಣ ಪ್ರದೇಶ/Rural Area</option>
              </select>
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
                name="district"
                value={formData.district || '0'}
                onChange={handleInputChange}
                className={selectClass}
              >
                <option value="0">&lt;--Select--&gt;</option>
                {Array.isArray(districts) && districts.map((d) => (
                  <option key={d.district_id} value={d.district_id}>
                    {d.district_name}
                  </option>
                ))}
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
                name="taluk"
                value={formData.taluk || '0'}
                onChange={handleInputChange}
                className={selectClass}
              >
                <option value="0">&lt;--Select--&gt;</option>
                {Array.isArray(taluks) && taluks.map((t) => (
                  <option key={t.taluk_id} value={t.taluk_id}>
                    {t.taluk_name}
                  </option>
                ))}
              </select>
              <b className={requiredStar}>*</b>
            </td>
          </tr>

          {/* Show only if Rural Area is selected */}
          {formData.areaType === 'rural_area' && (
            <>
              <tr>
                <td className={tdRight}>
                  <label className={labelClass}>ಹೋಬಳಿ</label>
                  <br />
                  <label className={labelClass}>Hobli</label>
                </td>
                <td className={tdLeft}>
                  <select
                    name="hobli"
                    value={formData.hobli || '0'}
                    onChange={handleInputChange}
                    className={selectClass}
                  >
                    <option value="0">&lt;--Select--&gt;</option>
                    <option value="kasaba">Kasaba</option>
                    <option value="dudda">Dudda</option>
                    {/* TODO: Add logic for hobli if it exists in the database, currently missing from schema */}
                  </select>
                  <b className={requiredStar}>*</b>
                </td>
                <td className={tdRight}>
                  <label className={labelClass}>ಗ್ರಾಮ</label>
                  <br />
                  <label className={labelClass}>City/Village</label>
                </td>
                <td className={tdLeft}>
                  <select
                    name="village"
                    value={formData.village || '0'}
                    onChange={handleInputChange}
                    className={selectClass}
                  >
                    <option value="0">&lt;--Select--&gt;</option>
                    {Array.isArray(villages) && villages.map((v) => (
                      <option key={v.village_id} value={v.village_id}>
                        {v.village_name}
                      </option>
                    ))}
                  </select>
                  <b className={requiredStar}>*</b>
                </td>
              </tr>
            </>
          )}

          {/* Show only if Urban Area is selected */}
          {formData.areaType === 'urban_area' && (
            <tr>
              <td colSpan="4" className="w-full p-4">
                <div>
                  <label className={labelClass}>ನಗರ/ಪಟ್ಟಣ ಪ್ರದೇಶವನ್ನು ಆಯ್ಕೆ ಮಾಡಿ</label>
                  <br />
                  <label className={labelClass}>Select Urban Area</label>
                  <select
                    name="urbanArea"
                    value={formData.urbanArea || '0'}
                    onChange={handleInputChange}
                    className={selectClass}
                  >
                    <option value="0">&lt;--Select--&gt;</option>
                    <option value="woodlots">Woodlots</option>
                    <option value="governmentland">Government Land</option>
                    <option value="privateownedland">Private Owned Land</option>
                    <option value="other">Other</option>
                  </select>
                  <b className={requiredStar}>*</b>
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
