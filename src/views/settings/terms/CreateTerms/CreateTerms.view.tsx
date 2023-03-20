import React from 'react';
import { Button, Card, Col, Row } from 'antd';
import type { Editor as EditorType } from 'tinymce';
import { Editor } from '@tinymce/tinymce-react';

interface Props {
  data: string | null;
  onSubmit: () => void;
  onClose: () => void;
  editorRef: React.MutableRefObject<EditorType | null>;
}

const EditText = ({
  data,
  onSubmit,
  onClose,
  editorRef,
}: Props): JSX.Element => (
  <div className="page-view">
    <Row gutter={16} style={{ paddingBottom: 30 }}>
      <Card
        style={{
          marginLeft: 20,
          marginRight: 20,
          minHeight: 600,
          width: '100%',
        }}
      >
        <Editor
          onInit={(evt, editor) => {
            // eslint-disable-next-line no-param-reassign
            editorRef.current = editor;
          }}
          tinymceScriptSrc="/tinymce/tinymce.min.js"
          initialValue={data || '<p>Edit text node...</p>'}
          init={{
            menubar: false,
            branding: false,
            min_height: 500,
            elementpath: false,
            plugins: ['advlist', 'directionality', 'lists', 'link'],
            toolbar:
              'bold italic underline strikethrough | fontfamily fontsize blocks forecolor removeformat|  numlist bullist | alignleft aligncenter alignright alignjustify | outdent indent |  link ',
            toolbar_sticky: true,
            toolbar_sticky_offset: 28,
            promotion: false,
            content_style:
              'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
          }}
        />
      </Card>
    </Row>
    <Row gutter={16} style={{ paddingBottom: 30 }} justify="end">
      <Col>
        <Button onClick={onClose} type="default" style={{ marginRight: 10 }}>
          Cancel
        </Button>
        <Button onClick={onSubmit} type="primary">
          Submit
        </Button>
      </Col>
    </Row>
  </div>
);

export default EditText;
