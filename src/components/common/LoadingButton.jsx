import { FaCog } from 'react-icons/fa';

const LoadingButton = ({ loading = false, onClick, children, className = '', disabledClass = '', loadingText = 'Memproses...' }) => {
  return (
    <button type="submit" onClick={onClick} disabled={loading} className={`${className} ${loading ? disabledClass : ''}`}>
      {loading ? (
        <>
          <FaCog className="animate-spin" />
          <span>{loadingText}</span>
        </>
      ) : (
        <>{children}</>
      )}
    </button>
  );
};

export default LoadingButton;
