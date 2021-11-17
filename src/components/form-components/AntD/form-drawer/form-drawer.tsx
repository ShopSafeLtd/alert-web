import React, { useState } from "react";
import { Drawer, Result, Button, notification } from "antd";

interface RenderFormArgs {
  handleClose(): void;
  onSuccess(): void;
  onError(): void;
}

interface Props {
  visible: boolean;
  onClose(): void;
  successText: string;
  errorText?: string;
  title: string;
  width?: number;
  renderForm(args: RenderFormArgs): JSX.Element;
  noAddAnother?: boolean;
  notificationResult?: boolean;
}

export const FormDrawer = ({
  visible,
  onClose,
  errorText,
  successText,
  title,
  width,
  renderForm,
  noAddAnother,
  notificationResult
}: Props) => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const onSuccess = () => {
    if (!notificationResult) {
      setSuccess(true)
    } else {
      notification['success']({
        message: successText,
        placement: 'bottomRight'
      });
      onClose();
    }
  };

  const onError = () => {
    if (!notificationResult) {
      setError(true)
    } else {
      notification['error']({
        message: 'An error has occurred!',
        description: 'This error has been reported to our team.',
        placement: 'bottomRight'
      })
      onClose();
    }
  };

  const handleClose = () => {
    setSuccess(false);
    setError(false);
    onClose();
  };

  const handleAddAnother = () => {
    setSuccess(false);
  };

  const extra = [
    <Button type="primary" key="console" onClick={handleClose}>
      Go Back
    </Button>
  ]

  !noAddAnother && extra.push(<Button type="default" key="console" onClick={handleAddAnother}>
    Add Another
  </Button>)

  return (
    <Drawer
      title={title}
      placement="right"
      closable={false}
      onClose={handleClose}
      visible={visible}
      width={width ? width : 500}
      bodyStyle={{ display: "flex" }}
    >
      {visible && success ? (
        <Result
          style={{ flex: 1 }}
          status="success"
          title={successText}
          extra={extra}
        />
      ) : error ? (
        <Result
          style={{ flex: 1 }}
          status="error"
          title="An error has occurred!"
          subTitle={
            errorText ? errorText : "This error has been reported to our team."
          }
          extra={[
            <Button type="primary" danger key="console" onClick={handleClose}>
              Go Back
            </Button>,
          ]}
        />
      ) : visible && (
        renderForm({
          onError,
          onSuccess,
          handleClose,
        })
      )}
    </Drawer>
  );
};
