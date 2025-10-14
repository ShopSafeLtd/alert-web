import type { Editor as EditorType } from 'tinymce';

import { Editor } from '@tinymce/tinymce-react';
import { Button, Col, Row } from 'antd';
import React from 'react';
import { FormattedMessage } from 'react-intl';

interface Props {
  data: null | string;
  editorRef: React.MutableRefObject<EditorType | null>;
  onClose: () => void;
  onSubmit: () => void;
}

const EditText = ({
  data,
  editorRef,
  onClose,
  onSubmit,
}: Props): JSX.Element => (
  <div>
    <Row gutter={16} style={{ paddingBottom: 30 }}>
      <div style={{ width: '100%' }}>
        <Editor
          init={{
            branding: false,
            content_style:
              'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
            elementpath: false,
            menubar: false,
            min_height: 500,
            plugins: ['advlist', 'directionality', 'lists'],
            promotion: false,
            toolbar:
              'bold italic underline strikethrough | fontfamily fontsize blocks forecolor removeformat|  numlist bullist | alignleft aligncenter alignright alignjustify | outdent indent  ',
            toolbar_sticky: true,
            toolbar_sticky_offset: 28,
          }}
          initialValue={data || '<p>Edit text node...</p>'}
          onInit={(evt, editor) => {
            // eslint-disable-next-line no-param-reassign
            editorRef.current = editor;
          }}
          tinymceScriptSrc="/tinymce/tinymce.min.js"
        />
      </div>
    </Row>
    <Row gutter={16} justify="end" style={{ paddingBottom: 30 }}>
      <Col>
        <Button onClick={onClose} style={{ marginRight: 10 }} type="default">
          <FormattedMessage defaultMessage="Cancel" />
        </Button>
        <Button onClick={onSubmit} type="primary">
          <FormattedMessage defaultMessage="Save" />
        </Button>
      </Col>
    </Row>
  </div>
);

export default EditText;
