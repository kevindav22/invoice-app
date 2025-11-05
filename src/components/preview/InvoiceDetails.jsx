import { useState } from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import logoBase64 from '/logo.png';
import ttdBase64 from '/tanda.png';
import generateInvoiceNumber from '../common/InvoiceNumber';

const InvoiceDetails = ({ data }) => {
  const subtotal = data.items.reduce((acc, item) => acc + item.qty * item.price, 0);
  const taxAmount = (subtotal * data.tax) / 100;
  const discountAmount = (subtotal * data.discount) / 100;
  const total = subtotal + taxAmount - discountAmount;

  const [invoiceNo] = useState(generateInvoiceNumber());

  const defaultRows = 5;
  const itemRows = [...data.items];
  while (itemRows.length < defaultRows) {
    itemRows.push({ description: '', qty: '', price: '' });
  }

  return (
    <>
      {/* HEADER */}
      <div className="flex justify-between items-center border-b-4 border-red-600 pb-4 mb-2">
        <img src={logoBase64} alt="Logo" className="h-15 w-auto" />
        <div className="text-right">
          <h1 className="text-5xl font-bold text-red-600">INVOICE</h1>
          <p className="text-sm mt-1">No: {invoiceNo}</p>
          <p className="text-sm">Date: {new Date().toLocaleDateString()}</p>
        </div>
      </div>

      {/* CUSTOMER INFO */}
      <div className="grid grid-cols-2 mb-4 text-sm">
        <div>
          <h2 className="text-red-600 font-semibold text-lg">Invoice To:</h2>
          <p className="text-2xl font-bold uppercase tracking-wide">{data.customerName}</p>
          {data.customerPosition && <p>{data.customerPosition}</p>}
          {data.customerEmail && <p>Email: {data.customerEmail}</p>}
          <p>WhatsApp: {data.customerPhone}</p>
        </div>
        <div className="text-right">
          <h2 className="text-red-600 font-semibold text-lg mb-2">Payment Method:</h2>
          <p className='font-medium'>BRI : 6870 0100 6108 508</p>
          <p className='font-medium'> Dana : 088233634050</p>
          <p>A/n : Kevin David R</p>
        </div>
      </div>

      {/* DETAIL ITEMS */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full text-sm border-collapse">
          <thead className="bg-red-500 text-white">
            <tr>
              {[
                { title: 'No', align: 'text-center' },
                { title: 'Description', align: 'text-left' },
                { title: 'Qty', align: 'text-center' },
                { title: 'Price', align: 'text-right' },
                { title: 'Total', align: 'text-right' },
              ].map((col, i) => (
                <th key={i} className={`border border-red-400 p-3 font-semibold uppercase tracking-wide ${col.align}`}>
                  {col.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {itemRows.map((item, index) => {
              const values = [
                { val: index + 1, align: 'text-center' },
                { val: item.description, align: 'text-left' },
                { val: item.qty, align: 'text-center' },
                { val: item.price ? `Rp ${item.price.toLocaleString()}` : '', align: 'text-right' },
                {
                  val: item.qty && item.price ? `Rp ${(item.qty * item.price).toLocaleString()}` : '',
                  align: 'text-right',
                },
              ];
              return (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  {values.map((cell, i) => (
                    <td key={i} className={`border border-gray-300 p-3 ${cell.align}`}>
                      {cell.val}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* TOTAL + THANK YOU SECTION */}
      <div className="mt-4 grid grid-cols-2 gap-8 text-sm">
        <div className="flex flex-col justify-end">
          <h3 className="font-semibold mb-3 text-red-600 text-lg">Thank You For Your Business</h3>
          <div className="space-y-3 text-gray-700 text-[13px]">
            <div className="flex items-center gap-3">
              <div className="bg-red-600 text-white p-2 rounded-md shadow-md">
                <FaPhoneAlt size={12} />
              </div>
              <span>0882-3363-4050</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-red-600 text-white p-2 rounded-md shadow-md">
                <FaEnvelope size={12} />
              </div>
              <span>kevien.david22@gmail.com</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-red-600 text-white p-2 rounded-md shadow-md">
                <FaMapMarkerAlt size={12} />
              </div>
              <span>Jawa Tengah, Indonesia</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end">
          <div className="w-72">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>Rp {subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax ({data.tax}%):</span>
              <span>Rp {taxAmount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Discount ({data.discount}%):</span>
              <span>Rp {discountAmount.toLocaleString()}</span>
            </div>
            <hr className="my-3 border-gray-300" />
            <div className="flex justify-between font-semibold text-base bg-red-600 text-white p-2 rounded-md">
              <span>Total:</span>
              <span>Rp {total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* SIGNATURE + TERMS */}
      <div className="mt-10 grid grid-cols-2 gap-8 text-sm">
        <div>
          <h4 className="font-semibold mb-1 text-red-600">Terms & Conditions</h4>
          <p className="leading-relaxed text-gray-700">All projects are non-refundable once approved and submitted. Minor revisions are made after payment.</p>
          {/* AUTO-GENERATED INFO */}
          <p className="mt-2 text-[11px] text-gray-400 italic">*This invoice was automatically generated by the system.</p>
        </div>

        <div className="text-right flex flex-col justify-between">
          <div className="my-2 flex justify-end">
            <div className="flex flex-col items-end">
              <img src={ttdBase64} alt="Signature" className="h-20 w-auto object-contain" />
              <div className="mt-1 w-50 border-t-2 border-gray-400" />
            </div>
          </div>
          <p className="font-semibold">Kevin David Richard</p>
          <p>Freelancer</p>
        </div>
      </div>

      {/* COPYRIGHT */}
      <p className="text-[10px] text-gray-400 mt-6 text-center">© {new Date().getFullYear()} Davintech Creative Studio. All rights reserved.</p>

      <div
        className="w-full h-2 mt-4 rounded-b-xl"
        style={{
          background: 'linear-gradient(to right, #ef4444, #f87171, #ef4444)',
        }}
      />
    </>
  );
};

export default InvoiceDetails;
