import type { SelectProps } from 'antd';
import type {
  ViewInvestigationQuery,
  ViewInvestigationQueryVariables,
} from 'graphql/investigations/queries/__generated__/view-investigation.generated';

import { useCreateTagMutation } from '#/graphql/tags/mutations/__generated__/create-tag.generated';
import { useCopyEvidenceMutation } from 'graphql/dem/mutations/__generated__/import-evidence.generated';
import { ViewInvestigationDocument } from 'graphql/investigations/queries/__generated__/view-investigation.generated';
import { useTagsQuery } from 'graphql/tags/queries/__generated__/tags.generated';
import { Model } from 'graphql/types';
import { useState } from 'react';
import { useStoreState } from 'state';

interface OnSubmitValues {
  name: string;
  url: string;
}

interface Props {
  investigationId: string;
  onClose: () => void;
}

interface Return {
  categories: SelectProps['options'];
  categoriesChange: (categories: { value: string }[]) => void;
  categoriesLoading: boolean;
  onSubmit: (values: OnSubmitValues) => void;
  saving: boolean;
  searchEvidence: boolean;
  selectEvidence: (evidence: { url: string }) => void;
  selectedCategories: { value: string }[];
  selectedEvidence: {
    url: string;
  } | null;
  toggleSearchEvidence: () => void;
}

const useAddDocument = ({ investigationId, onClose }: Props): Return => {
  const currentScheme = useStoreState((state) => state.scheme.id);
  const userId = useStoreState((state) => state.user.id);
  const [saving, setSaving] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<
    { value: string }[]
  >([]);
  const [categories, setCategories] = useState<SelectProps['options']>([]);
  const [categoryIds, setCategoryIds] = useState<
    { id: string; value: string }[]
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
        label: result.createTag.name,
        value: result.createTag.name,
      };
      const newCategoryIds = {
        id: result.createTag.id,
        value: result.createTag.name,
      };
      setCategoryIds([...(categoryIds as []), newCategoryIds]);
      setCategories([...(categories as []), newCategory]);
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
      void createDocument({
        variables: {
          data: {
            id: selectedEvidence.url,
            name: values.name,
            tags: selectedCategoryIds,
          },
          where: {
            id: investigationId,
          },
        },
      });
      onClose();
    }
    setSaving(false);
  };

  return {
    categories,
    categoriesChange,
    categoriesLoading: tagsLoading,
    onSubmit,
    saving,
    searchEvidence,
    selectEvidence,
    selectedCategories,
    selectedEvidence,
    toggleSearchEvidence,
  };
};

export default useAddDocument;
