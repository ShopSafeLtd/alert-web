/* eslint-disable no-restricted-syntax */
import { useEffect, useState } from 'react';
import type { Scheme } from 'state';
import { useStoreState } from 'state';
import { useParams } from 'react-router-dom';
import { useApolloClient } from '@apollo/client';
import { Modal, notification } from 'antd';
import { useIntl } from 'react-intl';
import errorNotification from 'types/mutation_notifications/error_notification';
import type { ExtendedLayout } from '#/views/reports/types';
import type { AnswerType } from 'graphql/types';
import { IncidentFormField, Model, TagType } from 'graphql/types';
import type { ViewTagQuery } from '#/views/settings/tags/ViewTag/graphql/view-tag.generated';
import {
  useViewTagQuery,
  ViewTagDocument,
} from '#/views/settings/tags/ViewTag/graphql/view-tag.generated';
import { useUpdateTagQsMutation } from '#/views/settings/tags/ViewTag/graphql/update-question-order.generated';
import { useUpdateTagMutation } from 'graphql/tag/mutation/update_tag.generated';
import { useRemoveQuestionFromTagMutation } from '#/views/settings/tags/ViewTag/graphql/remove-question.generated';
import { useUpsertIncidentFormMutation } from '#/views/settings/tags/ViewTag/graphql/update-incident-form-fields.generated';
import { useRecycleTagMutation } from 'graphql/tag/mutation/recycle-tag.generated';

const { confirm } = Modal;

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
  updateQuestionOnTag: (
    question: string,
    tagId: string,
    dependentOn?: {
      tagQuestionId: string;
      questionId: string;
      answer: string;
    }
  ) => void;
  selectedQuestion: string | null;
  setSelectedQuestion: (value: string | null) => void;
  editIncidentType: string;
  setEditIncidentType: (value: string) => void;
  deleteConfirm: (value: string) => void;
}

