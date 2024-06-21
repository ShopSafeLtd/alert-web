import { Button } from 'antd';
import React, { useRef } from 'react';
import Signature from 'react-signature-canvas';
import { FormattedMessage } from 'react-intl';

type ReactSignatureCanvas = Signature;

interface SignatureInputProperties {
  onChange: ((value: string) => void) | undefined;
  hidden: boolean;
}

const SignatureInput = ({
  onChange,
  hidden,
}: SignatureInputProperties): JSX.Element => {
  const signatureReference = useRef<ReactSignatureCanvas | null>(null);

  const onClear = () => {
    signatureReference?.current?.clear();
    if (onChange) onChange('');
  };

  const handleChange = () => {
    if (onChange)
      onChange(
        `<img alt="signature" src="${
          signatureReference?.current?.toDataURL() as string
        }" height="100" width="300"/>`
      );
  };

  return (
    <>
      <div hidden={hidden}>
        <Signature
          ref={signatureReference}
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
        <FormattedMessage defaultMessage="Clear" />
      </Button>
    </>
  );
};
export default SignatureInput;
