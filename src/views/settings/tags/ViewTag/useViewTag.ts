/* eslint-disable no-restricted-syntax */
import type { ExtendedLayout } from '#/views/reports/types';
import type { ModuleCondition } from '#/views/settings/tags/ViewTag/components/ModuleConditionsModal';
import type { ViewTagQuery } from '#/views/settings/tags/ViewTag/graphql/__generated__/view-tag.generated';
import type { AnswerType } from 'graphql/types';
import type { Dispatch, SetStateAction } from 'react';

import {
  currentSchemeAtom,
  currentSchemeIdAtom,
} from '#/providers/SchemeProvider/SchemeProvider';
import { useBusinessGroupsLazyQuery } from '#/views/incidents/AddIncident/graphql/queries/__generated__/business-groups.generated';
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
import { useEffect, useMemo, useState } from 'react';
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
  availableBusinessGroups: { id: string; name: string }[];
  conditionsModalOpen: boolean;
  currentModuleConditions: ModuleCondition[];
  data: ViewTagQuery | undefined;
  deleteConfirm: (value: string) => void;
  deleteQuestion: (questionId: string) => void;
  draftState: {
    draftButton: string;
    draftDescription: string;
    draftTitle: string;
  };
  editIncidentType: string;
  incidentFormFields: IncidentFormFieldState;
  incidentFormLayout: ExtendedLayout[];
  incidentFormLayoutChanged: boolean;
  involvedMode: boolean;
  isInitialLoad: boolean;
  loading: boolean;
  parentTag: null | string | undefined;
  questionLayoutChanged: boolean;
  questionsLayout: ExtendedLayout[];
  saveAllChanges: () => void;
  saveIncidentForm: () => void;
  saveModuleConditions: (conditions: ModuleCondition[]) => void;
  saveQOrder: () => void;
  saving: boolean;
  schemeId: string;
  selectedModule: IncidentFormField | null;
  selectedQuestion: null | string;
  setConditionsModalOpen: (open: boolean) => void;
  setDraftState: Dispatch<
    SetStateAction<{
      draftButton: string;
      draftDescription: string;
      draftTitle: string;
    }>
  >;
  setEditIncidentType: (value: string) => void;
  setIncidentFormLayout: (value: ExtendedLayout[]) => void;
  setIncidentFormLayoutChanged: (value: boolean) => void;
  setParentTag: (value: string) => void;
  setQuestionLayoutChanged: (value: boolean) => void;
  setQuestionsLayout: (value: ExtendedLayout[]) => void;
  setSelectedModule: (field: IncidentFormField | null) => void;
  setSelectedQuestion: (value: null | string) => void;
  showDraft: boolean;
  toggleAddQuestion: () => void;
  toggleField: (field: IncidentFormField) => void;
  toggleInvolvedMode: (value: boolean) => void;
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
  draft: [IncidentFormField.Draft],
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
  | 'draft'
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
    {
      h: 8,
      i: 'draft',
      moved: false,
      static: false,
      w: 1,
      x: 0,
      y: 9,
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
    [IncidentFormField.Draft]: false,
    [IncidentFormField.Goods]: true,
    [IncidentFormField.Groups]: true,
    [IncidentFormField.Images]: true,
    [IncidentFormField.Impact]: true,
    [IncidentFormField.Involved]: true,
    [IncidentFormField.Offenders]: true,
    [IncidentFormField.Police]: true,
    [IncidentFormField.PoliceReport]: false,
    [IncidentFormField.PoliceStatement]: false,
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
  const showDraft = useAtomValue(currentSchemeAtom)?.draftIncidents || false;
  const schemeName = useAtomValue(currentSchemeAtom)?.name ?? '';
  const [addQuestion, setAddQuestion] = useState(false);
  const [saving, setSaving] = useState(false);
  const [involvedMode, setInvolvedMode] = useState(false);
  const [editIncidentType, setEditIncidentType] = useState('');
  const [questionLayoutChanged, setQuestionLayoutChanged] = useState(false);
  const [questionsLayout, setQuestionsLayout] = useState<ExtendedLayout[]>([]);
  const [parentTag, setPTag] = useState<null | string | undefined>(undefined);
  const [incidentFormLayout, setIncidentFormLayout] = useState<
    ExtendedLayout[]
  >(defaultIncidentFormLayout);
  const [incidentFormLayoutChanged, setIncidentFormLayoutChanged] =
    useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [incidentFormFields, setIncidentFormFields] =
    useState<IncidentFormFieldState>(defaultIncidentFormFieldsTrue);
  const [selectedModule, setSelectedModule] =
    useState<IncidentFormField | null>(null);
  const [conditionsModalOpen, setConditionsModalOpen] = useState(false);
  const [moduleConditions, setModuleConditions] = useState<
    Record<IncidentFormField, ModuleCondition[]>
  >({} as Record<IncidentFormField, ModuleCondition[]>);

  const [draftState, setDraftState] = useState({
    draftButton: 'Save as Draft 2',
    draftDescription: '',
    draftTitle: '',
  });
  const { data, loading, refetch } = useViewTagQuery({
    variables: {
      listWhere: {
        dataType: {
          equals: Model.Incident,
        },
        recycled: {
          equals: false,
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

  const [getBusinessGroups, { data: businessGroupsData }] =
    useBusinessGroupsLazyQuery();
  useEffect(() => {
    window.scrollTo({ behavior: 'smooth', top: 0 });
    // Fetch business groups for the scheme
    void getBusinessGroups({
      variables: {
        where: {
          scheme: {
            id: {
              equals: schemeId,
            },
          },
        },
      },
    });
  }, [schemeId]);

  // Reset initial load flag after data is loaded
  useEffect(() => {
    if (data && isInitialLoad) {
      // Give React time to render before allowing change tracking
      const timer = setTimeout(() => {
        setIsInitialLoad(false);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [data, isInitialLoad]);
  useEffect(() => {
    if (
      data?.tag.incidentForm?.fields.find(
        (item) => item.type === IncidentFormField.Involved
      )?.metadata?.mode === 'SINGLE_SELECT'
    ) {
      setInvolvedMode(true);
    } else {
      setInvolvedMode(false);
    }

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
      // Don't mark as changed during initial load
      if (!isInitialLoad) {
        setQuestionLayoutChanged(false);
      }
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
      // Reset the changed flag since this is from initial data load
      setIncidentFormLayoutChanged(false);

      // Load existing conditions from the incident form fields
      const conditionsMap: Record<string, ModuleCondition[]> = {};
      for (const field of data.tag.incidentForm.fields) {
        if (field.conditions && Array.isArray(field.conditions)) {
          conditionsMap[field.type] = field.conditions as ModuleCondition[];
        }
      }
      setModuleConditions(conditionsMap);
    }
    if (
      data?.tag?.incidentForm?.fields?.find(
        (field) => field.type === IncidentFormField.Draft
      )?.metadata
    ) {
      const found = data?.tag?.incidentForm?.fields?.find(
        (field) => field.type === IncidentFormField.Draft
      );
      setDraftState({
        draftButton:
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          (found?.metadata?.draftButton as string) || 'Save as Draft',
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        draftDescription: (found?.metadata?.draftDescription as string) || '',
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        draftTitle: (found?.metadata?.draftTitle as string) || '',
      });
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

    if (
      fieldToUpdate === IncidentFormField.Involved &&
      incidentFormFields.INVOLVED
    ) {
      setInvolvedMode(false);
    }

    setIncidentFormFields((prevState) => ({
      ...prevState,
      [fieldToUpdate]: !prevState[fieldToUpdate],
    }));
  };

  const toggleInvolvedMode = (value: boolean) => {
    setInvolvedMode(value);
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
          formFields: getTypeArrayWithTagsFirst.map((t, index) => {
            const existing = data?.tag.incidentForm?.fields.find(
              (existingT) => existingT.type === t.type
            );

            const getMetaData = () => {
              const isDraft = t.type === IncidentFormField.Draft;
              if (isDraft) {
                return draftState;
              }

              console.log(t.type === IncidentFormField.Involved, involvedMode);
              if (t.type === IncidentFormField.Involved && involvedMode)
                return {
                  mode: 'SINGLE_SELECT',
                };

              if (existing?.metadata) return existing.metadata;

              return undefined;
            };

            const getConditions = () => {
              // Check if we have updated conditions in our state
              if (moduleConditions[t.type]) {
                return moduleConditions[t.type].length > 0
                  ? moduleConditions[t.type]
                  : undefined;
              }
              // Otherwise use existing conditions
              if (existing?.conditions) return existing.conditions;
              return undefined;
            };

            return {
              conditions: getConditions(),
              metadata: getMetaData(),
              position: 1000 - index,
              type: t.type,
            };
          }),
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

  const saveModuleConditions = (conditions: ModuleCondition[]) => {
    if (selectedModule) {
      setModuleConditions((prev) => ({
        ...prev,
        [selectedModule]: conditions,
      }));
      setIncidentFormLayoutChanged(true);
    }
  };

  const saveAllChanges = () => {
    if (questionLayoutChanged) {
      saveQOrder();
    }
    if (incidentFormLayoutChanged) {
      saveIncidentForm();
    }
  };

  const availableBusinessGroups = useMemo(
    () =>
      businessGroupsData?.groups.map((group) => ({
        id: group.id,
        name: group.name || group.id,
      })) || [],
    [businessGroupsData]
  );

  const currentModuleConditions = useMemo(
    () => (selectedModule ? moduleConditions[selectedModule] || [] : []),
    [selectedModule, moduleConditions]
  );

  return {
    addQuestion,
    availableBusinessGroups,
    conditionsModalOpen,
    currentModuleConditions,
    data,
    deleteConfirm,
    deleteQuestion,
    draftState,
    editIncidentType,
    incidentFormFields,
    incidentFormLayout,
    incidentFormLayoutChanged,
    involvedMode,
    isInitialLoad,
    loading,
    parentTag,
    questionLayoutChanged,
    questionsLayout,
    saveAllChanges,
    saveIncidentForm,
    saveModuleConditions,
    saveQOrder,
    saving,
    schemeId,
    selectedModule,
    selectedQuestion,
    setConditionsModalOpen,
    setDraftState,
    setEditIncidentType,
    setIncidentFormLayout,
    setIncidentFormLayoutChanged,
    setParentTag,
    setQuestionLayoutChanged,
    setQuestionsLayout,
    setSelectedModule,
    setSelectedQuestion,
    showDraft,
    toggleAddQuestion,
    toggleField,
    toggleInvolvedMode,
    updateQuestionOnTag,
    updateTagParent,
  };
};
export default useViewTag;
