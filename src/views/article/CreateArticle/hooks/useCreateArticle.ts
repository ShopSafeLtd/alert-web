import { useRef, useState } from 'react';
import { Form, SelectProps, UploadProps } from 'antd';
import type { Editor } from 'tinymce';
import { UploadFile } from 'antd/es/upload/interface';
import type { FormData, Props } from '../types/CreateArticle';
import {
  ArticlePriority,
  Model,
  useCreateArticleMutation,
  useCreateTagMutation,
  useSchemeGroupsQuery,
  useTagsQuery,
} from '../../../../graphql/generated';
import { useStoreState } from '../../../../state';
import { OffenderData } from '../../../../components/form-components/incident/offender/AddExisitingOffender/AddExisitingOffender.container';

const { useForm } = Form;

const useCreateArticle = (): Props => {
  const schemeId = useStoreState((state) => state.scheme.id);
  const userId = useStoreState((state) => state.user.id);
  const [form] = useForm<FormData>();
  const [data] = useState<FormData>({
    title: '',
    content: '',
    groups: [],
    categories: [],
    importance: 'Normal',
  });
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const editorRef = useRef<Editor | null>(null);
  const [imgSrcs, setImgSrcs] = useState<string[]>([]);
  const [previewText, setPreviewText] = useState<string>('');
  const [previewImage, setPreviewImage] = useState<string>('');
  const [groups, setGroups] = useState<{ value: string; label: string }[]>([]);
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const [categories, setCategories] = useState<SelectProps['options']>([]);
  const [categoryIds, setCategoryIds] = useState<
    { value: string; id: string }[]
  >([]);
  const [selectedCategories, setSelectedCategories] = useState<
    { value: string }[]
  >([]);

  const { loading: groupsLoading } = useSchemeGroupsQuery({
    variables: {
      where: {
        scheme: {
          id: {
            equals: schemeId,
          },
        },
      },
    },
    fetchPolicy: 'cache-and-network',
    onCompleted: (result) => {
      const groupsFormatted = result.groups.map((group) => ({
        value: group.id,
        label: group.name,
      }));
      setGroups(groupsFormatted);
    },
  });

  const [createTag] = useCreateTagMutation({
    onCompleted: (result) => {
      const newCategory = {
        value: result.createTag.name,
        label: result.createTag.name,
      };
      const newCategoryIds = {
        value: result.createTag.name,
        id: result.createTag.id,
      };
      setCategoryIds([...(<[]>categoryIds), newCategoryIds]);
      setCategories([...(<[]>categories), newCategory]);
    },
  });

  const { loading: tagsLoading } = useTagsQuery({
    variables: {
      where: {
        scheme: {
          id: {
            equals: schemeId,
          },
        },
        dataType: {
          equals: Model.Article,
        },
      },
    },
    fetchPolicy: 'cache-and-network',
    onCompleted: (result) => {
      const categoriesFormatted = result.tags.map((tag) => ({
        value: tag.name,
        label: tag.name,
      }));
      const categoryIdsFormatted = result.tags.map((tag) => ({
        value: tag.name,
        id: tag.id,
      }));
      setCategoryIds(categoryIdsFormatted);
      setCategories(categoriesFormatted);
    },
  });

  const onGroupsChange = (values: string[]) => {
    setSelectedGroups(values);
  };

  const categoriesChange = (values: { value: string }[]) => {
    const formattedValues: string[] = [];
    values.forEach((value) => {
      const found = categories?.find(
        (category) => category.value === value.value
      );
      if (!found) {
        createTag({
          variables: {
            data: {
              name: value.value,
              createdBy: {
                connect: {
                  id: userId,
                },
              },
              description: '',
              scheme: {
                connect: {
                  id: schemeId,
                },
              },
              dataType: Model.Article,
            },
          },
        }).then((result) => {
          formattedValues.push(result.data?.createTag?.name || '');
        });
      } else {
        formattedValues.push(value.value);
      }
    });

    setSelectedCategories(formattedValues.map((value) => ({ value })));
  };
  const log = () => {
    if (editorRef.current) {
      const html = editorRef.current.getContent();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      // // for each td, remove style tag
      // const tds = doc.body.querySelectorAll('td');
      // tds.forEach((td) => {
      //   const { style } = td;
      //   // console.log(style);
      //   if (style) {
      //     style.borderWidth = '0';
      //   }
      // });
      // const table = doc.body.querySelector('table');
      // if (table) {
      //   table.style.borderWidth = '0';
      // }
      // console.log(doc.body.innerHTML);
      const images = doc.body.querySelectorAll('img');
      const imageSrcs = Array.from(images).map((image) => image.src);
      setImgSrcs(imageSrcs);
      setPreviewImage(imageSrcs[0] || '');
      // remove all new lines from innerHTML
      doc.body.innerHTML = doc.body.innerHTML.replace(/&nbsp;/g, '');

      // remove all new lines from innerText
      doc.body.innerText = doc.body.innerText.replace(/(\r\n|\n|\r)/gm, '');
      const innerText =
        doc.body.innerText.length > 120
          ? `${doc.body.innerText.substring(0, 120)}...`
          : doc.body.innerText;

      setPreviewText(innerText);
    }
  };

  const exampleImageUploadHandler = (
    blobInfo: { blob: () => string | Blob; filename: () => string | undefined },
    progress: (arg0: number) => void
  ): Promise<string> =>
    new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.withCredentials = false;
      xhr.open('POST', import.meta.env.VITE_APP_IMAGE_UPLOAD_ENDPOINT);

      xhr.upload.onprogress = (e) => {
        progress((e.loaded / e.total) * 100);
      };

      xhr.onload = () => {
        if (xhr.status === 403) {
          // eslint-disable-next-line prefer-promise-reject-errors
          reject({ message: `HTTP Error: ${xhr.status}`, remove: true });
          return;
        }

        if (xhr.status < 200 || xhr.status >= 300) {
          reject(new Error(`HTTP Error: ${xhr.status}`));
          return;
        }
        const json = JSON.parse(xhr.responseText)[0];

        if (!json || typeof json.url !== 'string') {
          reject(new Error(`Invalid JSON: ${xhr.responseText}`));
          return;
        }

        resolve(json.url);
      };

      xhr.onerror = () => {
        reject(
          new Error(
            `Image upload failed due to a XHR Transport error. Code: ${xhr.status}`
          )
        );
      };

      const formData = new FormData();
      formData.append('file', blobInfo.blob(), blobInfo.filename());

      xhr.send(formData);
    });

  const preview = () => {
    if (editorRef.current) {
      editorRef.current.execCommand('mcePreview');
    }
  };

  const filePickerCallback = (
    callback: (arg0: string, arg1: { title: string }) => void,
    value: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    meta: Record<string, any>
  ) => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*,.pdf');
    input.onchange = () => {
      if (input.files === null) return;
      const file = input.files[0];
      const upload = ({
        blob,
        fileName,
      }: {
        blob: Blob;
        fileName: string;
      }): Promise<string> =>
        new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.withCredentials = false;
          xhr.open('POST', import.meta.env.VITE_APP_IMAGE_UPLOAD_ENDPOINT);

          xhr.onload = () => {
            if (xhr.status === 403) {
              // eslint-disable-next-line prefer-promise-reject-errors
              reject({ message: `HTTP Error: ${xhr.status}`, remove: true });
              return;
            }

            if (xhr.status < 200 || xhr.status >= 300) {
              reject(new Error(`HTTP Error: ${xhr.status}`));
              return;
            }
            const json = JSON.parse(xhr.responseText)[0];

            if (!json || typeof json.url !== 'string') {
              reject(new Error(`Invalid JSON: ${xhr.responseText}`));
              return;
            }

            resolve(json.url);
          };

          xhr.onerror = () => {
            reject(
              new Error(
                `Image upload failed due to a XHR Transport error. Code: ${xhr.status}`
              )
            );
          };

          const formData = new FormData();
          formData.append('file', blob, fileName);

          xhr.send(formData);
        });

      const reader = new FileReader();
      reader.onload = () => {
        const id = `blobid${new Date().getTime()}`;

        // eslint-disable-next-line
        const { blobCache } = (window as any).tinymce.activeEditor.editorUpload;
        const base64 = (reader.result as string).split(',')[1];
        const blobInfo = blobCache.create(id, file, base64);
        upload({ blob: blobInfo.blob(), fileName: blobInfo.filename() }).then(
          (url) => {
            blobCache.add(blobInfo);
            if (meta.filetype === 'file') {
              fileList.push({ url, name: file.name, uid: id } as UploadFile);
            }
            callback(url, { title: file.name });
          }
        );
        // blobCache.add(blobInfo);
        // callback(blobInfo.blobUri(), { title: file.name });
      };
      reader.readAsDataURL(file);
    };

    input.click();
    // /* Provide file and text for the link dialog */
    // if (meta.filetype === 'file') {
    //   callback('https://www.google.com/logos/google.jpg', {
    //     text: 'My text',
    //   });
    // }

    // /* Provide image and alt text for the image dialog */
    // if (meta.filetype === 'image') {
    //   callback('https://www.google.com/logos/google.jpg', {
    //     alt: 'My alt text',
    //   });
    // }
    //
    // /* Provide alternative source and posted for the media dialog */
    // if (meta.filetype === 'media') {
    //   callback('movie.mp4', {
    //     source2: 'alt.ogg',
    //     poster: 'https://www.google.com/logos/google.jpg',
    //   });
    // }
  };

  const [submitArticle] = useCreateArticleMutation();

  const onSubmit = async () => {
    const selectedCategoryIds = selectedCategories
      .map((category) => {
        const selectedCategory = categoryIds.find(
          (cat) => cat.value === category.value
        );
        return selectedCategory?.id;
      })
      .map((id) => id || '');
    const priority = form
      .getFieldValue('importance')
      .toString()
      .toUpperCase() as ArticlePriority;
    await submitArticle({
      variables: {
        data: {
          title: form.getFieldValue('title'),
          categories: selectedCategoryIds,
          groups: selectedGroups,
          documents: fileList.map((file) => file.url || '') || [],
          htmlBody: editorRef.current?.getContent() || '',
          previewImage,
          previewText,
          schemeId,
          priority,
        },
      },
    });
    // TODO: change to redirect to wherever
    window.history.back();
  };

  const handleChange: UploadProps['onChange'] = (info) => {
    let newFileList = [...info.fileList];

    newFileList = newFileList.map((file) => {
      if (file.response) {
        // eslint-disable-next-line no-param-reassign
        file.url = file.response[0].url;
      }
      return file;
    });

    setFileList(newFileList);
  };
  const documentUploadProps: UploadProps = {
    action: import.meta.env.VITE_APP_IMAGE_UPLOAD_ENDPOINT,
    onChange: handleChange,
    multiple: true,
  };

  const insertIncident = (incident: string) => {
    editorRef.current?.insertContent(
      `
        <a href="/app/offenders/view/${incident}">
        <b>${incident}</b>
</a>`,
      { format: 'raw' }
    );
  };

  const insertOffender = (offender: OffenderData) => {
    editorRef.current?.insertContent(
      `<img src="${
        offender.images && offender.images[0].optimised
      }" alt="Avatar" style="height:200px">
        <a href="/app/offenders/view/${offender.id}">
        <b>${offender.name}</b>
</a>`,
      { format: 'raw' }
    );
  };
  return {
    editorRef,
    log,
    preview,
    exampleImageUploadHandler,
    imgSrcs,
    previewText,
    previewImage,
    setPreviewImage,
    setPreviewText,
    filePickerCallback,
    groupsLoading,
    groups,
    onGroupsChange,
    selectedGroups,
    categories,
    categoriesLoading: false,
    categoriesChange,
    selectedCategories,
    form,
    data,
    onSubmit,
    loading: tagsLoading,
    fileList,
    documentUploadProps,
    insertOffender,
    insertIncident,
  };
};

export default useCreateArticle;
