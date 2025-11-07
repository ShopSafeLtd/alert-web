import type { SizeType } from 'antd/lib/config-provider/SizeContext';
import type { SelectProps } from 'antd/lib/select';

import { useListOffendersSelectQuery } from '#/graphql/offenders/queries/__generated__/list-offenders-select.generated';
import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { Select } from 'antd';
import { useAtomValue } from 'jotai/index';
import React from 'react';
import { useIntl } from 'react-intl';

interface Props {
  allowClear?: boolean;
  className?: string;
  maxTagCount?: 'responsive' | number;
  mode?: 'multiple' | 'tags';
  onChange?: (value: string[]) => void;
  placeholder?: string;
  size?: SizeType;
  style?: React.CSSProperties;
  value?: string[];
}

const OffenderSelect: React.FC<Omit<SelectProps, keyof Props> & Props> = ({
  allowClear = true,
  className,
  maxTagCount,
  mode,
  onChange,
  placeholder,
  size,
  style,
  value,
  ...props
}) => {
  const intl = useIntl();
  const currentSchemeId = useAtomValue(currentSchemeIdAtom);

  const unknownLabel = intl.formatMessage({ defaultMessage: 'Unknown' });

  const formatOffenderLabel = (
    name: null | string,
    reference: null | string
  ): string => {
    const displayName = name || unknownLabel;
    return reference ? `${displayName} (${reference})` : displayName;
  };

  const { data, loading } = useListOffendersSelectQuery({
    variables: {
      scheme: {
        id: currentSchemeId,
      },
      take: 1000,
      where: {
        active: {
          equals: true,
        },
      },
    },
  });

  const sortedData = [...(data?.listOffenders?.offenders || [])].sort(
    (a, b) => {
      if (!value) return (a.name || '').localeCompare(b.name || '');
      if (value?.includes(a.id) && !value?.includes(b.id)) {
        return -1;
      }
      if (value?.includes(b.id) && !value?.includes(a.id)) {
        return 1;
      }
      return (a.name || '').localeCompare(b.name || '');
    }
  );

  return (
    <Select
      allowClear={allowClear}
      className={className}
      filterOption={(input, option) =>
        (option?.label as string)?.toLowerCase().includes(input.toLowerCase())
      }
      loading={loading}
      maxTagCount={maxTagCount}
      mode={mode}
      notFoundContent={
        loading ? intl.formatMessage({ defaultMessage: 'loading' }) : null
      }
      onChange={(selected: string[]) => {
        if (onChange) onChange(selected);
      }}
      onClear={() => {
        if (onChange) onChange([]);
      }}
      optionFilterProp="label"
      placeholder={placeholder}
      showSearch
      size={size}
      style={style}
      value={value || undefined}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      {sortedData.map((offender) => {
        const offenderLabel = formatOffenderLabel(
          offender.name ?? null,
          offender.reference?.toString() ?? null
        );
        return (
          <Select.Option
            key={offender.id}
            label={offenderLabel}
            value={offender.id}
          >
            {offenderLabel}
          </Select.Option>
        );
      })}
    </Select>
  );
};

export default OffenderSelect;
