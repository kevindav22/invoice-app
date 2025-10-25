const WatermarkOverlay = ({ text = 'Davintech' }) => {
  const rows = Array.from({ length: 20 });
  const cols = Array.from({ length: 10 });

  return (
    <div
      className="absolute inset-0 pointer-events-none select-none"
      style={{
        zIndex: 50,
        opacity: 0.04,
        mixBlendMode: 'multiply',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '200%',
          height: '200%',
          transform: 'rotate(-30deg) translate(-10%, -10%)',
          transformOrigin: 'center',
        }}
      >
        {rows.map((_, rowIdx) => (
          <div
            key={rowIdx}
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              whiteSpace: 'nowrap',
              marginBottom: '40px',
            }}
          >
            {cols.map((_, colIdx) => (
              <span
                key={colIdx}
                className="text-2xl font-semibold text-gray-500"
                style={{
                  userSelect: 'none',
                  margin: '0 20px',
                  letterSpacing: '0.15em',
                }}
              >
                {text.toUpperCase()}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WatermarkOverlay;
