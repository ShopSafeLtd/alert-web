import type { FormInstance } from 'antd';

import { Form } from 'antd';
import { useIntl } from 'react-intl';

import type { FormData } from '../types/formData';

export interface PoliceReportingRequirement {
  completed: boolean;
  fieldName: string;
  id: string;
  label: string;
}

export interface ValidationState {
  allRequirementsMet: boolean;
  completedCount: number;
  requirements: PoliceReportingRequirement[];
  totalCount: number;
}

export const usePoliceReportingValidation = (
  form: FormInstance<FormData>
): ValidationState => {
  const intl = useIntl();

  // Watch required fields
  const description = Form.useWatch('description', form);
  const date = Form.useWatch('date', form);
  const offenders = Form.useWatch('offenders', form);
  const goods = Form.useWatch('goods', form);
  const images = Form.useWatch('images', form);

  // Validation checks
  const hasDescription = Boolean(description && description.trim().length > 0);
  const hasDate = Boolean(date && date instanceof Date);
  const hasOffenders = Boolean(offenders && offenders.length > 0);
  const hasGoodsWithValue = Boolean(
    goods && goods.some((item) => item.value && item.value > 0)
  );
  const hasImages = Boolean(images && images.length > 0);

  // Build requirements array
  const requirements: PoliceReportingRequirement[] = [
    {
      completed: hasDescription,
      fieldName: 'description',
      id: 'description',
      label: intl.formatMessage({ defaultMessage: 'Incident description' }),
    },
    {
      completed: hasDate,
      fieldName: 'date',
      id: 'date',
      label: intl.formatMessage({ defaultMessage: 'Time and date' }),
    },
    {
      completed: hasOffenders,
      fieldName: 'offenders',
      id: 'offenders',
      label: intl.formatMessage({ defaultMessage: 'At least one offender' }),
    },
    {
      completed: hasGoodsWithValue,
      fieldName: 'goods',
      id: 'goods',
      label: intl.formatMessage({
        defaultMessage: 'At least one item with value',
      }),
    },
    {
      completed: hasImages,
      fieldName: 'images',
      id: 'images',
      label: intl.formatMessage({
        defaultMessage: 'At least one image on the incident',
      }),
    },
  ];

  return {
    allRequirementsMet: requirements.every((r) => r.completed),
    completedCount: requirements.filter((r) => r.completed).length,
    requirements,
    totalCount: requirements.length,
  };
};
