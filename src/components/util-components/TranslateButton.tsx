import type { LanguageCode } from 'graphql/types';

import { faLanguage } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Tooltip } from 'antd';
import { useTranslateLazyQuery } from 'graphql/translate/queries/__generated__/translate.generated';
import React, { memo, useState } from 'react';
import { useIntl } from 'react-intl';

import { useStoreState } from '../../state';

const TranslateButton = ({
  buttonStyle,
  text,
}: {
  buttonStyle?: React.CSSProperties;
  text: string;
}) => {
  const { languageCount } = useStoreState((state) => state.scheme);
  const currentLanguage = useStoreState((state) => state.theme.locale);
  const [isTranslated, setIsTranslated] = useState<null | string>(null);

  const intl = useIntl();
  const [translate] = useTranslateLazyQuery({
    canonizeResults: true,
    fetchPolicy: 'cache-first',
    variables: {
      data: {
        targetLang: currentLanguage as LanguageCode,
        text: [text],
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
          })}
        >
          <FontAwesomeIcon
            color="lightblue"
            icon={faLanguage}
            // eslint-disable-next-line no-void
            onClick={() => void translateText()}
            style={{
              cursor: 'pointer',
              marginLeft: '10px',
              ...buttonStyle,
            }}
          />
        </Tooltip>
      )}
    </>
  );
};

export default memo(TranslateButton);
