import type { BrandQuery } from '#/views/settings/brands/graphql/queries/__generated__/brand.generated';
import type { FormInstance } from 'antd';

import { useUpsertBrandMutation } from '#/views/settings/brands/graphql/mutations/__generated__/upsert-brand.generated';
import { useBrandQuery } from '#/views/settings/brands/graphql/queries/__generated__/brand.generated';
import { notification } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import errorNotification from 'types/mutation_notifications/error_notification';

export interface FormData {
  businesses: string[];
  description: string;
  name: string;
}
interface Props {
  brandId: string;
  onClose: () => void;
}
interface Return {
  data: Exclude<BrandQuery['brand'], null | undefined> | null | undefined;
  form: FormInstance<FormData>;
  loading: boolean;
  onSubmit: (value: FormData) => void;
  saving: boolean;
}

const useEditBrand = ({ brandId, onClose }: Props): Return => {
  const [form] = useForm<FormData>();

  const [saving, setSaving] = useState(false);
  const intl = useIntl();
  const { data: brandData, loading } = useBrandQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      where: {
        id: brandId,
      },
    },
  });

  const [updateBrand] = useUpsertBrandMutation({
    onCompleted: () => {
      setSaving(false);
      onClose();
      notification.success({
        description: intl.formatMessage({
          defaultMessage: 'The brand has been updated.',
        }),
        message: intl.formatMessage({
          defaultMessage: 'Successfully Updated!',
        }),
        placement: 'bottomRight',
      });
    },
    onError: () => {
      setSaving(false);
      errorNotification();
    },
  });

  const onSubmit = (data: FormData) => {
    setSaving(true);
    if (brandId) {
      const businessIds = new Set(data.businesses.map((id) => id));
      void updateBrand({
        variables: {
          data: {
            brandId,
            businesses: [...businessIds],
            description: data.description,
            name: data.name,
            schemeId: brandData?.brand.scheme.id || '',
          },
        },
      });
    }
  };
  return {
    data: brandData?.brand,
    form,
    loading,
    onSubmit,
    saving,
  };
};

export default useEditBrand;
