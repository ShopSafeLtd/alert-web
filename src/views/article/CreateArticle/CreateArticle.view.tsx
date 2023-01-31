import { Editor } from '@tinymce/tinymce-react';
import { Button } from 'antd';
import React from 'react';
import { Props } from './types/CreateArticle';

const CreateArticleView = ({
  log,
  editorRef,
  exampleImageUploadHandler,
  preview,
}: Props) => (
  <>
    <div>
      <div style={{ margin: 25 }}>
        <Editor
          onInit={(evt, editor) => {
            // eslint-disable-next-line no-param-reassign
            editorRef.current = editor;
          }}
          tinymceScriptSrc="/tinymce/tinymce.min.js"
          initialValue="<p>This is the initial content of the editor.</p>"
          init={{
            branding: false,
            min_height: 500,
            plugins: [
              'preview',
              'importcss',
              'searchreplace',
              'save',
              'directionality',
              'visualblocks',
              'visualchars',
              'fullscreen',
              'image',
              'link',
              'media',
              'template',
              'table',
              'charmap',
              'pagebreak',
              'nonbreaking',
              'anchor',
              'insertdatetime',
              'advlist',
              'lists',
              'wordcount',
              'charmap',
              'quickbars',
              'emoticons',
              'autoresize',
            ],

            menubar: 'file edit view insert format tools table',
            toolbar:
              'undo redo | bold italic underline strikethrough | fontfamily fontsize blocks | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl',
            toolbar_sticky: true,
            // toolbar_sticky_offset: 108,
            images_upload_handler: exampleImageUploadHandler,
            file_picker_types: 'file, image, media',
            // skin: 'oxide-dark',
            // content_css: 'dark',
            file_picker_callback: (callback, value, meta) => {
              /* Provide file and text for the link dialog */
              if (meta.filetype === 'file') {
                callback('https://www.google.com/logos/google.jpg', {
                  text: 'My text',
                });
              }

              /* Provide image and alt text for the image dialog */
              if (meta.filetype === 'image') {
                callback('https://www.google.com/logos/google.jpg', {
                  alt: 'My alt text',
                });
              }

              /* Provide alternative source and posted for the media dialog */
              if (meta.filetype === 'media') {
                callback('movie.mp4', {
                  source2: 'alt.ogg',
                  poster: 'https://www.google.com/logos/google.jpg',
                });
              }
            },
            promotion: false,
            content_style:
              'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
          }}
        />
        <Button
          onClick={() => log()}
          style={{ marginTop: 10, marginRight: 10 }}
        >
          Generate preview text and images array
        </Button>
        <Button onClick={() => preview()} style={{ marginTop: 10 }}>
          Preview
        </Button>
      </div>
    </div>
  </>
);

export default CreateArticleView;
