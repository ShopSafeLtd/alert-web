import { notification } from 'antd';
import { useGenerateOffenderBulletinMutation } from 'graphql/offenders/mutations/__generated__/generate-offender-bulletin.generated';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';

interface Props {
  offenderId: string;
  offenderName: string;
  onClose: () => void;
}

const useGenerateBulletinModal = ({
  offenderId,
  offenderName,
  onClose,
}: Props) => {
  const intl = useIntl();
  const navigate = useNavigate();

  const [context, setContext] = useState('');
  const [generating, setGenerating] = useState(false);

  const [generateBulletin] = useGenerateOffenderBulletinMutation();

  const handleGenerate = async () => {
    setGenerating(true);
    try {
      const result = await generateBulletin({
        variables: {
          context: context || undefined,
          offenderId,
        },
      });

      if (result.data?.generateOffenderBulletin) {
        handleClose();
        navigate('/app/article/add', {
          state: {
            bulletinTitle: result.data.generateOffenderBulletin.title,
            htmlBody: result.data.generateOffenderBulletin.htmlBody,
            offenderId,
            offenderName,
          },
        });
      }
    } catch {
      notification.error({
        description: intl.formatMessage({
          defaultMessage: 'Failed to generate bulletin. Please try again.',
        }),
        message: intl.formatMessage({ defaultMessage: 'Generation Failed' }),
        placement: 'bottomRight',
      });
    } finally {
      setGenerating(false);
    }
  };

  const handleClose = () => {
    setContext('');
    setGenerating(false);
    onClose();
  };

  return {
    context,
    generating,
    handleClose,
    handleGenerate,
    setContext,
  };
};

export default useGenerateBulletinModal;
