import { Col, Row } from 'antd';
import { Role } from 'graphql/generated';
import React, { useEffect, useState } from 'react';
import { useStoreState } from 'state';
import CheckTag from '../check-tag/CheckTag.view';
import CheckTagsLoading from './CheckTagsLoading.view';

export type Mode = 'check' | 'radio';

interface Option {
  label: string;
  value: string;
  tooltip?: string;
  needAdminRight?: boolean;
  children?: Option[];
}

interface Props {
  value?: string[];
  onChange?: (value: string[]) => void;
  options: Option[];
  mode?: Mode;
  loading?: boolean;
}

const CheckTags = ({
  onChange: onChangeProp = () => {},
  options = [],
  value: valueProp = [],
  mode: modeProp,
  loading = false,
}: Props) => {
  // Global State
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
      .map(({ children }) => children && children.length > 0)
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
    if (checkValues.includes(data.value)) {
      const newValue = checkValues.filter((i) => i !== data.value);
      setCheckValues(newValue);
      if (onChangeProp) onChangeProp(newValue);
    } else {
      const newValues = [...checkValues, data.value];
      setCheckValues(newValues);
      if (onChangeProp) onChangeProp(newValues);
    }
  };

  //
  const setPrimary = (data: Option) => {
    const selfClick = data.value === primaryValue?.value;
    setPrimaryValue(selfClick ? null : data);
    setSecondaryValue(null);
    setTertiaryValue(null);

    if (
      (!hasChildOptions || (data.children && data.children.length === 0)) &&
      onChangeProp
    )
      onChangeProp(selfClick ? [] : [data.value]);
  };

  const setSecondary = (data: Option) => {
    const selfClick = data.value === secondaryValue?.value;
    setSecondaryValue(selfClick ? null : data);
    setTertiaryValue(null);
    if (
      data.children &&
      data.children.length === 0 &&
      onChangeProp &&
      primaryValue
    )
      onChangeProp(
        selfClick ? [primaryValue.value] : [primaryValue.value, data.value]
      );
  };

  const setTertiary = (data: Option) => {
    const selfClick = data.value === tertiaryValue?.value;
    setTertiaryValue(selfClick ? null : data);
    if (onChangeProp && primaryValue && secondaryValue)
      onChangeProp(
        selfClick
          ? [primaryValue.value, secondaryValue.value]
          : [primaryValue.value, secondaryValue.value, data.value]
      );
  };

  return loading ? (
    <CheckTagsLoading />
  ) : (
    <>
      <Row gutter={[10, 10]}>
        {options.map((option) =>
          !option.needAdminRight || adminRights ? (
            <Col key={option.value}>
              {mode === 'check' && (
                <CheckTag
                  option={option}
                  active={checkValues.includes(option.value)}
                  onClick={toggleCheckOption}
                />
              )}
              {mode === 'radio' && (
                <CheckTag
                  option={option}
                  active={primaryValue?.value === option.value}
                  onClick={setPrimary}
                />
              )}
            </Col>
          ) : (
            <Col key={option.value} />
          )
        )}
      </Row>
      {primaryValue?.children && primaryValue.children.length > 0 && (
        <Row gutter={[10, 10]} style={{ marginTop: 20 }}>
          {primaryValue.children.map((option) =>
            !option.needAdminRight || adminRights ? (
              <Col key={option.value}>
                <CheckTag
                  option={option}
                  active={secondaryValue?.value === option.value}
                  onClick={setSecondary}
                />
              </Col>
            ) : (
              <Col key={option.value} />
            )
          )}
        </Row>
      )}
      {secondaryValue?.children && secondaryValue.children.length > 0 && (
        <Row gutter={[10, 10]} style={{ marginTop: 20 }}>
          {secondaryValue.children.map((option) =>
            !option.needAdminRight || adminRights ? (
              <Col key={option.value}>
                <CheckTag
                  option={option}
                  active={tertiaryValue?.value === option.value}
                  onClick={setTertiary}
                />
              </Col>
            ) : (
              <Col key={option.value} />
            )
          )}
        </Row>
      )}
    </>
  );
};

export default CheckTags;
