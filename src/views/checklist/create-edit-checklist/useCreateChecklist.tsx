/* eslint-disable no-restricted-syntax,@typescript-eslint/no-unsafe-enum-comparison */
import type { FormInstance } from 'antd';
import type { ChecklistAnswerType } from 'graphql/types';

import { useStoreState } from '#/state';
import { useCreateUpdateChecklistMutation } from '#/views/checklist/graphql/mutations/__generated__/create-update-checklist.generated';
import { useListBusinessesChecklistQuery } from '#/views/checklist/graphql/queries/__generated__/list-businesses.generated';
import { useUserListChecklistQuery } from '#/views/checklist/graphql/queries/__generated__/list-users-checklist.generated';
import { useChecklistQuery } from '#/views/checklist/graphql/queries/__generated__/view-checklist.generated';
import { useBrandsQuery } from '#/views/settings/brands/graphql/queries/__generated__/brands.generated';
import { Form } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

export interface SelectOption {
  label: string;
  value: string;
}
export interface Section {
  description: string;
  order: number;
  subsections: Subsection[];
  title: string;
}

interface Subsection {
  description: string;
  order: number;
  questions: Question[];
  title: string;
}

interface Question {
  brandIds?: string[];
  dependent?: {
    answer: string;
    question: string;
  } | null;
  dependentAnswer?: string;
  dependentCheck: boolean;
  dependentQuestion?: string;
  failWeight?: number;
  order: number;
  passWeight?: number;
  title: string;
  type:
    | 'GOOD_BAD'
    | 'GOOD_BAD_NA'
    | 'PASS_FAIL'
    | 'PASS_FAIL_NA'
    | 'TEXT'
    | 'YES_NO'
    | 'YES_NO_NA';
  weighted: boolean;
  // Add other question properties here
}

export function findChangedSectionIndex(
  data: Question[] | Section[] | Subsection[]
) {
  return data.findIndex(Boolean);
}

export interface FormData {
  businessIds: string[];
  description: string;
  sections: Section[];
  title: string;
  userIds: string[];
}

interface Return {
  brands: SelectOption[];
  businesses: SelectOption[];
  form: FormInstance<FormData>;
  handleAddQuestion: (sectionIndex: number, subSectionIndex: number) => void;
  handleAddSection: () => void;
  handleAddSubsection: (index: number) => void;
  handleRemoveQuestion: (
    sectionIndex: number,
    subsectionIndex: number,
    questionIndex: number
  ) => void;
  handleRemoveSection: (index: number) => void;
  handleRemoveSubsection: (
    sectionIndex: number,
    subsectionIndex: number
  ) => void;
  handleSectionChange: (
    changedValues: {
      sections: Section[];
    },
    allValues: {
      sections: Section[];
    }
  ) => void;
  loading: boolean;
  onFinish: (data: FormData) => void;
  users: SelectOption[];
}

// create a funciton that gets an object of the following shape and an language code
// {1 item
// "en":"Who?"
// }
// find the correct language code and return the value
// or return the first value if the language code is not found

const getQuestion = (
  question: {
    [key: string]: string;
  },
  languageCode: string
) => {
  const keys = Object.keys(question);
  const key = keys.find((k) => k === languageCode);
  if (key) {
    return question[key];
  }
  return question[keys[0]];
};

const getWeight = (
  type: ChecklistAnswerType,
  weights: {
    answer: string;
    weight: number;
  }[]
) => {
  switch (type) {
    case 'PASS_FAIL': {
      return {
        failWeight: weights.find((weight) => weight.answer === 'FAIL')?.weight,
        passWeight: weights.find((weight) => weight.answer === 'PASS')?.weight,
      };
    }
    case 'YES_NO': {
      return {
        failWeight: weights.find((weight) => weight.answer === 'NO')?.weight,
        passWeight: weights.find((weight) => weight.answer === 'YES')?.weight,
      };
    }
    case 'GOOD_BAD': {
      return {
        failWeight: weights.find((weight) => weight.answer === 'BAD')?.weight,
        passWeight: weights.find((weight) => weight.answer === 'GOOD')?.weight,
      };
    }
    case 'TEXT': {
      return {
        failWeight: undefined,
        passWeight: weights.find((weight) => weight.answer === 'TEXT')?.weight,
      };
    }
    default: {
      return {
        failWeight: weights.find((weight) => weight.answer === 'FAIL')?.weight,
        passWeight: weights.find((weight) => weight.answer === 'PASS')?.weight,
      };
    }
  }
};

