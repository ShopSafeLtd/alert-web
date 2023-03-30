import React from 'react';

const SigSeal = ({
  name,
  font,
  height,
  width,
}: {
  name: string;
  font: string;
  height: number;
  width: number;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    style={{ background: '#ffffff00' }}
    height={height}
    width={width}
    viewBox="0 0 300 100"
    className="signature-svg"
  >
    {name !== '' && (
      <text x="20" y="60" fontFamily={font} fontSize="30" fill="black">
        {name}
      </text>
    )}
  </svg>
);
export default SigSeal;
