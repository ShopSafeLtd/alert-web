import type { SelectProps } from 'antd';
import type {
  ViewInvestigationQuery,
  ViewInvestigationQueryVariables,
} from 'graphql/generated';
import {
  Model,
  useCopyEvidenceMutation,
  useCreateTagMutation,
  useTagsQuery,
  ViewInvestigationDocument,
} from 'graphql/generated';
import { useState } from 'react';
import { useStoreState } from 'state';

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
  toggleSearchEvidence: () => void;
  searchEvidence: boolean;
  selectedEvidence: {
    url: string;
  } | null;
  selectEvidence: (evidence: { url: string }) => void;
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
  const [searchEvidence, setSearchEvidence] = useState(false);
  const [selectedEvidence, setSelectedEvidence] = useState<{
    url: string;
  } | null>(null);

  const toggleSearchEvidence = () => {
    setSearchEvidence(!searchEvidence);
  };

  const selectEvidence = (evidence: { url: string }) => {
    setSelectedEvidence(evidence);
  };
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
    // eslint-disable-next-line no-restricted-syntax
    for (const value of values) {
      const found = categories?.find(
        (category) => category.value === value.value
      );
      if (found) {
        formattedValues.push(value.value);
      } else {
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
      }
    }

    setSelectedCategories(formattedValues.map((value) => ({ value })));
  };

  const [createDocument] = useCopyEvidenceMutation({
    onCompleted: () => {
      setSaving(false);
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
        const newDocuments = [result.data.copyEvidenceOnInvestigation];
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

    if (selectedEvidence) {
      createDocument({
        variables: {
          where: {
            id: investigationId,
          },
          data: {
            name: values.name,
            id: selectedEvidence.url,
            tags: selectedCategoryIds,
          },
        },
      });
      onClose();
    }
    setSaving(false);
  };

  return {
    onSubmit,
    saving,
    selectedCategories,
    categories,
    categoriesChange,
    categoriesLoading: tagsLoading,
    selectedEvidence,
    toggleSearchEvidence,
    searchEvidence,
    selectEvidence,
  };
};

export default useAddDocument;