const createAnswerWeight = (
  type:
    | 'GOOD_BAD'
    | 'GOOD_BAD_NA'
    | 'PASS_FAIL'
    | 'PASS_FAIL_NA'
    | 'TEXT'
    | 'YES_NO'
    | 'YES_NO_NA',
  passWeight: number,
  failWeight: number
) => {
  switch (type) {
    case 'PASS_FAIL_NA':
    case 'PASS_FAIL': {
      return [
        { answer: 'PASS', weight: passWeight },
        { answer: 'FAIL', weight: failWeight },
      ];
    }
    case 'YES_NO_NA':
    case 'YES_NO': {
      return [
        { answer: 'YES', weight: passWeight },
        { answer: 'NO', weight: failWeight },
      ];
    }
    case 'GOOD_BAD_NA':
    case 'GOOD_BAD': {
      return [
        { answer: 'GOOD', weight: passWeight },
        { answer: 'BAD', weight: failWeight },
      ];
    }
    case 'TEXT': {
      return [{ answer: 'TEXT', weight: passWeight }];
    }
    default: {
      return [
        { answer: 'PASS', weight: passWeight },
        { answer: 'FAIL', weight: failWeight },
      ];
    }
  }
};

export function useCreateChecklist(): Return {
  const [form] = Form.useForm<FormData>();
  const [sections, setSections] = useState<Section[]>([
    { description: '', order: 1, subsections: [], title: '' },
  ]);

  const [businesses, setBusinesses] = useState<SelectOption[]>([]);
  const [users, setUsers] = useState<SelectOption[]>([]);
  const [createUpdateChecklist] = useCreateUpdateChecklistMutation();

  const { id: schemeId } = useStoreState((state) => state.scheme);
  const { id } = useParams();
  const language = useStoreState((state) => state.theme.locale);

  const { loading } = useChecklistQuery({
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      //      case 'PASS_FAIL': {
      //         return [
      //           { answer: 'PASS', weight: passWeight },
      //           { answer: 'FAIL', weight: failWeight },
      //         ];
      //       }
      //       case 'YES_NO': {
      //         return [
      //           { answer: 'YES', weight: passWeight },
      //           { answer: 'NO', weight: failWeight },
      //         ];
      //       }
      //       case 'GOOD_BAD': {
      //         return [
      //           { answer: 'GOOD', weight: passWeight },
      //           { answer: 'BAD', weight: failWeight },
      //         ];
      //       }
      //       case 'TEXT': {
      //         return [{ answer: 'TEXT', weight: passWeight }];
      //       }
      //       // eslint-disable-next-line sonarjs/no-duplicated-branches
      //       default: {
      //         return [
      //           { answer: 'PASS', weight: passWeight },
      //           { answer: 'FAIL', weight: failWeight },
      //         ];
      //       }
      // use the above when given a type find what format the pass and fail weight should be

      form.setFieldsValue({
        businessIds:
          data.checklist.business.map((business) => business.id) || [],
        description: data.checklist.description ?? undefined,
        // @ts-expect-error types not liking generics
        sections: data.checklist.sections.map((section) => ({
          order: section.order,
          subsections: section.subsections.map((subsection) => ({
            order: subsection.order,
            questions: subsection.questions.map((question) => ({
              brandIds: question.brandIds,
              dependent: question.dependent,
              dependentAnswer: (question.dependent?.answer as string) ?? '',
              dependentCheck: !!question.dependent,
              dependentQuestion: (question.dependent?.question as string) ?? '',
              failWeight: getWeight(question.type, question.weight).failWeight,
              order: question.order,
              passWeight: getWeight(question.type, question.weight).passWeight,
              title: getQuestion(question.question, language),
              type: question.type,
              weighted: question.weight.length > 0,
            })),
            title: subsection.title,
          })),
          title: section.title,
        })),
        title: data.checklist.title,
        userIds: data.checklist.users.map((user) => user.id) || [],
      });
    },
    skip: !id,
    variables: {
      where: {
        id: id || '',
      },
    },
  });
  const navigate = useNavigate();
  const onFinish = (values: FormData) => {
    void createUpdateChecklist({
      onCompleted: () => {
        navigate('/app/checklists');
      },
      variables: {
        createUpdateChecklistId: id,
        data: {
          businessIds: values.businessIds,
          description: values.description,
          sections: values.sections.map((section) => ({
            order: section.order,
            subsections: section.subsections.map((subsection) => ({
              order: subsection.order,
              questions: subsection.questions.map((question) => ({
                brandIds: question.brandIds ?? [],
                dependOn: question.dependentCheck
                  ? {
                      answer: question.dependentAnswer ?? '',
                      question: question.dependentQuestion ?? '',
                    }
                  : null,
                order: question.order,
                question: question.title,
                type: question.type as ChecklistAnswerType,

                weight: question.weighted
                  ? createAnswerWeight(
                      question.type,
                      question.passWeight || 5,
                      question.failWeight || 0
                    )
                  : [],
              })),
              title: subsection.title,
            })),
            title: section.title,
          })),
          title: values.title,
          userIds: values.userIds,
        },
      },
    });
  };

  const handleAddSection = () => {
    const formSections = form.getFieldValue('sections') as Section[];
    const newOrder =
      formSections.length > 0
        ? Math.max(...formSections.map((s) => s.order)) + 1
        : 1;
    setSections([
      ...formSections,
      { description: '', order: newOrder, subsections: [], title: '' },
    ]);
  };

  const handleRemoveSection = (index) => {
    const formSections = form.getFieldValue('sections') as Section[];
    const newSections = formSections.filter((_, i) => i !== index);

    // Update the order of the remaining sections
    for (const [newIndex, section] of newSections.entries()) {
      section.order = newIndex + 1;
    }

    setSections(newSections);
  };

  const handleSectionChange = (
    changedValues: {
      sections: Section[];
    },
    allValues: {
      sections: Section[];
    }
  ) => {
    if ('sections' in changedValues) {
      let changedSectionIndex = -1;
      changedSectionIndex = findChangedSectionIndex(changedValues.sections);
      // get the changed section
      const changedSection = changedValues.sections[changedSectionIndex];
      if (changedSection && 'subsections' in changedSection) {
        const changedSubSectionIndex = findChangedSectionIndex(
          changedSection.subsections
        );
        const changedSubSection =
          changedSection.subsections[changedSubSectionIndex];
        if (changedSubSection && 'questions' in changedSubSection) {
          const changedQuestionIndex = findChangedSectionIndex(
            changedSubSection.questions
          );
          const changedQuestion =
            changedSubSection.questions[changedQuestionIndex];
          if (changedQuestion?.order) {
            const sectionToUpdate = allValues.sections[changedSectionIndex];
            const { subsections } = sectionToUpdate;
            const subsectionToUpdate = subsections[changedSubSectionIndex];
            const { questions } = subsectionToUpdate;
            const removed = questions.splice(changedQuestionIndex, 1);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            questions.splice(changedQuestion.order - 1, 0, {
              ...removed[0],
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              ...changedQuestion,
            });
            for (const [index, question] of questions.entries()) {
              question.order = index + 1;
            }
            const updatedSections = allValues.sections.map(
              (section, index) => ({
                ...sections[index],
                ...section,
              })
            );
            setSections(updatedSections);
          }

          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
        } else if (changedSubSection.order) {
          const sectionToUpdate = allValues.sections[changedSectionIndex];
          const { subsections } = sectionToUpdate;
          const removed = subsections.splice(changedSubSectionIndex, 1);
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          subsections.splice(changedSubSection.order - 1, 0, {
            ...removed[0],
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            ...changedSubSection,
          });
          for (const [index, subsection] of subsections.entries()) {
            subsection.order = index + 1;
          }
          const updatedSections = allValues.sections.map((section, index) => ({
            ...sections[index],
            ...section,
          }));
          setSections(updatedSections);
        }
      } // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      else if (changedSection?.order) {
        const updatedSections = allValues.sections.map((section, index) => ({
          ...sections[index],
          ...section,
        }));

        for (const [index, section] of updatedSections.entries()) {
          if (section.order !== sections[index]?.order) {
            changedSectionIndex = index;
          }
        }

        if (changedSectionIndex !== -1) {
          // Move the changed section to its new position
          const removedSection = updatedSections.splice(
            changedSectionIndex,
            1
          )[0];
          const sectionToAdd = {
            ...removedSection,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            ...changedSection,
          } as Section;

          updatedSections.splice(removedSection.order - 1, 0, sectionToAdd);

          // Normalize the order of all sections
          for (const [index, section] of updatedSections.entries()) {
            section.order = index + 1;
          }

          setSections(updatedSections);
        }
      }
    }
  };

  const handleAddSubsection = (sectionIndex: number) => {
    const formSections = form.getFieldValue('sections') as Section[];
    const newSections = [...formSections];
    const { subsections } = newSections[sectionIndex];
    const newOrder =
      subsections.length > 0
        ? Math.max(...subsections.map((s) => s.order)) + 1
        : 1;
    subsections.push({
      description: '',
      order: newOrder,
      questions: [],
      title: '',
    });
    setSections(newSections);
  };

  const handleRemoveSubsection = (
    sectionIndex: number,
    subsectionIndex: number
  ) => {
    const formSections = form.getFieldValue('sections') as Section[];
    const newSections = [...formSections];
    const { subsections } = newSections[sectionIndex];
    subsections.splice(subsectionIndex, 1);
    for (const [newIndex, subsection] of subsections.entries()) {
      subsection.order = newIndex + 1;
    }
    setSections(newSections);
  };

  const handleAddQuestion = (sectionIndex: number, subSectionIndex: number) => {
    const formSections = form.getFieldValue('sections') as Section[];
    const newSections = [...formSections];
    const { subsections } = newSections[sectionIndex];
    const subSectionToAddTo = subsections[subSectionIndex];
    const { questions } = subSectionToAddTo;
    const newOrder =
      questions.length > 0 ? Math.max(...questions.map((s) => s.order)) + 1 : 1;
    questions.push({
      brandIds: [],
      dependent: null,
      dependentCheck: false,
      order: newOrder,
      title: '',
      type: 'PASS_FAIL',
      weighted: false,
    });
    setSections(newSections);
  };

  const handleRemoveQuestion = (
    sectionIndex: number,
    subsectionIndex: number,
    questionIndex: number
  ) => {
    const formSections = form.getFieldValue('sections') as Section[];
    const newSections = [...formSections];
    const { subsections } = newSections[sectionIndex];
    const { questions } = subsections[subsectionIndex];
    questions.splice(questionIndex, 1);
    for (const [newIndex, question] of questions.entries()) {
      question.order = newIndex + 1;
    }
    setSections(newSections);
  };
  const { loading: businessLoading } = useListBusinessesChecklistQuery({
    onCompleted: (businessData) => {
      if (
        businessData &&
        businessData.listBusinesses &&
        businessData.listBusinesses.businesses &&
        businessData.listBusinesses.businesses.length > 0
      )
        setBusinesses(
          businessData.listBusinesses.businesses.map((business) => ({
            label: business.name,
            value: business.id,
          }))
        );
    },
    variables: {
      where: {
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

  const { loading: usersLoading } = useUserListChecklistQuery({
    onCompleted: (usersData) => {
      if (
        usersData &&
        usersData.listUsers &&
        usersData.listUsers.users &&
        usersData.listUsers.users.length > 0
      )
        setUsers(
          usersData.listUsers.users.map((business) => ({
            label: business.fullName,
            value: business.id,
          }))
        );
    },
    variables: {
      where: {
        schemes: {
          some: {
            scheme: {
              id: {
                equals: schemeId,
              },
            },
          },
        },
      },
    },
  });

  useEffect(() => {
    form.setFieldsValue({ sections });
  }, [sections, form]);

  const { id: currentSchemeId } = useStoreState((state) => state.scheme);

  const { data: BrandsData } = useBrandsQuery({
    variables: {
      where: {
        scheme: {
          id: {
            equals: currentSchemeId,
          },
        },
      },
    },
  });

  const brandsFormatted =
    BrandsData?.brands?.edges?.map(({ node: brand }) => ({
      label: brand.name || '',
      value: brand.id || '',
    })) || [];

  return {
    brands: brandsFormatted,
    businesses,
    form,
    handleAddQuestion,
    handleAddSection,
    handleAddSubsection,
    handleRemoveQuestion,
    handleRemoveSection,
    handleRemoveSubsection,
    handleSectionChange,
    loading: loading || businessLoading || usersLoading,
    onFinish,
    users,
  };
}
