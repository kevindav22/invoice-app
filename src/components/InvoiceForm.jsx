import { useState, useEffect } from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingButton from './common/LoadingButton';
import Captcha from './common/Captcha';

const LOCAL_STORAGE_KEY = 'invoiceFormData';

const InvoiceForm = ({ onGenerate }) => {
  // Load initial data dari localStorage
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    return saved
      ? JSON.parse(saved)
      : {
          customerName: '',
          customerPosition: '',
          customerEmail: '',
          customerPhone: '',
          items: [{ description: '', qty: '', price: '' }],
          tax: '',
          discount: '',
        };
  });

  const [loading, setLoading] = useState(false);
  const [captchaValid, setCaptchaValid] = useState(false);

  // Simpan data ke localStorage setiap formData berubah
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formData));
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const numericFields = ['tax', 'discount'];
    if (numericFields.includes(name) && value !== '' && !/^\d*\.?\d*$/.test(value)) return;
    setFormData({ ...formData, [name]: value });
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...formData.items];
    if (['qty', 'price'].includes(field) && value !== '' && !/^\d*\.?\d*$/.test(value)) return;
    updatedItems[index][field] = value;
    setFormData({ ...formData, items: updatedItems });
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { description: '', qty: '', price: '' }],
    });
  };

  const deleteItem = (index) => {
    const updatedItems = formData.items.filter((_, i) => i !== index);
    setFormData({ ...formData, items: updatedItems });
  };

  const handleReset = () => {
    const emptyData = {
      customerName: '',
      customerPosition: '',
      customerEmail: '',
      customerPhone: '',
      items: [{ description: '', qty: '', price: '' }],
      tax: '',
      discount: '',
    };
    setFormData(emptyData);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    toast.success('Form has been reset!', {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: true,
      theme: 'colored',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!captchaValid) {
      toast.error('You seem not to be human. Please try again!', {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: true,
        theme: 'colored',
      });
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onGenerate(formData);
    }, 1500);
  };

  return (
    <>
      <ToastContainer />
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-8 bg-white rounded-2xl shadow-lg border border-gray-200">
        <h2 className="text-3xl font-bold mb-6 text-center text-red-600 tracking-wide">INVOICE FORM</h2>

        {/* Customer Information */}
        <div className="bg-gray-50 rounded-xl p-5 shadow-sm space-y-4 border border-gray-200">
          <h3 className="font-semibold text-red-600 border-b border-red-200 pb-2">Customer Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: 'Customer Name', name: 'customerName', placeholder: 'John Doe' },
              { label: 'Customer Position', name: 'customerPosition', placeholder: 'Purchasing Manager' },
              { label: 'Customer Email', name: 'customerEmail', type: 'email', placeholder: 'john@example.com' },
              { label: 'Customer Phone', name: 'customerPhone', placeholder: '0887 7363 9873' },
            ].map(({ label, name, type = 'text', placeholder }) => (
              <div key={name}>
                <label htmlFor={name} className="block text-sm text-gray-700 mb-1">
                  {label}
                </label>
                <input
                  id={name}
                  type={type}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  placeholder={placeholder}
                  className="w-full border border-gray-300 p-2 rounded-md focus:ring-1 focus:ring-red-500 focus:outline-none placeholder-gray-400 placeholder-opacity-70"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Items List */}
        <div className="bg-gray-50 rounded-xl p-5 shadow-sm space-y-3 mt-6 border border-gray-200">
          <div className="flex flex-wrap justify-between items-center border-b border-red-200 pb-2 gap-2">
            <h3 className="font-semibold text-red-600">Items / Services</h3>
            <button type="button" onClick={addItem} className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white text-sm px-3 py-2 rounded-md transition-all">
              <FaPlus /> Add Item
            </button>
          </div>

          {formData.items.map((item, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-3 relative bg-white p-4 rounded-lg ">
              <button type="button" onClick={() => deleteItem(index)} className="absolute -top-3 -right-3 bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-full shadow-md transition-all" title="Delete item">
                <FaTrash size={12} />
              </button>

              <div>
                <label htmlFor={`description-${index}`} className="block text-sm text-gray-700 mb-1">
                  Description
                </label>
                <input
                  id={`description-${index}`}
                  name={`description-${index}`}
                  type="text"
                  value={item.description}
                  onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                  placeholder="Website development service"
                  className="w-full border border-gray-300 p-2 rounded-md focus:ring-1 focus:ring-red-500 focus:outline-none placeholder-gray-400 placeholder-opacity-70"
                />
              </div>

              <div>
                <label htmlFor={`qty-${index}`} className="block text-sm text-gray-700 mb-1">
                  Quantity (Qty)
                </label>
                <input
                  id={`qty-${index}`}
                  name={`qty-${index}`}
                  type="number"
                  value={item.qty}
                  onChange={(e) => handleItemChange(index, 'qty', e.target.value)}
                  placeholder="2"
                  className="w-full border border-gray-300 p-2 rounded-md focus:ring-1 focus:ring-red-500 focus:outline-none appearance-none placeholder-gray-400 placeholder-opacity-70"
                />
              </div>

              <div>
                <label htmlFor={`price-${index}`} className="block text-sm text-gray-700 mb-1">
                  Unit Price
                </label>
                <input
                  id={`price-${index}`}
                  name={`price-${index}`}
                  type="number"
                  value={item.price}
                  onChange={(e) => handleItemChange(index, 'price', e.target.value)}
                  placeholder="1500"
                  className="w-full border border-gray-300 p-2 rounded-md focus:ring-1 focus:ring-red-500 focus:outline-none appearance-none placeholder-gray-400 placeholder-opacity-70"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Tax and Discount */}
        <div className="bg-gray-50 rounded-xl p-5 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 border border-gray-200">
          <div>
            <label htmlFor="tax" className="block text-sm text-gray-700 mb-1">
              Tax (%)
            </label>
            <input
              id="tax"
              type="number"
              name="tax"
              value={formData.tax}
              onChange={handleChange}
              placeholder="11"
              className="w-full border border-gray-300 p-2 rounded-md focus:ring-1 focus:ring-red-500 focus:outline-none appearance-none placeholder-gray-400 placeholder-opacity-70"
            />
          </div>

          <div>
            <label htmlFor="discount" className="block text-sm text-gray-700 mb-1">
              Discount (%)
            </label>
            <input
              id="discount"
              type="number"
              name="discount"
              value={formData.discount}
              onChange={handleChange}
              placeholder="10"
              className="w-full border border-gray-300 p-2 rounded-md focus:ring-1 focus:ring-red-500 focus:outline-none appearance-none placeholder-gray-400 placeholder-opacity-70"
            />
          </div>
        </div>

        {/* CAPTCHA */}
        <Captcha onValidate={setCaptchaValid} />

        {/* Submit & Reset Buttons */}
        <div className="mt-4 flex flex-col gap-3">
          <LoadingButton
            loading={loading}
            onClick={handleSubmit}
            className={`w-full flex items-center justify-center gap-2 font-semibold px-6 py-3 rounded-lg shadow-md text-white transition-all duration-300 ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
            loadingText="Processing..."
          >
            Generate Invoice
          </LoadingButton>

          <button type="button" onClick={handleReset} className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-all">
            Reset
          </button>
        </div>

        {/* COPYRIGHT */}
        <p className="text-[10px] text-gray-400 mt-6 text-center">© {new Date().getFullYear()} Davintech Creative Studio. All rights reserved.</p>
      </form>
    </>
  );
};

export default InvoiceForm;
