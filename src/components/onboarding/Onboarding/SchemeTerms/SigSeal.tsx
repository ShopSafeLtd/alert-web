import React from 'react';

const SigSeal = ({
  font,
  height,
  name,
  width,
}: {
  font: string;
  height: number;
  name: string;
  width: number;
}) => (
  <svg
    className="signature-svg"
    height={height}
    style={{ background: '#ffffff00' }}
    viewBox="0 0 300 100"
    width={width}
    xmlns="http://www.w3.org/2000/svg"
  >
    {name !== '' && (
      <text fill="black" fontFamily={font} fontSize="30" x="20" y="60">
        {name}
      </text>
    )}
  </svg>
);
export default SigSeal;
