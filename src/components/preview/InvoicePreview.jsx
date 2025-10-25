import { useRef, useEffect, useState } from 'react';
import InvoiceActions from '../InvoiceActions';
import InvoiceDetails from './InvoiceDetails';
import WatermarkOverlay from './WaternarkOverlay';

const InvoicePreview = ({ data, onBack }) => {
  const invoiceRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [contentHeight, setContentHeight] = useState(0);

  if (!data) return null;

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      const newScale = screenWidth < 820 ? screenWidth / 820 : 1;
      setScale(newScale);

      if (invoiceRef.current) {
        setContentHeight(invoiceRef.current.scrollHeight * newScale);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      style={{
        height: `${contentHeight + 100}px`,
      }}
    >
      {/* Wrapper yang di-scale */}
      <div
        className="origin-top flex flex-col items-center gap-4"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'top center',
          width: '800px',
        }}
      >
        {/* Tombol Aksi */}
        <div className="w-[700px]">
          <InvoiceActions invoiceRef={invoiceRef} data={data} onBack={onBack} />
        </div>
        <div ref={invoiceRef} className="bg-white rounded-xl shadow-md w-[700px] relative overflow-hidden">
          {/* Isi Invoice */}
          <div className="relative z-10 text-gray-800 font-sans p-8">
            <InvoiceDetails data={data} />
          </div>
          <WatermarkOverlay />
        </div>
      </div>
    </div>
  );
};

export default InvoicePreview;