const fieldToLayoutSet: Record<string, IncidentFormField[]> = {
  tags: [
    IncidentFormField.Types,
    IncidentFormField.Impact,
    IncidentFormField.Involved,
  ],
  when: [IncidentFormField.Where],
  goods: [IncidentFormField.Goods],
  images: [IncidentFormField.Images],
  profiles: [
    IncidentFormField.Offenders,
    IncidentFormField.Vehicles,
    IncidentFormField.Victims,
    IncidentFormField.Witnesses,
  ],
  police: [IncidentFormField.Police, IncidentFormField.Details],
  groups: [IncidentFormField.Groups],
  custom: [IncidentFormField.Custom],
  cctv: [IncidentFormField.Cctv],
};
export type FieldLayout =
  | 'tags'
  | 'when'
  | 'goods'
  | 'images'
  | 'profiles'
  | 'police'
  | 'groups'
  | 'cctv'
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
      static: true,
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
      h: 5,
      x: 0,
      y: 3,
      i: 'profiles',
      moved: false,
      static: false,
    },
    {
      w: 1,
      h: 3,
      x: 0,
      y: 4,
      i: 'images',
      moved: false,
      static: false,
    },
    {
      w: 1,
      h: 3.8,
      x: 0,
      y: 5,
      i: 'police',
      moved: false,
      static: false,
    },
    {
      w: 1,
      h: 3,
      x: 0,
      y: 6,
      i: 'groups',
      moved: false,
      static: false,
    },
    {
      w: 1,
      h: 3,
      x: 0,
      y: 7,
      i: 'custom',
      moved: false,
      static: false,
    },
    {
      w: 1,
      h: 3,
      x: 0,
      y: 8,
      i: 'cctv',
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
    [IncidentFormField.Cctv]: false,
    [IncidentFormField.Vehicles]: false,
    [IncidentFormField.Victims]: false,
    [IncidentFormField.Witnesses]: false,
  };

  const { id } = useParams();
  const intl = useIntl();

  const schemeId = useStoreState((state) => state.scheme.id);
  const schemeName = useStoreState((state) => state.scheme.name);
  const userSchemes = useStoreState((state) => state.user.schemes);
  const [addQuestion, setAddQuestion] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editIncidentType, setEditIncidentType] = useState('');
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

  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
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
    const tagQs = questionsLayout
      .sort((a, b) => a.y - b.y)
      .map((q, index) => ({
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

  const checkTag = (tagId: string, parentTagId: string) => {
    // get all children of the tag
    const children = data?.listTags?.tags.filter(
      (tag) => tag?.parentTag?.id === tagId
    );
    // if there are no children, return true
    if (!children) return true;
    // if there are children, check each child
    // eslint-disable-next-line no-restricted-syntax
    for (const child of children) {
      // if the parentTagId is the same as the tagId, return false
      if (child?.id === parentTagId) return false;
      // if the parentTagId is not the same as the tagId, check the children of the child
      if (!checkTag(child?.id, parentTagId)) return false;
    }
    return true;
  };

  const setParentTag = (value: string) => {
    if (checkTag(id ?? '', value)) {
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
    }
  };

  const updateTagParent = (tagId: string, parentTagId: string | null) => {
    if (tagId === id) setPTag(parentTagId);
    if (parentTagId) {
      if (checkTag(tagId, parentTagId))
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
              // ???
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
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
      update: (cache, result) => {
        const existingData = cache.readQuery<ViewTagQuery>({
          query: ViewTagDocument,
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

        if (!existingData || !existingData.tag) return;
        cache.writeQuery<ViewTagQuery>({
          query: ViewTagDocument,
          data: {
            ...existingData,
            tag: {
              ...existingData.tag,
              tagQuestions: existingData.tag?.tagQuestions?.filter(
                (tq) => tq.id !== result.data?.removeQuestionFromTag?.id
              ),
            },
          },
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
      },
    });
    const tagQs = questionsLayout.filter((q) => q.i !== questionId);
    setQuestionsLayout(tagQs);
  };

  const apolloStore = useApolloClient();

  const updateQuestionOnTag = (
    question: string,
    qId: string,
    dependentOn?: {
      tagQuestionId: string;
      questionId: string;
      answer: string;
    }
  ) => {
    const existingData = apolloStore.readQuery<ViewTagQuery>({
      query: ViewTagDocument,
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

    if (!existingData || !existingData.tag) return;

    const updatedQs = existingData.tag?.tagQuestions?.map((tq) => {
      if (tq.question.id === qId) {
        return {
          ...tq,
          dependentQuestions: dependentOn ? [dependentOn] : [],
          question: {
            ...tq.question,
            questionFormatted: question,
          },
        };
      }
      return tq;
    }) as Array<{
      __typename?: 'TagQuestion';
      req: boolean;
      priority: number;
      id: string;
      dependentQuestions: Array<never>;
      question: {
        __typename?: 'Question';
        questionFormatted: string;
        id: string;
        type: AnswerType;
      };
    }>;

    apolloStore.writeQuery<ViewTagQuery>({
      query: ViewTagDocument,
      data: {
        ...existingData,
        tag: {
          ...existingData.tag,
          tagQuestions: updatedQs,
        },
      },
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
    const positions = incidentFormLayout
      .sort((a, b) => a.y - b.y)
      .map((l) => l.i);

    const getTypeArray = positions
      .flatMap((key) => fieldToLayoutSet[key].map((t) => ({ type: t })))
      .filter((item) => incidentFormFields[item.type]);

    // move tags to the top

    const movedTop = getTypeArray.filter(
      (t) => t.type === IncidentFormField.Types
    );
    const rest = getTypeArray.filter((t) => t.type !== IncidentFormField.Types);
    const getTypeArrayWithTagsFirst = [...movedTop, ...rest];

    void saveIncidentFormLayout({
      variables: {
        data: {
          tagId: id || '',
          formFields: getTypeArrayWithTagsFirst.map((t, index) => ({
            type: t.type,
            position: 1000 - index,
          })),
        },
      },
    });
    setIncidentFormLayoutChanged(false);
  };

  const [recycleTag] = useRecycleTagMutation({
    onCompleted: () => {
      setSaving(false);
      window.history.back();
      notification.success({
        message: intl.formatMessage({
          defaultMessage: 'Successfully Removed',
        }),
        description: intl.formatMessage(
          {
            defaultMessage:
              'The incident type has been removed from {schemeName}',
          },
          { schemeName }
        ),
        placement: 'bottomRight',
      });
    },
    onError: () => {
      setSaving(false);
      errorNotification();
    },
  });

  const openDelete = (currentId: string) => {
    setSaving(true);
    if (currentId)
      void recycleTag({
        variables: {
          where: {
            id: currentId,
          },
        },
      }).finally(() => setSaving(false));
  };

  const deleteConfirm = (currentId: string) => {
    confirm({
      title: intl.formatMessage({
        defaultMessage: 'Are you sure?',
      }),
      content: intl.formatMessage({
        defaultMessage:
          'This will remove this incident type from this scheme, bu not any other schemes you may have added it to.',
      }),

      onOk() {
        openDelete(currentId);
      },
    });
  };

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
    updateQuestionOnTag,
    selectedQuestion,
    setSelectedQuestion,
    deleteConfirm,
    editIncidentType,
    setEditIncidentType,
  };
};
export default useViewTag;
