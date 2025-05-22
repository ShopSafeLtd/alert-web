/* eslint-disable @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-argument */
import type { OffenderData } from '#/components/form-components/offender/AddExistingOffender/AddExistingOffender.container';
import type { SelectProps, UploadProps } from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';
import type { Editor } from 'tinymce';

import { getCustomUrls } from '#/providers/ApolloProvider';
import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import {
  currentUserAtom,
  userIdAtom,
  userSchemesAtom,
} from '#/providers/UserProvider/UserProvider';
import { Form } from 'antd';
import { useCreateArticleMutation } from 'graphql/article/mutations/__generated__/create-article.generated';
import { useEditArticleMutation } from 'graphql/article/mutations/__generated__/edit-article.generated';
import { useArticleQuery } from 'graphql/article/queries/__generated__/view-article.generated';
import { useSchemeGroupsQuery } from 'graphql/groups/queries/__generated__/scheme-groups.generated';
import { useCreateTagMutation } from 'graphql/tags/mutations/__generated__/create-tag.generated';
import { useTagsQuery } from 'graphql/tags/queries/__generated__/tags.generated';
import { ArticlePriority, Model, Role } from 'graphql/types';
import { useAtomValue } from 'jotai/index';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import type { Incident } from '../../../../components/form-components/linkOptions/LinkIncident/useLinkIncident';
import type { Props } from '../types/CreateArticle';

import extracted from '../../../../utils/add-default-to-article';
import customRequest from '../../../../utils/custom-request';

const { useForm } = Form;

interface FormData {
  categories: SelectProps['options'];
  content: string;
  groups: string[];
  importance: ArticlePriority;
  schemes: string[];
  title: string;
  watermarkImage: boolean;
}

export type { FormData };

const imageTypeFromUrl = (url: string): string => {
  const imageTypes = [
    'jpg',
    'jpeg',
    'png',
    'gif',
    'svg',
    'webp',
    'bmp',
    'tiff',
  ];
  const found = imageTypes.find((type) => url.includes(type));
  return found || 'jpg';
};
const generateUid = (): string => Math.random().toString(36).slice(2, 11);
export function extractFilename(url: string): null | string {
  const match = /\/temp\/([^?]+)/.exec(url);
  return match ? match[1] : null;
}

