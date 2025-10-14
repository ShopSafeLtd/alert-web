import { Button } from 'antd';
import React, { useRef } from 'react';
import { FormattedMessage } from 'react-intl';
import Signature from 'react-signature-canvas';

type ReactSignatureCanvas = Signature;

interface SignatureInputProperties {
  hidden: boolean;
  onChange: ((value: string) => void) | undefined;
}

const SignatureInput = ({
  hidden,
  onChange,
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
          canvasProps={{
            className: 'sigCanvas',
            height: 120,
            style: {
              border: '1px #adadad solid',
              borderRadius: 10,
            },
            width: 400,
          }}
          onEnd={handleChange}
          ref={signatureReference}
        />
      </div>
      <Button hidden={hidden} onClick={onClear} size="small">
        <FormattedMessage defaultMessage="Clear" />
      </Button>
    </>
  );
};
export default SignatureInput;
