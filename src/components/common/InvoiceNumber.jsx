// Konversi angka Romawi
const toRoman = (num) => {
  const romans = [
    ['M', 1000],
    ['CM', 900],
    ['D', 500],
    ['CD', 400],
    ['C', 100],
    ['XC', 90],
    ['L', 50],
    ['XL', 40],
    ['X', 10],
    ['IX', 9],
    ['V', 5],
    ['IV', 4],
    ['I', 1],
  ];

  let result = '';
  for (const [roman, value] of romans) {
    while (num >= value) {
      result += roman;
      num -= value;
    }
  }
  return result;
};

// Generate Nomor
const generateInvoiceNumber = () => {
  const now = new Date();
  const romanMonths = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];

  const dayRoman = toRoman(now.getDate());
  const monthRoman = romanMonths[now.getMonth()];
  const hh = String(now.getHours()).padStart(2, '0');
  const mm = String(now.getMinutes()).padStart(2, '0');
  const ss = String(now.getSeconds()).padStart(2, '0');

  // Format akhir
  return `INV-DVN-${dayRoman}${monthRoman}-${hh}${mm}${ss}`;
};

export default generateInvoiceNumber;
