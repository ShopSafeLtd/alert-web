/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access */
import type { CreateDocumentsMutation } from '#/graphql/documents/mutations/__generated__/create-documents.generated';
import type { MutationUpdaterFn } from '@apollo/client';
import type { SelectProps, UploadProps } from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';
import type {
  ListDocumentsOnSchemeQuery,
  ListDocumentsOnSchemeQueryVariables,
} from 'graphql/documents/queries/__generated__/list-documents.generated';
import type {
  ViewInvestigationQuery,
  ViewInvestigationQueryVariables,
} from 'graphql/investigations/queries/__generated__/view-investigation.generated';

import { useCreateDocumentsMutation } from '#/graphql/documents/mutations/__generated__/create-documents.generated';
import { useCreateTagMutation } from '#/graphql/tags/mutations/__generated__/create-tag.generated';
import { userIdAtom } from '#/providers/UserProvider/UserProvider';
import { ListDocumentsOnSchemeDocument } from 'graphql/documents/queries/__generated__/list-documents.generated';
import { ViewInvestigationDocument } from 'graphql/investigations/queries/__generated__/view-investigation.generated';
import { useTagsQuery } from 'graphql/tags/queries/__generated__/tags.generated';
import { DocumentType, Model } from 'graphql/types';
import { useAtomValue } from 'jotai/index';
import { useState } from 'react';
import { useStoreState } from 'state';

import customRequest from '../../../../utils/custom-request';

interface Props {
  crimeGroupId?: null | string;
  incidentId?: null | string;
  investigationId?: null | string;
  isEvidence?: boolean;
  offenderId?: null | string;
  onClose: () => void;
  update?: MutationUpdaterFn<CreateDocumentsMutation> | undefined;
  vehicleId?: null | string;
}

interface Return {
  categories: SelectProps['options'];
  categoriesChange: (categories: { value: string }[]) => void;
  categoriesLoading: boolean;
  documentUploadProps: UploadProps;
  onSubmit: () => void;
  saving: boolean;
  selectedCategories: { value: string }[];
}

const useAddDocument = ({
  crimeGroupId,
  incidentId,
  investigationId,
  isEvidence,
  offenderId,
  onClose,
  update,
  vehicleId,
}: Props): Return => {
  const currentScheme = useStoreState((state) => state.scheme.id);
  const userId = useAtomValue(userIdAtom);
  const [saving, setSaving] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<
    { value: string }[]
  >([]);
  const [categories, setCategories] = useState<SelectProps['options']>([]);
  const [categoryIds, setCategoryIds] = useState<
    { id: string; value: string }[]
  >([]);

  const [createTag] = useCreateTagMutation({
    onCompleted: (result) => {
      const newCategory = {
        label: result.createTag.name,
        value: result.createTag.name,
      };
      const newCategoryIds = {
        id: result.createTag.id,
        value: result.createTag.name,
      };
      setCategoryIds([...(categoryIds as []), newCategoryIds]);
      setCategories([...(categories as []), newCategory]);
      setSelectedCategories([...(selectedCategories as []), newCategory]);
    },
  });

  const { loading: tagsLoading } = useTagsQuery({
    fetchPolicy: 'cache-and-network',
    onCompleted: (result) => {
      const categoriesFormatted = result.tags.map((tag) => ({
        label: tag.name,
        value: tag.name,
      }));
      const categoryIdsFormatted = result.tags.map((tag) => ({
        id: tag.id,
        value: tag.name,
      }));
      setCategoryIds(categoryIdsFormatted);
      setCategories(categoriesFormatted);
    },

    variables: {
      where: {
        dataType: {
          equals: Model.Document,
        },
        schemes: {
          some: {
            id: {
              in: [currentScheme],
            },
          },
        },
      },
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
              createdBy: {
                connect: {
                  id: userId,
                },
              },
              dataType: Model.Document,
              description: '',
              name: value.value,
              schemes: {
                connect: [
                  {
                    id: currentScheme,
                  },
                ],
              },
            },
          },
        }).then((result) => {
          formattedValues.push(result.data?.createTag?.name || '');
        });
      }
    }

    setSelectedCategories(formattedValues.map((value) => ({ value })));
  };

  const [createDocuments] = useCreateDocumentsMutation({
    onCompleted: () => {
      setSaving(false);
      onClose();
    },
    update:
      update ||
      ((store, result) => {
        if (result === null || result === undefined) return;
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
            const newDocuments = result.data.createDocuments;
            store.writeQuery<
              ListDocumentsOnSchemeQuery,
              ListDocumentsOnSchemeQueryVariables
            >({
              data: {
                scheme: {
                  ...existingData.scheme,
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  documents: [...oldDocuments, ...newDocuments],
                },
              },
              query: ListDocumentsOnSchemeDocument,
              variables: {
                where: {
                  id: currentScheme,
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
            const newDocuments = result.data.createDocuments;
            store.writeQuery<
              ViewInvestigationQuery,
              ViewInvestigationQueryVariables
            >({
              data: {
                investigation: {
                  ...existingData.investigation,
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  documents: [...oldDocuments, ...newDocuments],
                },
              },
              query: ViewInvestigationDocument,
              variables: {
                where: {
                  id: investigationId,
                },
              },
            });
          }
        }
      }),
  });
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const onSubmit = () => {
    setSaving(true);

    const selectedCategoryIds = selectedCategories
      .map((category) => {
        const selectedCategory = categoryIds.find(
          (cat) => cat.value === category.value
        );
        return selectedCategory?.id;
      })
      .map((id) => id || '');

    if (fileList && fileList.length > 0) {
      void createDocuments({
        variables: {
          data: {
            crimeGroupId: crimeGroupId || null,
            documents: fileList.map((file) => ({
              fileType: file.type || '',
              name: file.name,
              origFileName: file.fileName || '',
              url: file.url || '',
            })),
            incidentId: incidentId || null,
            investigationId: investigationId || null,
            offenderId: offenderId || null,
            schemeId:
              investigationId ||
              offenderId ||
              incidentId ||
              vehicleId ||
              crimeGroupId
                ? undefined
                : currentScheme,
            tags: selectedCategoryIds,
            type: isEvidence ? DocumentType.Evidence : undefined,
            vehicleId: vehicleId || null,
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
  };

  const documentUploadProps: UploadProps = {
    customRequest,
    headers: {
      type: 'pdf',
    },
    multiple: false,
    onChange: handleChange,
  };

  return {
    categories,
    categoriesChange,
    categoriesLoading: tagsLoading,
    documentUploadProps,
    onSubmit,
    saving,
    selectedCategories,
  };
};

export default useAddDocument;
