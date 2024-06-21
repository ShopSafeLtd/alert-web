import type React from 'react';
import { useRef } from 'react';
import type { Editor } from 'tinymce';
import { useNavigate } from 'react-router';
import { notification } from 'antd';
import { useIntl } from 'react-intl';
import { useStoreState } from '../../../../state';
import { useCurrentSchemeTermsQuery } from 'graphql/scheme/queries/current-terms.generated';
import { useCreateTermsAndConditionsMutation } from 'graphql/scheme/mutation/create-terms.generated';

interface Return {
  onSubmit: () => void;
  editorRef: React.MutableRefObject<Editor | null>;
  data: string | null;
  onClose: () => void;
}

const useCreateTerms = (): Return => {
  const intl = useIntl();
  const editorRef = useRef<Editor | null>(null);
  const schemeId = useStoreState((state) => state.scheme.id);
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
        message: intl.formatMessage({
          defaultMessage: 'Successfully Updated!',
        }),
        description: intl.formatMessage({
          defaultMessage: 'The terms has been updated.',
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
    onSubmit,
    editorRef,
    data,
    onClose,
  };
};

export default useCreateTerms;
