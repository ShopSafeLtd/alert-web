import type React from 'react';
import type { Editor } from 'tinymce';

import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { notification } from 'antd';
import { useCreateTermsAndConditionsMutation } from 'graphql/scheme/mutation/__generated__/create-terms.generated';
import { useCurrentSchemeTermsQuery } from 'graphql/scheme/queries/__generated__/current-terms.generated';
import { useAtomValue } from 'jotai/index';
import { useRef } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router';

interface Return {
  data: null | string;
  editorRef: React.MutableRefObject<Editor | null>;
  onClose: () => void;
  onSubmit: () => void;
}

const useCreateTerms = (): Return => {
  const intl = useIntl();
  const editorRef = useRef<Editor | null>(null);
  const schemeId = useAtomValue(currentSchemeIdAtom);
  const navigate = useNavigate();
  const { data: SchemeTerms } = useCurrentSchemeTermsQuery({
    variables: {
      where: {
        id: schemeId,
      },
    },
  });

  const [saveTerms] = useCreateTermsAndConditionsMutation({
    onCompleted: () => {
      notification.success({
        description: intl.formatMessage({
          defaultMessage: 'The terms has been updated.',
        }),
        message: intl.formatMessage({
          defaultMessage: 'Successfully Updated!',
        }),
        placement: 'bottomRight',
      });
    },
  });
  const onClose = () => {
    navigate('/app/scheme-settings/terms');
  };
  const onSubmit = () => {
    void saveTerms({
      variables: {
        data: {
          content: editorRef.current?.getContent() ?? '',
          schemeId,
        },
      },
    }).finally(() => {
      onClose();
    });
    // onClose();
  };

  const data = SchemeTerms?.scheme?.currentTerms?.content || null;

  return {
    data,
    editorRef,
    onClose,
    onSubmit,
  };
};

export default useCreateTerms;
