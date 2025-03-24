/* eslint-disable no-restricted-syntax */
import type { ExtendedLayout } from '#/views/reports/types';
import type { ViewTagQuery } from '#/views/settings/tags/ViewTag/graphql/__generated__/view-tag.generated';
import type { AnswerType } from 'graphql/types';

import {
  currentSchemeAtom,
  currentSchemeIdAtom,
} from '#/providers/SchemeProvider/SchemeProvider';
import { useRemoveQuestionFromTagMutation } from '#/views/settings/tags/ViewTag/graphql/__generated__/remove-question.generated';
import { useUpsertIncidentFormMutation } from '#/views/settings/tags/ViewTag/graphql/__generated__/update-incident-form-fields.generated';
import { useUpdateTagQsMutation } from '#/views/settings/tags/ViewTag/graphql/__generated__/update-question-order.generated';
import {
  ViewTagDocument,
  useViewTagQuery,
} from '#/views/settings/tags/ViewTag/graphql/__generated__/view-tag.generated';
import { useApolloClient } from '@apollo/client';
import { Modal, notification } from 'antd';
import { useRecycleTagMutation } from 'graphql/tag/mutation/__generated__/recycle-tag.generated';
import { useUpdateTagMutation } from 'graphql/tag/mutation/__generated__/update_tag.generated';
import { IncidentFormField, Model, TagType } from 'graphql/types';
import { useAtomValue } from 'jotai/index';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';
import errorNotification from 'types/mutation_notifications/error_notification';

const { confirm } = Modal;

interface FieldToLayoutMap {
  [key: string]: IncidentFormField[];
}

export type IncidentFormFieldState = {
  [key in IncidentFormField]: boolean;
};

interface Return {
  addQuestion: boolean;
  data: ViewTagQuery | undefined;
  deleteConfirm: (value: string) => void;
  deleteQuestion: (questionId: string) => void;
  editIncidentType: string;
  incidentFormFields: IncidentFormFieldState;
  incidentFormLayout: ExtendedLayout[];
  incidentFormLayoutChanged: boolean;
  loading: boolean;
  parentTag: null | string | undefined;
  questionLayoutChanged: boolean;
  questionsLayout: ExtendedLayout[];
  saveIncidentForm: () => void;
  saveQOrder: () => void;
  saving: boolean;
  schemeId: string;
  selectedQuestion: null | string;
  setEditIncidentType: (value: string) => void;
  setIncidentFormLayout: (value: ExtendedLayout[]) => void;
  setIncidentFormLayoutChanged: (value: boolean) => void;
  setParentTag: (value: string) => void;
  setQuestionLayoutChanged: (value: boolean) => void;
  setQuestionsLayout: (value: ExtendedLayout[]) => void;
  setSelectedQuestion: (value: null | string) => void;
  toggleAddQuestion: () => void;
  toggleField: (field: IncidentFormField) => void;
  updateQuestionOnTag: (
    question: string,
    tagId: string,
    dependentOn?: {
      answer: string;
      questionId: string;
      tagQuestionId: string;
    }
  ) => void;
  updateTagParent: (tagId: string, parentTagId: null | string) => void;
}

const fieldToLayoutSet: Record<string, IncidentFormField[]> = {
  cctv: [IncidentFormField.Cctv],
  custom: [IncidentFormField.Custom],
  goods: [IncidentFormField.Goods],
  groups: [IncidentFormField.Groups],
  images: [IncidentFormField.Images],
  police: [IncidentFormField.Police, IncidentFormField.Details],
  profiles: [
    IncidentFormField.Offenders,
    IncidentFormField.Vehicles,
    IncidentFormField.Victims,
    IncidentFormField.Witnesses,
  ],
  tags: [
    IncidentFormField.Types,
    IncidentFormField.Impact,
    IncidentFormField.Involved,
  ],
  when: [IncidentFormField.Where],
};
export type FieldLayout =
  | 'cctv'
  | 'custom'
  | 'goods'
  | 'groups'
  | 'images'
  | 'police'
  | 'profiles'
  | 'tags'
  | 'when';

