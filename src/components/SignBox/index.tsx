import React, { useRef } from 'react';
import Signature from 'react-signature-canvas';
import { Button } from 'antd';

type ReactSignatureCanvas = Signature;

interface SignatureInputProps {
  onChange: ((value: unknown) => void) | undefined;
  hidden: boolean;
}

const SignatureInput = ({
  onChange,
  hidden,
}: SignatureInputProps): JSX.Element => {
  const signatureRef = useRef<ReactSignatureCanvas | null>(null);

  const onClear = () => {
    signatureRef?.current?.clear();
    if (onChange) onChange('');
  };

  const handleChange = () => {
    if (onChange) onChange(signatureRef?.current?.toDataURL());
  };

  return (
    <>
      <div hidden={hidden}>
        <Signature
          ref={signatureRef}
          canvasProps={{
            width: 400,
            height: 120,
            className: 'sigCanvas',
            style: {
              border: '1px #adadad solid',
              borderRadius: 10,
            },
          }}
          onEnd={handleChange}
        />
      </div>
      <Button hidden={hidden} size="small" onClick={onClear}>
        Clear
      </Button>
    </>
  );
};
export default SignatureInput;
