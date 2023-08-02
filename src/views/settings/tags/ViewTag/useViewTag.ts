/* eslint-disable no-restricted-syntax */
import { useEffect, useState } from 'react';
import type { ViewTagQuery } from 'graphql/generated';
import {
  IncidentFormField,
  Model,
  TagType,
  useRemoveQuestionFromTagMutation,
  useUpdateTagMutation,
  useUpdateTagQsMutation,
  useUpsertIncidentFormMutation,
  useViewTagQuery,
} from 'graphql/generated';
import type { Scheme } from 'state';
import { useStoreState } from 'state';
import { useParams } from 'react-router-dom';
import type { ExtendedLayout } from '../../../reports/types';

interface FieldToLayoutMap {
  [key: string]: IncidentFormField[];
}

export type IncidentFormFieldState = {
  [key in IncidentFormField]: boolean;
};

interface Return {
  saving: boolean;
  userSchemes: Scheme[];
  schemeId: string;
  toggleAddQuestion: () => void;
  addQuestion: boolean;
  loading: boolean;
  data: ViewTagQuery | undefined;
  questionsLayout: ExtendedLayout[];
  setQuestionsLayout: (value: ExtendedLayout[]) => void;
  setQuestionLayoutChanged: (value: boolean) => void;
  questionLayoutChanged: boolean;
  saveQOrder: () => void;
  parentTag: string | undefined | null;
  setParentTag: (value: string) => void;
  updateTagParent: (tagId: string, parentTagId: string | null) => void;
  deleteQuestion: (questionId: string) => void;
  incidentFormLayout: ExtendedLayout[];
  setIncidentFormLayout: (value: ExtendedLayout[]) => void;
  setIncidentFormLayoutChanged: (value: boolean) => void;
  toggleField: (field: IncidentFormField) => void;
  incidentFormFields: IncidentFormFieldState;
  incidentFormLayoutChanged: boolean;
  saveIncidentForm: () => void;
}

const fieldToLayoutSet: Record<string, IncidentFormField[]> = {
  tags: [
    IncidentFormField.Types,
    IncidentFormField.Impact,
    IncidentFormField.Involved,
  ],
  when: [IncidentFormField.Where],
  goods: [IncidentFormField.Goods],
  profiles: [IncidentFormField.Offenders, IncidentFormField.Images],
  police: [IncidentFormField.Police, IncidentFormField.Details],
  groups: [IncidentFormField.Groups],
  custom: [IncidentFormField.Custom],
};
export type FieldLayout =
  | 'tags'
  | 'when'
  | 'goods'
  | 'profiles'
  | 'police'
  | 'groups'
  | 'custom';

