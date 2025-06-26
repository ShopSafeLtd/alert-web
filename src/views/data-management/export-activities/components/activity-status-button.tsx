import type { IntlShape } from 'react-intl';

import { useStoreState } from '#/state';
import { Tag } from 'antd';
import { TodoStatusInput } from 'graphql/types';
import React from 'react';

const { CheckableTag } = Tag;

export const ActivityStatusButton = ({
  intl,
  selected,
  setSelected,
}: {
  intl: IntlShape;
  selected: TodoStatusInput;
  setSelected: (value: TodoStatusInput) => void;
}) => {
  const currentTheme = useStoreState((state) => state.theme.currentTheme);
  const isDark = currentTheme === 'dark';
  const onChange = (value: TodoStatusInput) => {
    setSelected(value);
  };
  const defaultStyle: React.CSSProperties = {
    borderRadius: '100px',
    margin: 0,
    paddingBottom: '3px',
    paddingTop: '3px',
  };
  const borderColour = isDark ? '#4d5b75' : 'rgb(237, 242, 249)';

  // create 3 style consts, left middle right, left should have border radius on the left, right on the right, middle none, Should have a border on their side and top/bottom for all
  const leftStyle: React.CSSProperties = {
    ...defaultStyle,
    borderBottomRightRadius: 0,
    borderRight: `1px solid ${borderColour}`,
    borderTopRightRadius: 0,
  };

  const middleStyle: React.CSSProperties = {
    ...defaultStyle,
    borderRadius: 0,
    borderRight: `1px solid ${borderColour}`,
  };

  const rightStyle: React.CSSProperties = {
    ...defaultStyle,
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
  };

  // should be 4 buttons in a row, that when active have a colour and when inactive are grey
  return (
    <div
      style={{
        border: `1px solid ${borderColour}`,
        borderRadius: '100px',
        width: 'fit-content',
      }}
    >
      <CheckableTag
        checked={selected === TodoStatusInput.Uncompleted}
        onChange={() => onChange(TodoStatusInput.Uncompleted)}
        style={
          selected === TodoStatusInput.Uncompleted
            ? {
                ...leftStyle,
                backgroundColor: isDark ? '#a13f3d' : '#fff1f0',
                color: isDark ? '#f3bdc3' : '#f5222d',
              }
            : leftStyle
        }
      >
        {intl.formatMessage({ defaultMessage: 'Uncompleted' })}
      </CheckableTag>
      <CheckableTag
        checked={selected === TodoStatusInput.Completed}
        onChange={() => onChange(TodoStatusInput.Completed)}
        style={
          selected === TodoStatusInput.Completed
            ? {
                ...middleStyle,
                backgroundColor: isDark ? '#a13f3d' : '#fff1f0',
                color: isDark ? '#f3bdc3' : '#f5222d',
              }
            : middleStyle
        }
      >
        {intl.formatMessage({ defaultMessage: 'Completed' })}
      </CheckableTag>

      <CheckableTag
        checked={selected === TodoStatusInput.All}
        onChange={() => onChange(TodoStatusInput.All)}
        style={
          selected === TodoStatusInput.All
            ? {
                ...rightStyle,
                backgroundColor: isDark ? '#a13f3d' : '#fff1f0',
                color: isDark ? '#f3bdc3' : '#f5222d',
              }
            : rightStyle
        }
      >
        {intl.formatMessage({ defaultMessage: 'All' })}
      </CheckableTag>
    </div>
  );
};