const useCreateEditArticle = (): Props => {
  const { id: articleId } = useParams();

  const siteUrl = `${window.location.href.split('/app/')[0]}`;
  const schemeId = useAtomValue(currentSchemeIdAtom);
  const schemes = useAtomValue(userSchemesAtom);
  const userId = useAtomValue(currentUserAtom)?.id ?? '';
  const [form] = useForm<FormData>();
  const [data, setData] = useState<FormData>({
    categories: [],
    content: '',
    groups: [],
    importance: ArticlePriority.Normal,
    schemes: [],
    title: '',
    watermarkImage: true,
  });
  const currentUserId = useAtomValue(userIdAtom);

  const [selectedSchemes, setSelectedSchemes] = useState<string[]>([]);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const editorRef = useRef<Editor | null>(null);
  const [previewText, setPreviewText] = useState<string>('');
  const [previewImage, setPreviewImage] = useState<string>('');
  const [imageList, setImageList] = useState<UploadFile[]>([]);

  const [groups, setGroups] = useState<{ label: string; value: string }[]>([]);
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const [categories, setCategories] = useState<SelectProps['options']>([]);
  const [categoryIds, setCategoryIds] = useState<
    { id: string; value: string }[]
  >([]);
  const [offenders, setOffenders] = useState<OffenderData[]>([]);
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<
    { value: string }[]
  >([]);
  const [initialValue, setInitialValue] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    if (!articleId) setInitialValue('<p>Create a new document here...</p>');
  }, []);

  const navigate = useNavigate();
  const { data: res, loading } = useArticleQuery({
    fetchPolicy: 'network-only',
    onCompleted: (result) => {
      setData({
        categories:
          result?.article?.tags.map((tag) => ({
            label: tag.name || '',
            value: tag.name || '',
          })) || [],
        content: result?.article?.rows[0].columns[0].text || '',
        groups: result?.article?.groups.map((group) => group.id || '') || [],
        importance: result?.article?.priority || ArticlePriority.Normal,
        schemes:
          result?.article?.groups.map((group) => group.scheme.id || '') || [],
        title: result?.article?.title || '',
        watermarkImage: !!result?.article?.watermarkImage,
      });
      setSelectedSchemes(
        result?.article?.groups.map((group) => group.scheme.id || '') || []
      );
      setSelectedGroups(
        result?.article?.groups.map((group) => group.id || '') || []
      );
      setOffenders(
        (result?.article?.rows[0].columns[0].offenders as OffenderData[]) || []
      );
      setIncidents(
        result?.article?.rows[0].columns[0].incidents.map((i) => ({
          incident: {
            ...i,
            date: new Date(),
            incidentItems: [],
            totalImages: i.images.length,
            totalRecoveredValue: 0,
            totalValue: 0,
          },
        })) || []
      );
      setFileList(
        result?.article?.documents.map((document) => ({
          name: document.name,
          status: 'done',
          uid: document.id,
          url: document.url,
        })) || []
      );
      setSelectedCategories(
        result?.article?.tags.map((tag) => ({
          label: tag.name || '',
          value: tag.name || '',
        })) || []
      );
      const html = result?.article?.rows[0].columns[0].text || '';
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

      setImageList(
        imageSrcs?.map((image) => ({
          name: image,
          status: 'done',
          uid: image,
          url: image || '',
        })) || []
      );

      form.setFieldsValue({
        categories:
          result?.article?.tags.map((tag) => ({
            label: tag.name || '',
            value: tag.name || '',
          })) || [],
        content: result?.article?.rows[0].columns[0].text || '',
        groups: result?.article?.groups.map((group) => group.id || '') || [],
        importance: result?.article?.priority || ArticlePriority.Normal,
        schemes: [],
        title: result?.article?.title || '',
        watermarkImage: !!result?.article?.watermarkImage,
      });
      setInitialValue(res?.article?.rows[0].columns[0].text || '');
    },
    skip: !articleId,
    variables: {
      where: { id: articleId },
    },
  });

  const { data: groupsData, loading: groupsLoading } = useSchemeGroupsQuery({
    fetchPolicy: 'cache-and-network',
    onCompleted: (r) => {
      const groupsFormatted = r.groups.map((group) => ({
        label: `${group.name} (${group.scheme.name})`,
        value: group.id,
      }));
      setGroups(groupsFormatted);
    },
    variables: {
      where: {
        scheme: {
          AND: [
            {
              id: {
                in: schemes?.map((scheme) => scheme?.schemeId || '') || [],
              },
            },
            {
              members: {
                some: {
                  AND: [
                    {
                      user: {
                        id: {
                          equals: currentUserId,
                        },
                      },
                    },
                    {
                      role: {
                        not: Role.User,
                      },
                    },
                  ],
                },
              },
            },
          ],
        },
      },
    },
  });

  const [createTag] = useCreateTagMutation({
    onCompleted: (r) => {
      const newCategory = {
        label: r.createTag.name,
        value: r.createTag.name,
      };
      const newCategoryIds = {
        id: r.createTag.id,
        value: r.createTag.name,
      };
      setCategoryIds([...(categoryIds as []), newCategoryIds]);
      setCategories([...(categories as []), newCategory]);
    },
  });

  const { loading: tagsLoading } = useTagsQuery({
    fetchPolicy: 'cache-and-network',
    onCompleted: (r) => {
      const categoriesFormatted = r.tags.map((tag) => ({
        label: tag.name,
        value: tag.name,
      }));
      const categoryIdsFormatted = r.tags.map((tag) => ({
        id: tag.id,
        value: tag.name,
      }));
      setCategoryIds(categoryIdsFormatted);
      setCategories(categoriesFormatted);
    },
    variables: {
      where: {
        dataType: {
          equals: Model.Article,
        },
        schemes: {
          some: {
            id: {
              in: [schemeId],
            },
          },
        },
      },
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
              createdBy: {
                connect: {
                  id: userId,
                },
              },
              dataType: Model.Article,
              description: '',
              name: value.value,
              schemes: {
                connect: [
                  {
                    id: schemeId,
                  },
                ],
              },
            },
          },
        }).then((r) => {
          formattedValues.push(r.data?.createTag?.name || '');
        });
      }
    }

    setSelectedCategories(formattedValues.map((value) => ({ value })));
  };

  useEffect(() => {
    if (categories && categories?.length > 0 && res) {
      setSelectedCategories(
        res?.article?.tags.map((tag) => ({
          label: tag.name || '',
          value: tag.name || '',
        })) || []
      );
    }
  }, [categories, res]);
  // "filename": "",
  //   "mimetype": "",
  //   "url"
  const generateTextImages = (): {
    img: string;
    imgSrc: string[];
    newImages: {
      filename: string;
      mimetype: string;
      url: string;
    }[];
    text: string;
  } => {
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

      const newImages = imageSrcs.filter(
        (src) => !imageList.map((image) => image.url).includes(src)
      );
      const newImageList =
        newImages.map((src) => ({
          filename: `${generateUid()}.${imageTypeFromUrl(src)}`,
          mimetype: `image/${imageTypeFromUrl(src)}`,
          url: src,
        })) || [];

      // remove all new lines from innerHTML
      doc.body.innerHTML = doc.body.innerHTML.replaceAll('&nbsp;', '');

      // remove all new lines from innerText
      doc.body.innerText = doc.body.innerText.replaceAll(/(\r\n|\n|\r)/gm, '');
      const innerText =
        doc.body.innerText.length > 120
          ? `${doc.body.innerText.slice(0, 120)}...`
          : doc.body.innerText;

      setPreviewText(innerText);

      return {
        img: imageSrcs[0] || '',
        imgSrc: imageSrcs,
        newImages: newImageList,
        text: innerText,
      };
    }
    return {
      img: '',
      imgSrc: [],
      newImages: [],
      text: '',
    };
  };

  const imageUploadHandler = (
    blobInfo: { blob: () => Blob | string; filename: () => string | undefined },
    progress: (arg0: number) => void
  ): Promise<string> =>
    new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.withCredentials = false;
      const { imageUpload } = getCustomUrls();

      xhr.open('POST', imageUpload);

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
      const { imageUpload } = getCustomUrls();

      xhr.open('POST', imageUpload);

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
    meta: Record<string, any>,
    pdfOnly?: boolean
  ) => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', pdfOnly ? '.pdf' : 'image/*,.pdf');
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

          const originalFileName = extractFilename(url) || file.name;
          if (meta.filetype === 'file') {
            fileList.push({
              ...file,
              fileName: originalFileName,
              name: file.name,
              uid: id,
              url,
            } as UploadFile);
          }
          if (meta.filetype === 'image') {
            imageList.push({
              ...file,
              name: file.name,
              uid: id,
              url,
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
  const [editArticle] = useEditArticleMutation();

  const onSubmit = async (_data?: FormData, draft?: boolean) => {
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
    const { img, imgSrc, newImages, text } = generateTextImages();
    // const previewImageFile = imageList?.filter(({ url }) => url === img);
    const articleImages =
      imageList?.filter(({ url }) => imgSrc.includes(url || '')) || [];

    const imagesFormatted = [
      ...articleImages.map((item) => ({
        url: {
          filename: item.fileName || item.name || '',
          mimetype: item.type || '',
          url: item.url || '',
        },
      })),
      ...newImages.map((item) => ({
        url: {
          filename: item.filename,
          mimetype: item.mimetype,
          url: item.url,
        },
      })),
    ];

    const htmlWithDefaultWidth = extracted(
      editorRef.current?.getContent() || ''
    );

    const submittedSchemes: string[] = selectedSchemes;

    const variables = {
      data: {
        categories: selectedCategoryIds,
        documents:
          fileList.map((file) => ({
            fileType: file.type || '',
            name: file.name || '',
            origFileName: file.fileName || file.name || '',
            url: file.url || '',
          })) || [],
        draft: draft ?? false,
        groups: selectedGroups,
        htmlBody: htmlWithDefaultWidth || '',
        images: {
          upload:
            imagesFormatted && imagesFormatted.length > 0
              ? imagesFormatted
              : undefined,
        },
        incidents:
          submittedSchemes && submittedSchemes.length > 1
            ? []
            : incidents.map((incident) => incident.incident.id),
        offenders:
          submittedSchemes && submittedSchemes.length > 1
            ? []
            : offenders.map((offender) => offender.id),
        previewImage: img,
        previewText: text,
        priority,
        schemes:
          submittedSchemes && submittedSchemes.length > 1
            ? submittedSchemes.map((scheme) => scheme)
            : [schemeId],
        title: form.getFieldValue('title'),
        watermarkImage: form.getFieldValue('watermarkImage'),
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
    };

    await (articleId
      ? editArticle({
          onCompleted: (resData) => {
            if (resData && resData.editArticle) {
              setSaving(false);
              navigate(`/app/article/view/${resData?.editArticle.id}`);
            }
          },
          onError: () => {
            setSaving(false);
          },
          variables: {
            data: variables.data,
            where: {
              id: articleId,
            },
          },
        })
      : submitArticle({
          onCompleted: (resData) => {
            if (resData && resData.createArticle) {
              setSaving(false);

              navigate(`/app/article/view/${resData?.createArticle.id}`);
            }
          },
          onError: () => {
            setSaving(false);
          },
          variables,
        }));
    setSaving(false);
  };
  const saveDraft = async () => {
    await onSubmit(undefined, true);
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
    customRequest,
    multiple: true,
    onChange: handleChange,
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
    categories,
    categoriesChange,
    categoriesLoading: false,
    data,

    documentUploadProps,
    editorRef,
    fileList,
    filePickerCallback,
    form,
    groups,
    groupsLoading,
    id: articleId,
    imagesUploadHandler: imageUploadHandler,
    incidents,
    initData: initialValue,
    insertIncident,
    insertOffender,
    loading: tagsLoading || loading || saving,
    log: generateTextImages,
    offenders,
    onGroupsChange,
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    onSubmit,
    preview,
    previewImage,
    previewText,
    removeIncident,
    removeOffender,
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    saveDraft,
    selectedCategories,
    selectedGroups,
    selectedSchemes,
    setPreviewImage,
    setPreviewText,
  };
};

export default useCreateEditArticle;
