import type { ValueType } from '#/components/form-components/BusinessesSelect/BusinessesSelect.view';
import type { UpsertShoeMutation } from '#/views/singleShoe/graphql/mutations/__generated__/upsert-shoe.generated';
import type { MutationUpdaterFn } from '@apollo/client';
import type { FormInstance } from 'antd';
import type { ShoeSide, ShoeType } from 'graphql/types';

import { businessSelectValueFormatter } from '#/components/form-components/BusinessesSelect/BusinessesSelect.view';
import errorNotification from '#/types/mutation_notifications/error_notification';
import { useUpsertShoeMutation } from '#/views/singleShoe/graphql/mutations/__generated__/upsert-shoe.generated';
import { useShoeQuery } from '#/views/singleShoe/graphql/queries/__generated__/shoe.generated';
import { Form, notification } from 'antd';
import { ShoeStatus } from 'graphql/types';
import { useState } from 'react';
import { useIntl } from 'react-intl';

import type { StockItemValue } from '../../StockItemSearch/StockItemSearch.view';

const { useForm } = Form;

export interface FormData {
  box: boolean;
  business: ValueType;
  businessAddress: string;
  colour: string;
  description: string;
  retailPrice: number;
  side: ShoeSide;
  size: number;
  status: ShoeStatus;
  stockItem: {
    label: string;
    value: string;
  };
  style: string;
  type: ShoeType;
}

interface Props {
  onClose: () => void;
  shoeId?: string;
  update: MutationUpdaterFn<UpsertShoeMutation>;
}

interface Return {
  currentStep: number;
  form: FormInstance<FormData>;
  info: string;
  loading: boolean;
  onSearchStockItem: (data: StockItemValue) => void;
  onSubmit: (value: FormData) => void;
  saving: boolean;
}

const useAddShoe = ({ onClose, shoeId, update }: Props): Return => {
  const intl = useIntl();

  const [form] = useForm<FormData>();
  const [saving, setSaving] = useState(false);
  const [info, setInfo] = useState('');

  const [currentStep, setCurrentStep] = useState(0);

  const { loading } = useShoeQuery({
    fetchPolicy: 'cache-and-network',
    onCompleted: ({ shoe }) => {
      form.setFieldsValue({
        box: shoe.box,
        business: {
          label: shoe.business.name,
          value: shoe.business.id,
        },
        businessAddress: shoe.business.locations[0].full,
        colour: shoe.colour,
        description: shoe.description,
        retailPrice: shoe.retailPrice,
        side: shoe.side,
        size: shoe.size,
        status: shoe.status,
        stockItem: {
          label: shoe.stockItem.sku || '',
          value: shoe.stockItem.id,
        },
        style: shoe.style,
        type: shoe.type,
      });
    },
    skip: !shoeId,
    variables: {
      where: {
        id: shoeId,
      },
    },
  });

  const onSearchStockItem = (value: StockItemValue) => {
    form.setFieldsValue({
      description:
        value.name || value.brand
          ? `${value.name ?? ''}, ${value.brand ?? ''} `
          : '',
      retailPrice: value.salesPriceLocal ?? undefined,
      stockItem: { label: value.sku || '', value: value.id },
    });
  };
  const [createShoe] = useUpsertShoeMutation({
    onCompleted: (result) => {
      setInfo(result.upsertShoe.matchedInfo ?? '');
      setCurrentStep(currentStep + 1);
      if (shoeId) {
        notification.success({
          description: result.upsertShoe.matchedInfo,
          message: intl.formatMessage({
            defaultMessage: 'Successfully Updated!',
          }),
          placement: 'bottomRight',
        });
      } else {
        notification.success({
          description: intl.formatMessage({
            defaultMessage: 'The shoe has been added.',
          }),
          message: intl.formatMessage({
            defaultMessage: 'Successfully Added!',
          }),
          placement: 'bottomRight',
        });
      }
    },
    onError: () => {
      errorNotification();
      onClose();
    },
    update,
  });

  const onSubmit = (data: FormData) => {
    setSaving(true);
    const businessId = businessSelectValueFormatter(data.business, '');

    void createShoe({
      variables: {
        data: {
          box: data.box,
          businessId,
          colour: data.colour,
          description: data.description,
          retailPrice: data.retailPrice,
          shoeId,
          side: data.side,
          size: data.size,
          status: ShoeStatus.AwaitingMatch,
          stockItemId: data.stockItem.value,
          style: data.style,
          type: data.type,
        },
      },
    }).finally(() => {
      setSaving(false);
    });
  };

  return {
    currentStep,
    form,
    info,
    loading,
    onSearchStockItem,
    onSubmit,
    saving,
  };
};
export default useAddShoe;
