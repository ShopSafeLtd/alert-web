import { SelectProps, UploadProps } from 'antd';
import {
  Model,
  useCreateDocumentOnInvestigationMutation,
  useCreateTagMutation,
  useTagsQuery,
  ViewInvestigationDocument,
  ViewInvestigationQuery,
  ViewInvestigationQueryVariables,
} from 'graphql/generated';
import { useState } from 'react';
import { useStoreState } from 'state';
import { UploadFile } from 'antd/es/upload/interface';

interface OnSubmitValues {
  name: string;
  url: string;
}

interface Props {
  onClose: () => void;
  investigationId: string;
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

const useAddDocument = ({ onClose, investigationId }: Props): Return => {
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
    },
  });

  const { loading: tagsLoading } = useTagsQuery({
    variables: {
      where: {
        scheme: {
          id: {
            equals: currentScheme,
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
                  id: currentScheme,
                },
              },
              dataType: Model.Document,
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

  const [createDocument] = useCreateDocumentOnInvestigationMutation({
    onCompleted: () => {
      setSaving(false);
      console.log('Document created');
      onClose();
    },
    update: (store, result) => {
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
        const newDocuments = [result.data.createDocumentOnInvestigation];
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
    },
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
      createDocument({
        variables: {
          where: {
            id: investigationId,
          },
          data: {
            name: values.name,
            url: fileList[0].url || '',
            tags: selectedCategoryIds,
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
      }
      return file;
    });

    setFileList(newFileList);
  };

  const documentUploadProps: UploadProps = {
    action: import.meta.env.VITE_APP_IMAGE_UPLOAD_ENDPOINT,
    onChange: handleChange,
    multiple: false,
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
