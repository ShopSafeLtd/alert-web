import React, { memo, useState } from 'react';
import { faLanguage } from '@fortawesome/pro-light-svg-icons';
import { useIntl } from 'react-intl';
import { Tooltip } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { LanguageCode } from '../../graphql/generated';
import { useTranslateLazyQuery } from '../../graphql/generated';
import { useStoreState } from '../../state';

const TranslateButton = ({
  text,
  buttonStyle,
}: {
  text: string;
  buttonStyle?: React.CSSProperties;
}) => {
  const { languageCount } = useStoreState((state) => state.scheme);
  const currentLanguage = useStoreState((state) => state.theme.locale);
  const [isTranslated, setIsTranslated] = useState<string | null>(null);

  const intl = useIntl();
  const [translate] = useTranslateLazyQuery({
    canonizeResults: true,
    fetchPolicy: 'cache-first',
    variables: {
      data: {
        text: [text],
        targetLang: currentLanguage as LanguageCode,
      },
    },
  });

  const translateText = async () => {
    if (isTranslated) {
      setIsTranslated(null);
      return;
    }
    const { data: newTranslation } = await translate();
    setIsTranslated(
      newTranslation?.translateText[0].translatedText || text || ''
    );
  };
  return (
    <>
      {isTranslated ?? text}
      {languageCount > 1 && (
        <Tooltip
          title={intl.formatMessage({
            defaultMessage: 'Translate',
            id: 'wCy/Tc',
          })}
        >
          <FontAwesomeIcon
            icon={faLanguage}
            color="lightblue"
            // eslint-disable-next-line no-void
            onClick={() => void translateText()}
            style={{
              marginLeft: '10px',
              cursor: 'pointer',
              ...buttonStyle,
            }}
          />
        </Tooltip>
      )}
    </>
  );
};

export default memo(TranslateButton);
