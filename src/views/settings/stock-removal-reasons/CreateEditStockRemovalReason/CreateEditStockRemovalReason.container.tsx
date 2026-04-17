import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { message } from 'antd';
import { useUpsertStockRemovalReasonOptionMutation } from 'graphql/stock-removal-reasons/mutations/__generated__/upsert-stock-removal-reason-option.generated';
import { useAtomValue } from 'jotai';
import React from 'react';
import { useIntl } from 'react-intl';

import type { ReasonFormData } from './CreateEditStockRemovalReason.view';

import View from './CreateEditStockRemovalReason.view';

interface Props {
  id?: string;
  initData?: ReasonFormData;
  onCancel: () => void;
  onSuccess: () => void;
}

const CreateEditStockRemovalReason = ({
  id,
  initData,
  onCancel,
  onSuccess,
}: Props) => {
  const intl = useIntl();
  const currentSchemeId = useAtomValue(currentSchemeIdAtom);

  const [upsertReason, { loading }] =
    useUpsertStockRemovalReasonOptionMutation();

  const handleSubmit = async (values: ReasonFormData) => {
    try {
      await upsertReason({
        refetchQueries: ['ListStockRemovalReasonOptions'],
        variables: {
          data: {
            active: values.active,
            id: id ?? undefined,
            label: values.label,
            position: values.position,
            schemeId: currentSchemeId,
          },
        },
      });
      void message.success(
        id
          ? intl.formatMessage({
              defaultMessage: 'Reason updated successfully',
            })
          : intl.formatMessage({
              defaultMessage: 'Reason created successfully',
            })
      );
      onSuccess();
    } catch (error) {
      void message.error(
        intl.formatMessage({
          defaultMessage: 'An error occurred. Please try again.',
        })
      );
      console.error('Error saving reason option:', error);
    }
  };

  return (
    <View
      initData={initData}
      loading={loading}
      onCancel={onCancel}
      onSubmit={(values) => {
        void handleSubmit(values);
      }}
    />
  );
};

export default CreateEditStockRemovalReason;
