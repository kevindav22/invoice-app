import { useEffect } from 'react';
import { motion } from 'framer-motion';

const MainLoading = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 2000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="fixed inset-0  flex flex-col items-center justify-center text-gray-200 z-50">
      <motion.h1 className="text-4xl md:text-5xl font-semibold tracking-widest mb-6">DavinTech</motion.h1>

      {/* Animasi dots */}
      <div className="flex space-x-2 mt-4">
        {[...Array(3)].map((_, i) => (
          <motion.div key={i} className="w-4 h-4 bg-red-500 rounded-full" animate={{ y: [0, -10, 0] }} transition={{ delay: i * 0.2, repeat: Infinity, duration: 0.6 }} />
        ))}
      </div>

      {/* Optional subtitle */}
      <p className="mt-6 text-gray-400 text-lg">Loading, please wait...</p>
    </div>
  );
};

export default MainLoading;
