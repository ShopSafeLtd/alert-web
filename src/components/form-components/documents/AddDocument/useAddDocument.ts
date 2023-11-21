/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access */
import type { SelectProps, UploadProps } from 'antd';
import type {
  CreateDocumentMutation,
  ListDocumentsOnSchemeQuery,
  ListDocumentsOnSchemeQueryVariables,
  ViewInvestigationQuery,
  ViewInvestigationQueryVariables,
} from 'graphql/generated';
import {
  ListDocumentsOnSchemeDocument,
  Model,
  useCreateDocumentMutation,
  useCreateTagMutation,
  useTagsQuery,
  ViewInvestigationDocument,
} from 'graphql/generated';
import { useState } from 'react';
import { useStoreState } from 'state';
import type { UploadFile } from 'antd/es/upload/interface';
import type { MutationUpdaterFn } from '@apollo/client';
import customRequest from '../../../../utils/custom-request';

interface OnSubmitValues {
  name: string;
  url: string;
}

interface Props {
  onClose: () => void;
  investigationId?: string | null;
  incidentId?: string | null;
  offenderId?: string | null;
  vehicleId?: string | null;
  crimeGroupId?: string | null;
  update?: MutationUpdaterFn<CreateDocumentMutation> | undefined;
}

interface Return {
  onSubmit: (values: OnSubmitValues) => void;
  saving: boolean;
  categories: SelectProps['options'];
  categoriesLoading: boolean;
  selectedCategories: { value: string }[];
  categoriesChange: (categories: { value: string }[]) => void;
  documentUploadProps: UploadProps;
}

const useAddDocument = ({
  onClose,
  offenderId,
  incidentId,
  investigationId,
  vehicleId,
  crimeGroupId,
  update,
}: Props): Return => {
  const currentScheme = useStoreState((state) => state.scheme.id);
  const userId = useStoreState((state) => state.user.id);
  const [saving, setSaving] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<
    { value: string }[]
  >([]);
  const [categories, setCategories] = useState<SelectProps['options']>([]);
  const [categoryIds, setCategoryIds] = useState<
    { value: string; id: string }[]
  >([]);

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
      setSelectedCategories([...(<[]>selectedCategories), newCategory]);
    },
  });

  const { loading: tagsLoading } = useTagsQuery({
    variables: {
      where: {
        schemes: {
          some: {
            id: {
              in: [currentScheme],
            },
          },
        },
        dataType: {
          equals: Model.Document,
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
                    id: currentScheme,
                  },
                ],
              },
              dataType: Model.Document,
            },
          },
        }).then((result) => {
          formattedValues.push(result.data?.createTag?.name || '');
        });
      }
    }

    setSelectedCategories(formattedValues.map((value) => ({ value })));
  };

  const [createDocument] = useCreateDocumentMutation({
    onCompleted: () => {
      setSaving(false);
      onClose();
    },

    update:
      update ||
      ((store, result) => {
        if (!investigationId) {
          const existingData = store.readQuery<
            ListDocumentsOnSchemeQuery,
            ListDocumentsOnSchemeQueryVariables
          >({
            query: ListDocumentsOnSchemeDocument,
            variables: {
              where: {
                id: currentScheme,
              },
            },
          });
          if (existingData && result.data) {
            const oldDocuments = existingData?.scheme?.documents || [];
            const newDocuments = [result.data.createDocument];
            store.writeQuery<
              ListDocumentsOnSchemeQuery,
              ListDocumentsOnSchemeQueryVariables
            >({
              query: ListDocumentsOnSchemeDocument,
              variables: {
                where: {
                  id: currentScheme,
                },
              },
              data: {
                scheme: {
                  ...existingData.scheme,
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  documents: [...oldDocuments, ...newDocuments],
                },
              },
            });
          }
        } else if (investigationId) {
          const existingData = store.readQuery<
            ViewInvestigationQuery,
            ViewInvestigationQueryVariables
          >({
            query: ViewInvestigationDocument,
            variables: {
              where: {
                id: investigationId,
              },
            },
          });
          if (existingData && result.data) {
            const oldDocuments = existingData?.investigation?.documents || [];
            const newDocuments = [result.data.createDocument];
            store.writeQuery<
              ViewInvestigationQuery,
              ViewInvestigationQueryVariables
            >({
              query: ViewInvestigationDocument,
              variables: {
                where: {
                  id: investigationId,
                },
              },
              data: {
                investigation: {
                  ...existingData.investigation,
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  documents: [...oldDocuments, ...newDocuments],
                },
              },
            });
          }
        }
      }),
  });
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const onSubmit = (values: OnSubmitValues) => {
    setSaving(true);

    const selectedCategoryIds = selectedCategories
      .map((category) => {
        const selectedCategory = categoryIds.find(
          (cat) => cat.value === category.value
        );
        return selectedCategory?.id;
      })
      .map((id) => id || '');

    if (fileList[0].url) {
      void createDocument({
        variables: {
          data: {
            investigationId: investigationId || null,
            incidentId: incidentId || null,
            offenderId: offenderId || null,
            vehicleId: vehicleId || null,
            crimeGroupId: crimeGroupId || null,
            schemeId:
              investigationId ||
              offenderId ||
              incidentId ||
              vehicleId ||
              crimeGroupId
                ? undefined
                : currentScheme,
            name: values.name,
            url: fileList[0].url || '',
            tags: selectedCategoryIds,
            fileType: fileList[0].type || '',
            origFileName: fileList[0].fileName || '',
          },
        },
      });
      onClose();
    }
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
    console.log('fi', fileList);
  };

  const documentUploadProps: UploadProps = {
    customRequest,
    onChange: handleChange,
    multiple: false,
    headers: {
      type: 'pdf',
    },
  };

  return {
    onSubmit,
    saving,
    selectedCategories,
    categories,
    categoriesChange,
    categoriesLoading: tagsLoading,
    documentUploadProps,
  };
};

export default useAddDocument;
