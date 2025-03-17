import { Col, Row } from 'antd';
import { Role } from 'graphql/types';
import React, { useEffect, useState } from 'react';
import { useStoreState } from 'state';

import CheckTag from '../check-tag/CheckTag.view';
import CheckTagsLoading from './CheckTagsLoading.view';

export type Mode = 'check' | 'radio';

interface Option {
  hasChildren?: boolean;
  label: string;
  needAdminRight?: boolean;
  parentId?: null | string;
  parents?: string[];
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
  // Global State
  // TODO change to new role methods
  const role = useStoreState((state) => state.user.role);
  // Local State
  const [pristine, setPristine] = useState<boolean>(true);
  const [mode, setMode] = useState<Mode>('check');
  const [adminRights, setAdminRights] = useState<boolean>(false);
  const [hasChildOptions, setHasChildOptions] = useState<boolean>(false);
  // Value for check mode
  const [checkValues, setCheckValues] = useState<string[]>([]);
  // Values for radio mode
  const [primaryValue, setPrimaryValue] = useState<Option | null>(null);
  const [secondaryValue, setSecondaryValue] = useState<Option | null>(null);
  const [tertiaryValue, setTertiaryValue] = useState<Option | null>(null);

  useEffect(() => {
    setAdminRights(role === Role.SchemeAdmin);
  }, [role]);

  // Determine if options have children

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

  // Trigger onChange prop when check values update to update parent form state
  // useEffect(() => {
  //   if (onChangeProp) onChangeProp(checkValues);
  // }, [checkValues]);

  // Handles updating of check state
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
          .map((option) =>
            !option.needAdminRight || adminRights ? (
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
                    active={primaryValue?.value === option.value}
                    onClick={setPrimary}
                    option={option}
                  />
                )}
              </Col>
            ) : (
              <Col key={option.value} />
            )
          )}
      </Row>
      {primaryValue?.hasChildren && (
        <Row gutter={[10, 10]} style={{ marginTop: 20 }}>
          {options
            .filter((option) => option.parentId === primaryValue?.value)
            .map((option) =>
              !option.needAdminRight || adminRights ? (
                <Col key={option.value}>
                  <CheckTag
                    active={secondaryValue?.value === option.value}
                    onClick={setSecondary}
                    option={option}
                  />
                </Col>
              ) : (
                <Col key={option.value} />
              )
            )}
        </Row>
      )}
      {secondaryValue?.hasChildren && (
        <Row gutter={[10, 10]} style={{ marginTop: 20 }}>
          {options
            .filter((option) => option.parentId === secondaryValue?.value)
            .map((option) =>
              !option.needAdminRight || adminRights ? (
                <Col key={option.value}>
                  <CheckTag
                    active={tertiaryValue?.value === option.value}
                    onClick={setTertiary}
                    option={option}
                  />
                </Col>
              ) : (
                <Col key={option.value} />
              )
            )}
        </Row>
      )}
    </div>
  );
};

export default CheckTags;
