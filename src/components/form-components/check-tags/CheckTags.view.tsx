import type { PermissionMethod, PermissionModel } from 'graphql/types';

import hasRolePermission from '#/utils/has-role-permission';
import { Col, Divider, Row, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import CheckTag from '../check-tag/CheckTag.view';
import CheckTagsLoading from './CheckTagsLoading.view';

export type Mode = 'check' | 'radio';

interface Option {
  hasChildren?: boolean;
  label: string;
  parentId?: null | string;
  parents?: string[];
  permissions?: { method: PermissionMethod; model: PermissionModel }[];
  tier?: number;
  tooltip?: null | string;
  value: string;
}

interface Props {
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  mode?: Mode;
  noGutter?: boolean;
  onChange?: (value: string[]) => void;
  options: Option[];
  single?: boolean;
  value?: string[];
}

const CheckTags = ({
  className,
  disabled = false,
  loading = false,
  mode: modeProp,
  noGutter,
  onChange: onChangeProp = () => {},
  options = [],
  value: valueProp = [],
}: Props) => {
  // Local State
  const [pristine, setPristine] = useState<boolean>(true);
  const [mode, setMode] = useState<Mode>('check');
  const [hasChildOptions, setHasChildOptions] = useState<boolean>(false);
  // Value for check mode
  const [checkValues, setCheckValues] = useState<string[]>([]);
  // Values for radio mode
  const [primaryValue, setPrimaryValue] = useState<Option | null>(null);
  const [secondaryValue, setSecondaryValue] = useState<Option | null>(null);
  const [tertiaryValue, setTertiaryValue] = useState<Option | null>(null);

  useEffect(() => {
    const hasChildren = options
      .map((option) => option.hasChildren)
      .includes(true);
    setHasChildOptions(hasChildren);
  }, [options]);

  useEffect(() => {
    // If children are present treat as radio, else use mode prop, default to check
    if (hasChildOptions || modeProp === 'radio') {
      setMode('radio');

      if (valueProp && pristine) {
        // If values are present in array set state
        if (valueProp && valueProp[0]) {
          const option = options.find(({ value }) => value === valueProp[0]);
          setPrimaryValue(option || null);
        }
        if (valueProp && valueProp[1]) {
          const option = options.find(({ value }) => value === valueProp[1]);
          setSecondaryValue(option || null);
        }
        if (valueProp && valueProp[2]) {
          const option = options.find(({ value }) => value === valueProp[2]);
          setTertiaryValue(option || null);
        }
        setPristine(false);
      }
    } else {
      setMode('check');
      if (valueProp && pristine) {
        setPristine(false);
        setCheckValues(valueProp);
      }
    }
  }, [modeProp, hasChildOptions, valueProp, options]);

  const toggleCheckOption = (data: Option) => {
    if (!disabled) {
      if (checkValues.includes(data.value)) {
        const newValue = checkValues.filter((i) => i !== data.value);
        setCheckValues(newValue);
        if (onChangeProp) onChangeProp(newValue);
      } else {
        const newValues = [...checkValues, data.value];
        setCheckValues(newValues);
        if (onChangeProp) onChangeProp(newValues);
      }
    }
  };

  useEffect(() => {
    if (!valueProp || valueProp.length === 0) return;

    if (modeProp === 'check') {
      setCheckValues(valueProp);
    }

    const lineages: Option[][] = [];

    for (const id of valueProp) {
      const selected = options.find((opt): opt is Option => opt.value === id);
      if (!selected) continue;

      const lineage: Option[] = [];
      let current: Option | undefined = selected;

      while (current) {
        lineage.unshift(current);
        if (!current.parentId) break;
        current = options.find(
          (opt): opt is Option => opt.value === current?.parentId
        );
      }

      lineages.push(lineage);
    }

    const flatLineage = lineages.flat();

    setPrimaryValue(flatLineage[0] ?? null);
    setSecondaryValue(flatLineage[1] ?? null);
    setTertiaryValue(flatLineage[2] ?? null);
  }, [valueProp, options, modeProp]);

  //
  const setPrimary = (data: Option) => {
    const selfClick = data.value === primaryValue?.value;
    setPrimaryValue(selfClick ? null : data);
    setSecondaryValue(null);
    setTertiaryValue(null);

    if ((!hasChildOptions || !data.hasChildren) && onChangeProp) {
      onChangeProp(selfClick ? [] : [data.value]);
    } else {
      onChangeProp([]);
    }
  };

  const setSecondary = (data: Option) => {
    const selfClick = data.value === secondaryValue?.value;
    setSecondaryValue(selfClick ? null : data);
    setTertiaryValue(null);
    if (!data.hasChildren && onChangeProp && primaryValue) {
      onChangeProp(selfClick ? [] : [data.value]);
    } else {
      onChangeProp([]);
    }
  };

  const setTertiary = (data: Option) => {
    const selfClick = data.value === tertiaryValue?.value;
    setTertiaryValue(selfClick ? null : data);
    if (onChangeProp && primaryValue && secondaryValue) {
      onChangeProp(selfClick ? [] : [data.value]);
    } else {
      onChangeProp([]);
    }
  };

  return loading ? (
    <CheckTagsLoading />
  ) : (
    <div className={className}>
      <Row gutter={noGutter ? [8, 8] : [10, 10]}>
        {options
          .filter((item) => item.tier === 0 || !hasChildOptions)
          .map((option) => {
            const radioActive = primaryValue?.value === option.value;
            if (
              option.permissions &&
              !hasRolePermission({ permission: option.permissions })
            )
              return <Col key={option.value} />;
            return (
              <Col key={option.value}>
                {mode === 'check' && (
                  <CheckTag
                    active={checkValues.includes(option.value)}
                    onClick={toggleCheckOption}
                    option={option}
                  />
                )}
                {mode === 'radio' && (
                  <CheckTag
                    active={radioActive}
                    onClick={setPrimary}
                    option={option}
                  />
                )}
              </Col>
            );
          })}
      </Row>
      {primaryValue?.hasChildren && (
        <>
          <Divider style={{ marginBottom: 25, marginTop: 30 }} />
          <Typography.Paragraph style={{ fontWeight: 500 }}>
            <FormattedMessage defaultMessage="Please select an additional type" />
          </Typography.Paragraph>
          <Row gutter={[10, 10]} style={{ marginTop: 14 }}>
            {options
              .filter((option) => option.parentId === primaryValue?.value)
              .map((option) => {
                if (
                  option.permissions &&
                  !hasRolePermission({ permission: option.permissions })
                )
                  return <Col key={option.value} />;

                return (
                  <Col key={option.value}>
                    <CheckTag
                      active={secondaryValue?.value === option.value}
                      onClick={setSecondary}
                      option={option}
                    />
                  </Col>
                );
              })}
          </Row>
        </>
      )}
      {secondaryValue?.hasChildren && (
        <>
          <Divider style={{ marginBottom: 25, marginTop: 30 }} />
          <Typography.Paragraph
            style={{
              fontWeight: 500,
              marginBottom: 0,
            }}
          >
            <FormattedMessage defaultMessage="Please select an additional type" />
          </Typography.Paragraph>
          <Row gutter={[10, 10]} style={{ marginTop: 14 }}>
            {options
              .filter((option) => option.parentId === secondaryValue?.value)
              .map((option) => {
                if (
                  option.permissions &&
                  !hasRolePermission({ permission: option.permissions })
                )
                  return <Col key={option.value} />;
                return (
                  <Col key={option.value}>
                    <CheckTag
                      active={tertiaryValue?.value === option.value}
                      onClick={setTertiary}
                      option={option}
                    />
                  </Col>
                );
              })}
          </Row>
        </>
      )}
    </div>
  );
};

export default CheckTags;
