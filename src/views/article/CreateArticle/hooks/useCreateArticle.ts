/* eslint-disable @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-argument */
import { useRef, useState } from 'react';
import type { SelectProps, UploadProps } from 'antd';
import { Form } from 'antd';
import type { Editor } from 'tinymce';
import type { UploadFile } from 'antd/es/upload/interface';
import { useNavigate } from 'react-router';
import type { Props } from '../types/CreateArticle';
import {
  ArticlePriority,
  Model,
  useCreateArticleMutation,
  useCreateTagMutation,
  useSchemeGroupsQuery,
  useTagsQuery,
} from '../../../../graphql/generated';
import { useStoreState } from '../../../../state';
import type { OffenderData } from '../../../../components/form-components/offender/offender/AddExistingOffender/AddExistingOffender.container';
import type { Incident } from '../../../../components/form-components/linkOptions/LinkIncident/LinkIncident.container';
import extracted from '../../../../utils/add-default-to-article';

const { useForm } = Form;

interface FormData {
  title: string;
  content: string;
  groups: string[];
  categories: string[];
  importance: ArticlePriority;
  schemes: string[];
  watermarkImage: boolean;
}

export type { FormData };

const useCreateArticle = (): Props => {
  const siteUrl = `${window.location.href.split('/app/')[0]}`;
  const schemeId = useStoreState((state) => state.scheme.id);
  const { schemes, id: userId } = useStoreState((state) => state.user);
  const [form] = useForm<FormData>();
  const [data] = useState<FormData>({
    title: '',
    content: '',
    groups: [],
    categories: [],
    importance: ArticlePriority.Normal,
    schemes: [],
    watermarkImage: true,
  });

  const [selectedSchemes, setSelectedSchemes] = useState<string[]>([]);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const editorRef = useRef<Editor | null>(null);

  const [previewText, setPreviewText] = useState<string>('');
  const [previewImage, setPreviewImage] = useState<string>('');
  const [imageList, setImageList] = useState<UploadFile[]>([]);

  const [groups, setGroups] = useState<{ value: string; label: string }[]>([]);
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const [categories, setCategories] = useState<SelectProps['options']>([]);
  const [categoryIds, setCategoryIds] = useState<
    { value: string; id: string }[]
  >([]);
  const [offenders, setOffenders] = useState<OffenderData[]>([]);
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<
    { value: string }[]
  >([]);

  const navigate = useNavigate();
  const { data: groupsData, loading: groupsLoading } = useSchemeGroupsQuery({
    variables: {
      where: {
        scheme: {
          id: {
            in: schemes?.map((scheme) => scheme?.scheme?.id || '') || [],
          },
        },
      },
    },
    fetchPolicy: 'cache-and-network',
    onCompleted: (result) => {
      const groupsFormatted = result.groups.map((group) => ({
        value: group.id,
        label: `${group.name} (${group.scheme.name})`,
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
        schemes: {
          some: {
            id: {
              in: [schemeId],
            },
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
    setSelectedSchemes(
      groupsData?.groups
        .filter((group) => values.includes(group.id))
        .map((group) => group.scheme.id)
        .filter((value, index, self) => self.indexOf(value) === index) || []
    );
  };

  const categoriesChange = (values: { value: string }[]) => {
    const formattedValues: string[] = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const value of values) {
      const found = categories?.find(
        (category) => category.value === value.value
      );
      if (found) {
        formattedValues.push(value.value);
      } else {
        void createTag({
          variables: {
            data: {
              name: value.value,
              createdBy: {
                connect: {
                  id: userId,
                },
              },
              description: '',
              schemes: {
                connect: [
                  {
                    id: schemeId,
                  },
                ],
              },
              dataType: Model.Article,
            },
          },
        }).then((result) => {
          formattedValues.push(result.data?.createTag?.name || '');
        });
      }
    }

    setSelectedCategories(formattedValues.map((value) => ({ value })));
  };
  const log = (): { text: string; img: string; imgSrc: string[] } => {
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
      const imageSrcs = [...images].map((image) => image.src);

      // remove all new lines from innerHTML
      doc.body.innerHTML = doc.body.innerHTML.replace(/&nbsp;/g, '');

      // remove all new lines from innerText
      doc.body.innerText = doc.body.innerText.replace(/(\r\n|\n|\r)/gm, '');
      const innerText =
        doc.body.innerText.length > 120
          ? `${doc.body.innerText.slice(0, 120)}...`
          : doc.body.innerText;

      setPreviewText(innerText);

      return {
        text: innerText,
        img: imageSrcs[0] || '',
        imgSrc: imageSrcs,
      };
    }
    return {
      text: '',
      img: '',
      imgSrc: [],
    };
  };

  const exampleImageUploadHandler = (
    blobInfo: { blob: () => string | Blob; filename: () => string | undefined },
    progress: (arg0: number) => void
  ): Promise<string> =>
    new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.withCredentials = false;
      xhr.open('POST', import.meta.env.VITE_APP_IMAGE_UPLOAD_ENDPOINT);

      xhr.upload.addEventListener('progress', (e) => {
        progress((e.loaded / e.total) * 100);
      });

      xhr.addEventListener('load', () => {
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
        setImageList([...imageList, json]);
        resolve(json.url);
      });

      xhr.onerror = () => {
        reject(
          new Error(
            `Image upload failed due to a XHR Transport error. Code: ${xhr.status}`
          )
        );
      };

      const formData = new FormData();
      formData.append('file', blobInfo.blob() as Blob, blobInfo.filename());

      xhr.send(formData);
    });

  const preview = () => {
    if (editorRef.current) {
      editorRef.current.execCommand('mcePreview');
    }
  };
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

      xhr.addEventListener('load', () => {
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

        setImageList([...imageList, json]);

        if (!json || typeof json.url !== 'string') {
          reject(new Error(`Invalid JSON: ${xhr.responseText}`));
          return;
        }

        resolve(json.url);
      });

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
  const filePickerCallback = (
    callback: (arg0: string, arg1: { title: string }) => void,
    value: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    meta: Record<string, any>
  ) => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*,.pdf');
    input.addEventListener('change', () => {
      if (input.files === null) return;
      const file = input.files[0];

      const reader = new FileReader();
      reader.addEventListener('load', () => {
        const id = `blobid${Date.now()}`;

        // eslint-disable-next-line
        const { blobCache } = (window as any).tinymce.activeEditor.editorUpload;
        const base64 = (reader.result as string).split(',')[1];
        const blobInfo = blobCache.create(id, file, base64);
        void upload({
          blob: blobInfo.blob(),
          fileName: blobInfo.filename(),
        }).then((url) => {
          blobCache.add(blobInfo);

          if (meta.filetype === 'file') {
            fileList.push({
              ...file,
              url,
              name: file.name,
              uid: id,
            } as UploadFile);
          }
          if (meta.filetype === 'image') {
            imageList.push({
              ...file,
              url,
              name: file.name,
              uid: id,
            } as UploadFile);
          }
          callback(url, { title: file.name });
        });
        // blobCache.add(blobInfo);
        // callback(blobInfo.blobUri(), { title: file.name });
      });
      reader.readAsDataURL(file);
    });

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
  // const { img: imgs } = log();
  // const previewImageFile = imageList?.filter(({ url }) => url === imgs);
  // console.log('articleImage1', {
  //   filename: previewImageFile[0].fileName || '',
  //   mimetype: previewImageFile[0].type || '',
  //   url: previewImageFile[0].url || '',
  // });

  const [saving, setSaving] = useState(false);
  const onSubmit = async () => {
    setSaving(true);
    const selectedCategoryIds = selectedCategories
      .map((category) => {
        const selectedCategory = categoryIds.find(
          (cat) => cat.value === category.value
        );
        return selectedCategory?.id;
      })
      .map((id) => id || '');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const priority = form
      .getFieldValue('importance')
      .toString()
      .toUpperCase() as ArticlePriority;
    const { img, text, imgSrc } = log();
    // const previewImageFile = imageList?.filter(({ url }) => url === img);
    const articleImages = imageList?.filter(({ url }) =>
      imgSrc.includes(url || '')
    );

    const htmlWithDefaultWidth = extracted(
      editorRef.current?.getContent() || ''
    );

    const submittedSchemes: string[] = selectedSchemes;
    await submitArticle({
      variables: {
        data: {
          title: form.getFieldValue('title'),
          categories: selectedCategoryIds,
          groups: selectedGroups,
          watermarkImage: form.getFieldValue('watermarkImage'),
          documents:
            fileList.map((file) => ({
              url: file.url || '',
              name: file.name || '',
              fileType: file.type || '',
              origFileName: file.fileName || '',
            })) || [],
          htmlBody: htmlWithDefaultWidth || '',
          previewImage: img,
          previewText: text,
          schemes:
            submittedSchemes && submittedSchemes.length > 1
              ? submittedSchemes.map((scheme) => scheme)
              : [schemeId],
          priority,
          incidents:
            submittedSchemes && submittedSchemes.length > 1
              ? []
              : incidents.map((incident) => incident.incident.id),
          offenders:
            submittedSchemes && submittedSchemes.length > 1
              ? []
              : offenders.map((offender) => offender.id),
          images: {
            upload:
              articleImages && articleImages.length > 0
                ? articleImages.map((item) => ({
                    url: {
                      filename: item.fileName || item.name || '',
                      mimetype: item.type || '',
                      url: item.url || '',
                    },
                  }))
                : undefined,
          },
          // images: {
          //   upload: previewImageFile
          //     ? [
          //         {
          //           url: {
          //             filename: previewImageFile[0].fileName || '',
          //             mimetype: previewImageFile[0].type || '',
          //             url: previewImageFile[0].url || '',
          //           },
          //         },
          //       ]
          //     : undefined,
          // },
        },
      },
    })
      .then((res) => {
        if (res && res.data && res.data.createArticle) {
          setSaving(false);

          navigate(`/app/article/view/${res?.data?.createArticle.id}`);
        }
      })
      .catch(() => {
        setSaving(false);
      });
    setSaving(false);
  };

  const handleChange: UploadProps['onChange'] = (info) => {
    let newFileList = [...info.fileList];

    newFileList = newFileList.map((file) => {
      if (file.response) {
        // eslint-disable-next-line no-param-reassign
        file.url = file.response[0].url;
        // eslint-disable-next-line no-param-reassign
        file.fileName = file.response[0].blobName;
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

  const insertIncident = (incident: Incident) => {
    if (selectedSchemes && selectedSchemes?.length <= 1) {
      setIncidents((prev) => [...prev, incident]);
      editorRef.current?.insertContent(
        `
        <a target="_blank" rel="noopener noreferrer"  href="${siteUrl}/app/incidents/view/${incident.incident.id}">
        <b>${incident.incident.description}</b>
</a>`,
        { format: 'raw' }
      );
    }
  };

  const insertOffender = (offender: OffenderData) => {
    if (selectedSchemes && selectedSchemes?.length <= 1) {
      setOffenders((prev) => [...prev, offender]);
      const url = `${siteUrl}/app/offenders/view/${offender.id}`;
      editorRef.current?.insertContent(
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        `<a target="_blank" rel="noopener noreferrer" href="${url}">       <b>${offender.name}</b></a>`,
        { format: 'raw' }
      );
    }
  };

  const removeOffender = (id: string) => {
    setOffenders((prev) => prev.filter((offender) => offender.id !== id));
  };

  const removeIncident = (id: string) => {
    setIncidents((prev) =>
      prev.filter((incident) => incident.incident.id !== id)
    );
  };

  return {
    editorRef,
    log,
    preview,
    exampleImageUploadHandler,

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
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    onSubmit,
    loading: tagsLoading || saving,
    fileList,
    documentUploadProps,
    insertOffender,
    insertIncident,
    offenders,
    incidents,
    removeOffender,
    removeIncident,
    selectedSchemes,
  };
};

export default useCreateArticle;
