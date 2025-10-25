import { useState } from 'react';
import InvoiceForm from '../../components/InvoiceForm';
import InvoicePreview from '../../components/preview/InvoicePreview';
import MainLoading from '../../components/common/MainLoading';

const InvoicePage = () => {
  const [invoiceData, setInvoiceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const handleGenerate = (data) => {
    setInvoiceData(data);
  };

  const handleBack = () => {
    setInvoiceData(null);
  };

  return <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-start py-10 px-4"> {loading ? (
        <MainLoading onFinish={() => setLoading(false)} />
      ) : !invoiceData ? (
        <InvoiceForm onGenerate={handleGenerate} />
      ) : (
        <InvoicePreview data={invoiceData} onBack={handleBack} />
      )}</div>;
};

export default InvoicePage;
