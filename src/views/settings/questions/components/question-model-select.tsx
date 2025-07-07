import type { IntlShape } from 'react-intl';

import { useStoreState } from '#/state';
import { Tag } from 'antd';
import React from 'react';

export const QuestionModeSelect = ({
  intl,
  selected,
  setActivityQuestionsFilter,
  setTagQuestionsFilter,
}: {
  intl: IntlShape;
  selected: string[];
  setActivityQuestionsFilter: (activityQuestions: boolean) => void;
  setTagQuestionsFilter: (tagQuestions: boolean) => void;
}) => {
  const onChange = (value: string) => {
    let newSelected: string[];
    if (selected.length === 0) {
      newSelected = ['tags', 'activities'];
    } else if (selected.includes(value)) {
      newSelected = selected.filter((v) => v !== value);
    } else {
      newSelected = [...selected, value];
    }

    if (newSelected.length === 0) {
      newSelected = ['tags', 'activities'];
    }

    setTagQuestionsFilter(newSelected.includes('tags'));
    setActivityQuestionsFilter(newSelected.includes('activities'));
  };

  const defaultStyle: React.CSSProperties = {
    borderRadius: '100px',
    margin: 0,
    paddingBottom: '3px',
    paddingTop: '3px',
    userSelect: 'none',
  };

  const currentTheme = useStoreState((state) => state.theme.currentTheme);
  const isDark = currentTheme === 'dark';
  const borderColour = isDark ? '#4d5b75' : 'rgb(237, 242, 249)';

  const leftStyle: React.CSSProperties = {
    ...defaultStyle,
    borderBottomRightRadius: 0,
    borderRight: `1px solid ${borderColour}`,
    borderTopRightRadius: 0,
  };
  const rightStyle: React.CSSProperties = {
    ...defaultStyle,
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
  };
  return (
    <div
      style={{
        border: `1px solid ${borderColour}`,
        borderRadius: '100px',
        width: 'fit-content',
      }}
    >
      <Tag.CheckableTag
        checked={selected.includes('tags')}
        onChange={() => onChange('tags')}
        style={
          selected.includes('tags')
            ? {
                ...leftStyle,
                backgroundColor: isDark ? '#345240' : '#f6ffed',
                color: '#52c41a',
              }
            : leftStyle
        }
      >
        {intl.formatMessage({ defaultMessage: 'Tags' })}
      </Tag.CheckableTag>
      <Tag.CheckableTag
        checked={selected.includes('activities')}
        onChange={() => onChange('activities')}
        style={
          selected.includes('activities')
            ? {
                ...rightStyle,
                backgroundColor: isDark ? '#345240' : '#f6ffed',
                color: '#52c41a',
              }
            : rightStyle
        }
      >
        {intl.formatMessage({ defaultMessage: 'Activities' })}
      </Tag.CheckableTag>
    </div>
  );
};

export default QuestionModeSelect;
