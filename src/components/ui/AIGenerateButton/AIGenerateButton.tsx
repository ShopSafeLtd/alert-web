import type { FormInstance } from 'antd';

import { faCompass } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Form, Tooltip } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';

import styles from './AIGenerateButton.module.css';

export type GradientVariant = 'blueGradient' | 'redOrange';

interface AIGenerateButtonProps {
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  form?: FormInstance;
  generating?: boolean;
  gradientVariant?: GradientVariant;
  label?: string;
  nameFieldName?: string;
  onClick?: () => void;
  standalone?: boolean;
  tooltipTitle?: string;
  wrapperMode?: 'button' | 'content' | 'form-item';
}

const AIGenerateButton: React.FC<AIGenerateButtonProps> = ({
  children,
  disabled = false,
  form,
  generating = false,
  gradientVariant = 'redOrange',
  label,
  nameFieldName = 'name',
  onClick,
  standalone = false,
  tooltipTitle,
  wrapperMode = 'button',
}) => {
  const intl = useIntl();
  const nameValue = form
    ? (Form.useWatch(nameFieldName, form) as string | undefined)
    : undefined;

  const defaultTooltip = intl.formatMessage({
    defaultMessage: 'Generate description with AI',
  });

  const isDisabled = disabled || (form ? !nameValue : false) || generating;

  if (wrapperMode === 'content') {
    return (
      <div
        className={`${styles.aiContentGradientWrapper} ${styles[gradientVariant]} ${generating ? styles.generating : ''}`}
      >
        {children}
      </div>
    );
  }

  // This mode shouldn't render anything, just for type checking
  if (wrapperMode === 'form-item') {
    return null;
  }

  return (
    <div
      className={
        standalone ? styles.aiButtonWrapperStandalone : styles.aiButtonWrapper
      }
    >
      <div
        className={`${styles.aiButtonGradientWrapper} ${styles[gradientVariant]} ${generating ? styles.generating : ''}`}
      >
        <Tooltip title={label ? undefined : tooltipTitle || defaultTooltip}>
          <Button
            className={styles.aiButton}
            disabled={isDisabled}
            icon={
              <FontAwesomeIcon
                icon={faCompass}
                spin={generating}
                style={label ? { marginRight: 4 } : undefined}
              />
            }
            onClick={onClick}
            size={label ? 'middle' : 'small'}
            type="default"
          >
            {label}
          </Button>
        </Tooltip>
      </div>
    </div>
  );
};

// Helper function to get className for Form.Item gradient border
export const getGradientFormItemClassName = (
  generating: boolean,
  gradientVariant: GradientVariant = 'redOrange',
  additionalClassName?: string
): string =>
  `${styles.gradientFormItem} ${styles[gradientVariant]} ${generating ? styles.generating : ''} ${additionalClassName || ''}`;

export default AIGenerateButton;
