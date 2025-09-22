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
  nameFieldName?: string;
  onClick?: () => void;
  tooltipTitle?: string;
  wrapperMode?: 'button' | 'content' | 'form-item';
}

const AIGenerateButton: React.FC<AIGenerateButtonProps> = ({
  children,
  disabled = false,
  form,
  generating = false,
  gradientVariant = 'redOrange',
  nameFieldName = 'name',
  onClick,
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

  const isDisabled = disabled || !nameValue || generating;

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
    <div className={styles.aiButtonWrapper}>
      <div
        className={`${styles.aiButtonGradientWrapper} ${styles[gradientVariant]} ${generating ? styles.generating : ''}`}
      >
        <Tooltip title={tooltipTitle || defaultTooltip}>
          <Button
            className={styles.aiButton}
            disabled={isDisabled}
            icon={<FontAwesomeIcon icon={faCompass} spin={generating} />}
            onClick={onClick}
            size="small"
            type="default"
          />
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
