import React from 'react';

const TopNavbar = ({ language, setLanguage }) => {
  return (
    <div className="flex h-[60px] items-center border-b border-gray-200 bg-white px-5">
      <img
        src="/kar-gov-logo.png"
        alt="Karnataka Emblem"
        className="mr-[14px] h-[42px]"
        onError={(e) => {
          e.target.style.display = 'none';
        }}
      />
      <div className="flex-1 text-[15px] font-bold text-[#222]">
        ಇ-ಕಟಾವಣೆ ಮತ್ತು ಸಾಗಾಣಿಕೆ e-Felling &amp; Transit
      </div>
      <div className="flex items-center gap-4">
        {/* Language Toggle */}
        <div className="flex items-center gap-2">
          <span
            className={`text-[13px] font-bold ${language === 'English' ? 'text-[#2e7d32]' : 'text-gray-500'}`}
          >
            ENG
          </span>
          <label className="relative inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              className="peer sr-only"
              checked={language === 'Kannada'}
              onChange={(e) => setLanguage(e.target.checked ? 'Kannada' : 'English')}
            />
            <div className="peer h-5 w-9 rounded-full bg-gray-200 peer-checked:bg-[#2e7d32] peer-focus:outline-none after:absolute after:top-[2px] after:left-[2px] after:h-4 after:w-4 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
          </label>
          <span
            className={`text-[13px] font-bold ${language === 'Kannada' ? 'text-[#2e7d32]' : 'text-gray-500'}`}
          >
            ಕನ್ನಡ
          </span>
        </div>

        {/* <button className="cursor-pointer rounded-[2px] border-none bg-[#2e7d32] px-3 py-[5px] text-[13px] font-bold tracking-[0.5px] text-white hover:bg-[#1b5e20]">
          MENU
        </button> */}
      </div>
    </div>
  );
};

export default TopNavbar;
