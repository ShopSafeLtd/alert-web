import React from 'react';

import type { CustomTagProps } from 'rc-select/lib/BaseSelect';
import { Tag } from 'antd';
import type { IntlShape } from 'react-intl';
import { useStoreActions, useStoreState } from '#/state';
import { IncidentPriority } from 'graphql/types';

const { CheckableTag } = Tag;

const getColour = (priority: IncidentPriority) => {
  switch (priority) {
    case IncidentPriority.Low: {
      return 'green';
    }
    case IncidentPriority.Normal: {
      return 'blue';
    }
    case IncidentPriority.Medium: {
      return 'orange';
    }
    case IncidentPriority.High: {
      return 'red';
    }
    default: {
      return 'default';
    }
  }
};
export const sortPrios = (a: IncidentPriority, b: IncidentPriority) => {
  if (a === IncidentPriority.Low) return -1;
  if (a === IncidentPriority.Normal && b === IncidentPriority.Low) return 1;
  if (a === IncidentPriority.Normal && b === IncidentPriority.Medium) return -1;
  if (a === IncidentPriority.Normal && b === IncidentPriority.High) return -1;
  if (a === IncidentPriority.Medium && b === IncidentPriority.High) return -1;
  if (a === IncidentPriority.High) return 1;
  return 0;
};
const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
  event.preventDefault();
  event.stopPropagation();
};
export const tagRender = (props: CustomTagProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { label, closable, value, onClose } = props;

  return (
    <Tag
      color={getColour(value as IncidentPriority)}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{ marginRight: 3 }}
    >
      {label}
    </Tag>
  );
};

export const PrioButtonFilter = ({
  intl,
  selected,
}: {
  intl: IntlShape;
  selected: IncidentPriority[];
}) => {
  const setIncidentPriority = useStoreActions(
    (actions) => actions.data.setIncidentPriority
  );
  const currentTheme = useStoreState((state) => state.theme.currentTheme);
  const isDark = currentTheme === 'dark';
  const onChange = (value: IncidentPriority) => {
    if (selected.includes(value)) {
      setIncidentPriority(selected.filter((p) => p !== value));
    } else {
      setIncidentPriority([...selected, value].sort(sortPrios));
    }
  };
  const defaultStyle: React.CSSProperties = {
    margin: 0,
    borderRadius: '100px',
    paddingTop: '3px',
    paddingBottom: '3px',
  };
  const borderColour = isDark ? '#4d5b75' : 'rgb(237, 242, 249)';

  // create 3 style consts, left middle right, left should have border radius on the left, right on the right, middle none, Should have a border on their side and top/bottom for all
  const leftStyle: React.CSSProperties = {
    ...defaultStyle,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderRight: `1px solid ${borderColour}`,
  };

  const middleStyle: React.CSSProperties = {
    ...defaultStyle,
    borderRadius: 0,
    borderRight: `1px solid ${borderColour}`,
  };

  const rightStyle: React.CSSProperties = {
    ...defaultStyle,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  };

  // should be 4 buttons in a row, that when active have a colour and when inactive are grey
  return (
    <div
      style={{
        borderRadius: '100px',
        width: 'fit-content',
        border: `1px solid ${borderColour}`,
      }}
    >
      <CheckableTag
        checked={selected.includes(IncidentPriority.Low)}
        onChange={() => onChange(IncidentPriority.Low)}
        style={
          selected.includes(IncidentPriority.Low)
            ? {
                ...leftStyle,
                backgroundColor: isDark ? '#345240' : '#f6ffed',
                color: '#52c41a',
              }
            : leftStyle
        }
      >
        {intl.formatMessage({ defaultMessage: 'Low' })}
      </CheckableTag>

      <CheckableTag
        checked={selected.includes(IncidentPriority.Normal)}
        onChange={() => onChange(IncidentPriority.Normal)}
        style={
          selected.includes(IncidentPriority.Normal)
            ? {
                ...middleStyle,
                backgroundColor: isDark ? '#4c8cb0' : '#e6f7ff',
                color: isDark ? '#074885' : '#1890ff',
              }
            : middleStyle
        }
      >
        {intl.formatMessage({ defaultMessage: 'Normal' })}
      </CheckableTag>

      <CheckableTag
        checked={selected.includes(IncidentPriority.Medium)}
        onChange={() => onChange(IncidentPriority.Medium)}
        style={
          selected.includes(IncidentPriority.Medium)
            ? {
                ...middleStyle,
                backgroundColor: isDark ? '#bbab87' : '#fff7e6',
                color: isDark ? '#855903' : '#faad14',
              }
            : middleStyle
        }
      >
        {intl.formatMessage({ defaultMessage: 'Medium' })}
      </CheckableTag>

      <CheckableTag
        checked={selected.includes(IncidentPriority.High)}
        onChange={() => onChange(IncidentPriority.High)}
        style={
          selected.includes(IncidentPriority.High)
            ? {
                ...rightStyle,
                backgroundColor: isDark ? '#a13f3d' : '#fff1f0',
                color: isDark ? '#f3bdc3' : '#f5222d',
              }
            : rightStyle
        }
      >
        {intl.formatMessage({ defaultMessage: 'High' })}
      </CheckableTag>
    </div>
  );
};