export type Elements = {
  [K in FieldLayout]?: JSX.Element;
};
const useViewTag = (): Return => {
  const defaultIncidentFormLayout = [
    {
      h: 4.3,
      i: 'tags',
      moved: false,
      static: true,
      w: 1,
      x: 0,
      y: 0,
    },
    {
      h: 3,
      i: 'when',
      moved: false,
      static: false,
      w: 1,
      x: 0,
      y: 1,
    },
    {
      h: 3,
      i: 'goods',
      moved: false,
      static: false,
      w: 1,
      x: 0,
      y: 2,
    },
    {
      h: 5,
      i: 'profiles',
      moved: false,
      static: false,
      w: 1,
      x: 0,
      y: 3,
    },
    {
      h: 3,
      i: 'images',
      moved: false,
      static: false,
      w: 1,
      x: 0,
      y: 4,
    },
    {
      h: 3.8,
      i: 'police',
      moved: false,
      static: false,
      w: 1,
      x: 0,
      y: 5,
    },
    {
      h: 3,
      i: 'groups',
      moved: false,
      static: false,
      w: 1,
      x: 0,
      y: 6,
    },
    {
      h: 3,
      i: 'custom',
      moved: false,
      static: false,
      w: 1,
      x: 0,
      y: 7,
    },
    {
      h: 3,
      i: 'cctv',
      moved: false,
      static: false,
      w: 1,
      x: 0,
      y: 8,
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

  const providedDefaults: Partial<IncidentFormFieldState> = {
    [IncidentFormField.Cctv]: false,
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
    [IncidentFormField.Vehicles]: false,
    [IncidentFormField.Victims]: false,
    [IncidentFormField.Where]: true,
    [IncidentFormField.Witnesses]: false,
  };

  const defaultIncidentFormFieldsTrue: IncidentFormFieldState = (
    Object.values(IncidentFormField) as IncidentFormField[]
  )
    // eslint-disable-next-line unicorn/no-array-reduce
    .reduce((acc, field) => {
      acc[field] =
        typeof providedDefaults[field] === 'boolean'
          ? providedDefaults[field]!
          : false;
      return acc;
    }, {} as IncidentFormFieldState);

  const { id } = useParams();
  const intl = useIntl();

  const schemeId = useAtomValue(currentSchemeIdAtom);
  const schemeName = useAtomValue(currentSchemeAtom)?.name ?? '';
  const [addQuestion, setAddQuestion] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editIncidentType, setEditIncidentType] = useState('');
  const [questionLayoutChanged, setQuestionLayoutChanged] = useState(false);
  const [questionsLayout, setQuestionsLayout] = useState<ExtendedLayout[]>([]);
  const [parentTag, setPTag] = useState<null | string | undefined>(undefined);
  const [incidentFormLayout, setIncidentFormLayout] = useState<
    ExtendedLayout[]
  >(defaultIncidentFormLayout);
  const [incidentFormLayoutChanged, setIncidentFormLayoutChanged] =
    useState(false);
  const [incidentFormFields, setIncidentFormFields] =
    useState<IncidentFormFieldState>(defaultIncidentFormFieldsTrue);
  const { data, loading, refetch } = useViewTagQuery({
    variables: {
      listWhere: {
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
        type: {
          equals: TagType.IncidentCrimeType,
        },
      },
      tagQuestionsWhere: {
        deleted: {
          equals: false,
        },
      },
      where: {
        id: id || '',
      },
    },
  });

  const [selectedQuestion, setSelectedQuestion] = useState<null | string>(null);
  useEffect(() => {
    window.scrollTo({ behavior: 'smooth', top: 0 });
  }, []);
  useEffect(() => {
    if (data?.tag?.tagQuestions) {
      // eslint-disable-next-line no-unsafe-optional-chaining
      const dataQs = [...data?.tag?.tagQuestions].filter(Boolean) || [];
      const qs = dataQs
        .sort((a, b) => b.priority - a.priority)
        .map((q, index) => ({
          h: 1,
          i: q.id,
          maxH: 1,
          maxW: 1,
          minH: 1,
          minW: 1,
          moved: false,
          static: false,
          w: 1,
          x: 0,
          y: index,
        }));
      setQuestionsLayout(qs || []);
      setQuestionLayoutChanged(false);
      setPTag(data?.tag?.parentTag?.id || null);
    }
    if (data?.tag?.incidentForm) {
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
          data: {
            parentTag: {
              connect: {
                id: value,
              },
            },
          },
          where: {
            id: id || '',
          },
        },
      });
    }
  };

  const updateTagParent = (tagId: string, parentTagId: null | string) => {
    if (tagId === id) setPTag(parentTagId);
    if (parentTagId) {
      if (checkTag(tagId, parentTagId))
        void updateTag({
          variables: {
            data: {
              parentTag: {
                connect: {
                  id: parentTagId,
                },
              },
            },
            where: {
              id: tagId,
            },
          },
        });
    } else {
      void updateTag({
        variables: {
          data: {
            parentTag: {
              // ???
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              disconnect: true,
            },
          },
          where: {
            id: tagId,
          },
        },
      });
    }
  };

  const [deleteTagq] = useRemoveQuestionFromTagMutation();

  const deleteQuestion = (questionId: string) => {
    void deleteTagq({
      update: (cache, result) => {
        const existingData = cache.readQuery<ViewTagQuery>({
          query: ViewTagDocument,
          variables: {
            listWhere: {
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
              type: {
                equals: TagType.IncidentCrimeType,
              },
            },
            tagQuestionsWhere: {
              deleted: {
                equals: false,
              },
            },
            where: {
              id: id || '',
            },
          },
        });

        if (!existingData?.tag) return;
        cache.writeQuery<ViewTagQuery>({
          data: {
            ...existingData,
            tag: {
              ...existingData.tag,
              tagQuestions: existingData.tag?.tagQuestions?.filter(
                (tq) => tq.id !== result.data?.removeQuestionFromTag?.id
              ),
            },
          },
          query: ViewTagDocument,
          variables: {
            listWhere: {
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
              type: {
                equals: TagType.IncidentCrimeType,
              },
            },
            tagQuestionsWhere: {
              deleted: {
                equals: false,
              },
            },
            where: {
              id: id || '',
            },
          },
        });
      },
      variables: {
        where: {
          id: questionId,
        },
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
      answer: string;
      questionId: string;
      tagQuestionId: string;
    }
  ) => {
    const existingData = apolloStore.readQuery<ViewTagQuery>({
      query: ViewTagDocument,
      variables: {
        listWhere: {
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
          type: {
            equals: TagType.IncidentCrimeType,
          },
        },
        tagQuestionsWhere: {
          deleted: {
            equals: false,
          },
        },
        where: {
          id: id || '',
        },
      },
    });

    if (!existingData?.tag) return;

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
    }) as {
      __typename?: 'TagQuestion';
      dependentQuestions: never[];
      id: string;
      priority: number;
      question: {
        __typename?: 'Question';
        id: string;
        questionFormatted: string;
        type: AnswerType;
      };
      req: boolean;
    }[];

    apolloStore.writeQuery<ViewTagQuery>({
      data: {
        ...existingData,
        tag: {
          ...existingData.tag,
          tagQuestions: updatedQs,
        },
      },
      query: ViewTagDocument,
      variables: {
        listWhere: {
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
          type: {
            equals: TagType.IncidentCrimeType,
          },
        },
        tagQuestionsWhere: {
          deleted: {
            equals: false,
          },
        },
        where: {
          id: id || '',
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
          formFields: getTypeArrayWithTagsFirst.map((t, index) => ({
            position: 1000 - index,
            type: t.type,
          })),
          tagId: id || '',
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
        description: intl.formatMessage(
          {
            defaultMessage:
              'The incident type has been removed from {schemeName}',
          },
          { schemeName }
        ),
        message: intl.formatMessage({
          defaultMessage: 'Successfully Removed',
        }),
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
      content: intl.formatMessage({
        defaultMessage:
          'This will remove this incident type from this scheme, bu not any other schemes you may have added it to.',
      }),
      onOk() {
        openDelete(currentId);
      },

      title: intl.formatMessage({
        defaultMessage: 'Are you sure?',
      }),
    });
  };

  return {
    addQuestion,
    data,
    deleteConfirm,
    deleteQuestion,
    editIncidentType,
    incidentFormFields,
    incidentFormLayout,
    incidentFormLayoutChanged,
    loading,
    parentTag,
    questionLayoutChanged,
    questionsLayout,
    saveIncidentForm,
    saveQOrder,
    saving,
    schemeId,
    selectedQuestion,
    setEditIncidentType,
    setIncidentFormLayout,
    setIncidentFormLayoutChanged,
    setParentTag,
    setQuestionLayoutChanged,
    setQuestionsLayout,
    setSelectedQuestion,
    toggleAddQuestion,
    toggleField,
    updateQuestionOnTag,
    updateTagParent,
  };
};
export default useViewTag;
