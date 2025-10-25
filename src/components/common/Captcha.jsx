import { useState, useEffect } from 'react';
import { FaSyncAlt } from 'react-icons/fa';

const generateCaptchaText = () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789afdghjlkahrgkb';
  return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
};

const Captcha = ({ onValidate }) => {
  const [captcha, setCaptcha] = useState('');
  const [userInput, setUserInput] = useState('');

  useEffect(() => {
    setCaptcha(generateCaptchaText());
  }, []);

  const refreshCaptcha = () => {
    setCaptcha(generateCaptchaText());
    setUserInput('');
    onValidate(false);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setUserInput(value);
    onValidate(value === captcha);
  };

  return (
    <div className="relative text-center">
      {/* Box Luar */}
      <div className="inline-block bg-  rounded-lg py-6">
        {/* Teks Captcha */}
        <div className="flex justify-center items-center gap-3 mb-6 mt-4">
          <div
            className="bg-red-600 text-red-500 font-mono text-xl font-bold px-5 py-3 rounded select-none "
            style={{
              letterSpacing: '10px',
              transform: 'rotate(-4deg)',
            }}
          >
            {captcha}
          </div>
          <button type="button" onClick={refreshCaptcha} title="Refresh kode" className="text-red-600 hover:text-red-800 transition-transform transform hover:rotate-90">
            <FaSyncAlt size={20} />
          </button>
        </div>

        <p className="font-semibold text-red-600 tracking-widest mb-2 ">Are you human?</p>
        {/* Input */}
        <input id="captcha" name="captcha" type="text" value={userInput} onChange={handleChange} placeholder="type your code here....." className="w-50 border border-gray-300 rounded-lg p-2 text-center font-light  outline-none" />
      </div>
    </div>
  );
};

export default Captcha;
