import { faWandMagicSparkles } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Form, Input, Modal } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';

import useGenerateBulletinModal from './useGenerateBulletinModal';

interface Props {
  offenderId: string;
  offenderName: string;
  onClose: () => void;
  open: boolean;
}

const GenerateBulletinModal = ({
  offenderId,
  offenderName,
  onClose,
  open,
}: Props): JSX.Element => {
  const intl = useIntl();

  const { context, generating, handleClose, handleGenerate, setContext } =
    useGenerateBulletinModal({ offenderId, offenderName, onClose });

  return (
    <Modal
      footer={
        <Button
          icon={
            <FontAwesomeIcon
              icon={faWandMagicSparkles}
              style={{ marginRight: 6 }}
            />
          }
          loading={generating}
          onClick={() => {
            handleGenerate().catch(() => undefined);
          }}
          type="primary"
        >
          {intl.formatMessage({ defaultMessage: 'Generate Bulletin' })}
        </Button>
      }
      onCancel={handleClose}
      open={open}
      title={intl.formatMessage({
        defaultMessage: 'Generate Offender Bulletin',
      })}
      width={600}
    >
      <Form layout="vertical">
        <Form.Item
          extra={intl.formatMessage({
            defaultMessage:
              'Optionally provide additional context to guide the AI, such as known aliases, recent activity, or areas of operation.',
          })}
          label={intl.formatMessage({ defaultMessage: 'Additional context' })}
        >
          <Input.TextArea
            onChange={(e) => setContext(e.target.value)}
            placeholder={intl.formatMessage({
              defaultMessage:
                'e.g. known to target high-value clothing, frequently operates across multiple stores, may use distraction techniques...',
            })}
            rows={4}
            value={context}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default GenerateBulletinModal;
