import { useState } from 'react';
import { toJpeg } from 'html-to-image';
import { jsPDF } from 'jspdf';
import { saveAs } from 'file-saver';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingButton from './common/LoadingButton';

const InvoiceActions = ({ invoiceRef, data, onBack }) => {
  const [loadingJPEG, setLoadingJPEG] = useState(false);
  const [loadingPDF, setLoadingPDF] = useState(false);

  // Fungsi untuk membangun nama file
  const getFileName = () => {
    const name = data.customerName?.trim().replace(/\s+/g, '_') || 'customer';
    const description = data.items?.[0]?.description?.trim().replace(/\s+/g, '_') || 'invoice';
    return `${name}-${description}`;
  };

  const handleDownloadJPEG = () => {
    const element = invoiceRef.current;
    if (!element) return;

    setLoadingJPEG(true);

    setTimeout(async () => {
      try {
        const imgData = await toJpeg(element, {
          quality: 1,
          backgroundColor: '#ffffff',
          pixelRatio: 3,
          cacheBust: true,
        });

        saveAs(imgData, `${getFileName()}.jpeg`);
      } catch (err) {
        toast.error('Failed to generate JPEG. Make sure all images are loaded and your connection is stable.', { position: 'top-center', autoClose: 3000 });
      } finally {
        setLoadingJPEG(false);
      }
    }, 1000);
  };

  const handleDownloadPDF = () => {
    const element = invoiceRef.current;
    if (!element) return;

    setLoadingPDF(true);

    setTimeout(async () => {
      try {
        const imgData = await toJpeg(element, {
          quality: 1,
          backgroundColor: '#ffffff',
          pixelRatio: 3,
          cacheBust: true,
        });

        const pdf = new jsPDF('p', 'pt', 'a4');
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();

        const img = new Image();
        img.src = imgData;
        await new Promise((res) => (img.onload = res));

        const imgWidth = pageWidth;
        const imgHeight = (img.height * pageWidth) / img.width;

        let heightLeft = imgHeight;
        let position = 0;
        const tolerance = 30;

        while (heightLeft - pageHeight > tolerance) {
          pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
          position -= pageHeight;
          pdf.addPage();
        }

        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
        pdf.save(`${getFileName()}.pdf`);
      } catch (err) {
        toast.error('Failed to generate PDF. Make sure all images are loaded and your connection is stable.', { position: 'top-center', autoClose: 3000 });
      } finally {
        setLoadingPDF(false);
      }
    }, 1000);
  };

  return (
    <>
      <ToastContainer />
      <div className="flex justify-between">
        <button onClick={onBack} className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md">
          ← Back
        </button>

        <div className="flex gap-2">
          <LoadingButton
            loading={loadingJPEG}
            onClick={handleDownloadJPEG}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center justify-center gap-2"
            disabledClass="bg-green-400 cursor-not-allowed"
            loadingText="Downloading..."
          >
            Download JPEG
          </LoadingButton>

          <LoadingButton
            loading={loadingPDF}
            onClick={handleDownloadPDF}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center justify-center gap-2"
            disabledClass="bg-blue-400 cursor-not-allowed"
            loadingText="Processing PDF..."
          >
            Download PDF
          </LoadingButton>
        </div>
      </div>
    </>
  );
};

export default InvoiceActions;