export type Elements = {
  [K in FieldLayout]?: JSX.Element;
};
const useViewTag = (): Return => {
  const defaultIncidentFormLayout = [
    {
      w: 1,
      h: 4.3,
      x: 0,
      y: 0,
      i: 'tags',
      moved: false,
      static: false,
    },
    {
      w: 1,
      h: 3,
      x: 0,
      y: 1,
      i: 'when',
      moved: false,
      static: false,
    },
    {
      w: 1,
      h: 3,
      x: 0,
      y: 2,
      i: 'goods',
      moved: false,
      static: false,
    },
    {
      w: 1,
      h: 3.8,
      x: 0,
      y: 3,
      i: 'profiles',
      moved: false,
      static: false,
    },
    {
      w: 1,
      h: 3.8,
      x: 0,
      y: 4,
      i: 'police',
      moved: false,
      static: false,
    },
    {
      w: 1,
      h: 3,
      x: 0,
      y: 5,
      i: 'groups',
      moved: false,
      static: false,
    },
    {
      w: 1,
      h: 3,
      x: 0,
      y: 6,
      i: 'custom',
      moved: false,
      static: false,
    },
  ];

  function getOrderedKeys(
    fieldToLayout: FieldToLayoutMap,
    sortedArray: IncidentFormField[]
  ): string[] {
    const orderedKeys: string[] = [];

    for (const field of sortedArray) {
      for (const [key, fieldsArray] of Object.entries(fieldToLayout)) {
        if (fieldsArray.includes(field) && !orderedKeys.includes(key)) {
          orderedKeys.push(key);
        }
      }
    }

    return orderedKeys;
  }

  const defaultIncidentFormFieldsTrue: IncidentFormFieldState = {
    [IncidentFormField.Custom]: true,
    [IncidentFormField.Details]: true,
    [IncidentFormField.Goods]: true,
    [IncidentFormField.Groups]: true,
    [IncidentFormField.Images]: true,
    [IncidentFormField.Impact]: true,
    [IncidentFormField.Involved]: true,
    [IncidentFormField.Offenders]: true,
    [IncidentFormField.Police]: true,
    [IncidentFormField.Types]: true,
    [IncidentFormField.Where]: true,
  };

  const { id } = useParams();
  const schemeId = useStoreState((state) => state.scheme.id);
  const userSchemes = useStoreState((state) => state.user.schemes);
  const [saving] = useState(false);
  const [addQuestion, setAddQuestion] = useState(false);
  const [questionLayoutChanged, setQuestionLayoutChanged] = useState(false);
  const [questionsLayout, setQuestionsLayout] = useState<ExtendedLayout[]>([]);
  const [parentTag, setPTag] = useState<string | undefined | null>(undefined);
  const [incidentFormLayout, setIncidentFormLayout] = useState<
    ExtendedLayout[]
  >(defaultIncidentFormLayout);
  const [incidentFormLayoutChanged, setIncidentFormLayoutChanged] =
    useState(false);
  const [incidentFormFields, setIncidentFormFields] =
    useState<IncidentFormFieldState>(defaultIncidentFormFieldsTrue);
  const { data, loading, refetch } = useViewTagQuery({
    variables: {
      where: {
        id: id || '',
      },
      tagQuestionsWhere: {
        deleted: {
          equals: false,
        },
      },
      listWhere: {
        type: {
          equals: TagType.IncidentCrimeType,
        },
        dataType: {
          equals: Model.Incident,
        },
        schemes: {
          some: {
            id: {
              equals: schemeId,
            },
          },
        },
      },
    },
  });

  useEffect(() => {
    if (data && data.tag?.tagQuestions) {
      // eslint-disable-next-line no-unsafe-optional-chaining
      const dataQs = [...data?.tag?.tagQuestions].filter(Boolean) || [];
      const qs = dataQs
        .sort((a, b) => b.priority - a.priority)
        .map((q, index) => ({
          w: 1,
          h: 1,
          x: 0,
          y: index,
          i: q.id,
          minW: 1,
          minH: 1,
          maxW: 1,
          maxH: 1,
          moved: false,
          static: false,
        }));
      setQuestionsLayout(qs || []);
      setQuestionLayoutChanged(false);
      setPTag(data?.tag?.parentTag?.id || null);
    }
    if (data && data.tag?.incidentForm) {
      const iFormFields = [...data.tag.incidentForm.fields];
      const sortedArray = iFormFields.sort((a, b) => b.position - a.position);
      const fieldsAndOrder = sortedArray.map((f) => ({
        [f.type]: true,
      })) as {
        [key in IncidentFormField]: boolean;
      }[];

      const merged: IncidentFormFieldState = Object.values(
        IncidentFormField
        // eslint-disable-next-line unicorn/no-array-reduce
      ).reduce((acc, field) => {
        acc[field] = fieldsAndOrder.find((f) => f[field])?.[field] || false;
        return acc;
      }, {} as IncidentFormFieldState);

      setIncidentFormFields(merged);

      const formattedSort = sortedArray.map((f) => f.type);
      const newIncidentFormLayout = getOrderedKeys(
        fieldToLayoutSet,
        formattedSort
      );

      const initialLayout = newIncidentFormLayout.map((i, index) => ({
        ...(defaultIncidentFormLayout.find((l) => l.i === i) as ExtendedLayout),
        y: index,
      }));

      const highestY = Math.max(...initialLayout.map((l) => l.y));
      const newFields = defaultIncidentFormLayout
        .filter((l) => !initialLayout.some((il) => il.i === l.i))
        .map((l, index) => ({
          ...l,
          y: highestY + 1 + index,
        }));
      setIncidentFormLayout([...initialLayout, ...newFields]);
    }
  }, [data]);

  const toggleAddQuestion = () => {
    if (addQuestion) {
      void refetch();
    }
    setAddQuestion((prev) => !prev);
  };

  const [updateOrderQs] = useUpdateTagQsMutation();

  const saveQOrder = () => {
    setQuestionLayoutChanged(false);
    const tagQs = questionsLayout.map((q, index) => ({
      id: q.i,
      position: 1000 - index,
      req: data?.tag?.tagQuestions?.find((tq) => tq.id === q.i)?.req || false,
    }));
    void updateOrderQs({
      variables: {
        data: {
          tags: tagQs,
        },
      },
    });
  };

  const [updateTag] = useUpdateTagMutation();

  const setParentTag = (value: string) => {
    setPTag(value);
    void updateTag({
      variables: {
        where: {
          id: id || '',
        },
        data: {
          parentTag: {
            connect: {
              id: value,
            },
          },
        },
      },
    });
  };

  const updateTagParent = (tagId: string, parentTagId: string | null) => {
    if (tagId === id) setPTag(parentTagId);
    if (parentTagId) {
      void updateTag({
        variables: {
          where: {
            id: tagId,
          },
          data: {
            parentTag: {
              connect: {
                id: parentTagId,
              },
            },
          },
        },
      });
    } else {
      void updateTag({
        variables: {
          where: {
            id: tagId,
          },
          data: {
            parentTag: {
              disconnect: true,
            },
          },
        },
      });
    }
  };

  const [deleteTagq] = useRemoveQuestionFromTagMutation();

  const deleteQuestion = (questionId: string) => {
    void deleteTagq({
      variables: {
        where: {
          id: questionId,
        },
      },
    });
    const tagQs = questionsLayout.filter((q) => q.i !== questionId);
    setQuestionsLayout(tagQs);
  };

  const toggleField = (fieldToUpdate: IncidentFormField) => {
    if (!incidentFormLayoutChanged) {
      setIncidentFormLayoutChanged(true);
    }

    setIncidentFormFields((prevState) => ({
      ...prevState,
      [fieldToUpdate]: !prevState[fieldToUpdate],
    }));
  };

  const [saveIncidentFormLayout] = useUpsertIncidentFormMutation();

  const saveIncidentForm = () => {
    const positions = incidentFormLayout.map((l) => l.i);

    const getTypeArray = positions
      .flatMap((key) => fieldToLayoutSet[key].map((t) => ({ type: t })))
      .filter((item) => incidentFormFields[item.type]);

    void saveIncidentFormLayout({
      variables: {
        data: {
          tagId: id || '',
          formFields: getTypeArray.map((t, index) => ({
            type: t.type,
            position: 1000 - index,
          })),
        },
      },
    });
    setIncidentFormLayoutChanged(false);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return {
    toggleField,
    setIncidentFormLayoutChanged,
    incidentFormFields,
    parentTag,
    setParentTag,
    saveQOrder,
    saving,
    schemeId,
    userSchemes,
    toggleAddQuestion,
    addQuestion,
    data,
    loading,
    questionsLayout,
    setQuestionsLayout,
    setQuestionLayoutChanged,
    questionLayoutChanged,
    updateTagParent,
    deleteQuestion,
    incidentFormLayout,
    incidentFormLayoutChanged,
    setIncidentFormLayout,
    saveIncidentForm,
  };
};
export default useViewTag;
