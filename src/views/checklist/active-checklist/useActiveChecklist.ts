/* eslint-disable no-restricted-syntax */
import { Form, type FormInstance } from 'antd';
import { useParams } from 'react-router';
import { useState } from 'react';

import { useStoreState } from '../../../state';
import FONT_FAMILIES from '../../../components/onboarding/Onboarding/SchemeTerms/utils/Fonts';
import type { ActiveChecklistQuery } from '#/views/checklist/graphql/queries/view-active-checklist.generated';
import {
  ActiveChecklistDocument,
  useActiveChecklistQuery,
} from '#/views/checklist/graphql/queries/view-active-checklist.generated';
import { useCompleteChecklistMutation } from '#/views/checklist/graphql/mutations/complete-checklist.generated';
import type { ActiveChecklist } from 'graphql/types';

interface Return {
  id: string | undefined;
  loading: boolean;
  form: FormInstance<FormData>;
  onFinish: (data: FormData) => void;
  data: ActiveChecklistQuery | undefined;
  sections: ActiveChecklistSection[];
  saveDraft: () => void;
  name: string;
  setSign: (value: string) => void;
  update: (value: string) => void;
  selectedFont: string;
  file: { file: string; name: string } | null;
  setTab: (value: string) => void;
  tab: string;
  setSelectedFont: (value: string) => void;
  setFile: (value: { file: string; name: string } | null) => void;
  sign: string;
  submitting: boolean;
}

export interface FormData {
  sections: ActiveChecklistSection[];
  additionalInfo?: string;
}

export interface ActiveChecklistSection {
  sub: boolean;
  section: number;
  subsection?: number | null;
  titleLocaled: string;
  subsections: ActiveChecklistSubsection[];
}

interface ActiveChecklistSubsection {
  sub: boolean;
  section: number;
  subsection?: number | null;
  titleLocaled: string;
  questions: ActiveChecklistField[];
}

interface ActiveChecklistField {
  id: string;
  question: LocalizedString;
  type: string;
  availableAnswers: AvailableAnswer[];
  answer: string | null;
  section: number;
  subsection: number;
  order: number;
  weights: Weight[];
  additionalComments?: string | null;
  dependent?: {
    question: string;
    answer: string;
  } | null;
  ogName: string;
  images?:
    | {
        uid: string;
        name: string;
        status: string;
        url?: string;
        response?: { url: string }[];
      }[]
    | null;
}

interface LocalizedString {
  [key: string]: string;
}

interface AvailableAnswer {
  id?: string;
  answer: string;
  weight: number;
  questionId?: string;
}

interface Weight {
  answer: string;
  weight: number;
}

export const flaggedArray = new Set(['FAIL', 'NO', 'FALSE']);
export const successArray = new Set(['PASS', 'YES', 'TRUE', 'N/A', null, '']);

const generateDefaultSign = (name: string) =>
  `<svg xmlns="http://www.w3.org/2000/svg" style="background:#ffffff00" height="100" width="300" viewBox="0 0 300 100" class="signature-svg" data-reactroot=""><text x="20" y="60" font-family="Caveat" font-size="30" fill="black">${name}</text></svg>`;

const useActiveChecklist = (): Return => {
  const { id } = useParams();
  const [form] = Form.useForm<FormData>();
  const [sections, setSections] = useState<ActiveChecklistSection[]>([]);
  const { fullName: name } = useStoreState((state) => state.user);
  const [sign, setSign] = useState(generateDefaultSign(name));
  const [selectedFont, setSelectedFont] = useState(FONT_FAMILIES[0]);
  const [tab, setTab] = useState('generate');
  const [file, setFile] = useState<{
    file: string;
    name: string;
  } | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const update = (value: string) => {
    setSign(value);
  };

  const { data, loading } = useActiveChecklistQuery({
    variables: {
      where: {
        id: id || '',
      },
    },
    onCompleted: (initData) => {
      try {
        const sectionsData =
          initData.activeChecklist?.checklistSection
            .filter((section) => !section.sub)
            .sort((a, b) => a.section - b.section) || [];
        const subsections = initData.activeChecklist?.checklistSection.filter(
          (section) => section.sub
        );

        const questionsMap = new Map<
          number,
          Map<number, ActiveChecklistQuery['activeChecklist']['fields']>
        >();
        // eslint-disable-next-line no-restricted-syntax,no-unsafe-optional-chaining
        for (const field of initData.activeChecklist?.fields) {
          const { section, subsection } = field;
          if (!questionsMap.has(section)) {
            questionsMap.set(section, new Map());
          }
          if (!questionsMap.get(section)?.has(subsection)) {
            questionsMap.get(section)?.set(subsection, []);
          }
          questionsMap.get(section)?.get(subsection)?.push(field);
        }

        const questToArray = [...questionsMap.values()].map((value) => [
          ...value.values(),
        ]);

        const sectionsAndSubsections = sectionsData.map((section) => {
          const subsectionsForSection =
            subsections
              ?.filter((subsection) => subsection.section === section.section)
              .sort((a, b) => (a.subsection || 0) - (b.subsection || 0)) || [];

          return {
            ...section,
            subsections:
              subsectionsForSection.map((subsection) => {
                const questionsForSection =
                  questToArray[section.section - 1][
                    (subsection.subsection || 0) - 1
                  ]
                    ?.sort((a, b) => a.order - b.order)
                    .filter(
                      (ques) =>
                        !(
                          initData.activeChecklist.status === 'COMPLETED' &&
                          ques.dependent &&
                          !ques.answer?.answer
                        )
                    ) || [];
                return {
                  ...subsection,
                  questions: questionsForSection.map((question) => ({
                    ...question,
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    ogName: question.question.og || '',
                    weights:
                      question.availableAnswers?.map((weight) => ({
                        answer: (weight.answer as string) || '',
                        weight: (weight.weight as number) || 0,
                      })) || [],
                    answer: question?.answer?.answer || '',
                    images:
                      question?.answer?.images?.map((image, index) => ({
                        uid: `-${index + 1}`,
                        name: `image-${index + 1}`,
                        status: 'done',
                        url: image,
                      })) || [],
                    additionalComments:
                      question?.answer?.additionalComments || '',
                    availableAnswers: (question?.availableAnswers ||
                      []) as AvailableAnswer[],
                  })),
                };
              }) || [],
          };
        });

        form.setFieldsValue({
          // @ts-expect-error type error with generics
          sections: sectionsAndSubsections,
          additionalInfo: initData?.activeChecklist?.comments || '',
        });
        setSections(sectionsAndSubsections as ActiveChecklistSection[]);
        if (initData?.activeChecklist?.signature) {
          setSign(initData.activeChecklist.signature);
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  const [completeChecklist] = useCompleteChecklistMutation({
    update: (cache, { data: mutationData }) => {
      try {
        const { activeChecklist } = cache.readQuery<ActiveChecklistQuery>({
          query: ActiveChecklistDocument,
          variables: {
            where: {
              id: id || '',
            },
          },
        }) || { activeChecklist: undefined };
        const newActiveChecklist = {
          ...activeChecklist,
          ...mutationData?.completeChecklist,
        } as ActiveChecklist;
        cache.writeQuery<ActiveChecklistQuery>({
          query: ActiveChecklistDocument,
          variables: {
            where: {
              id: id || '',
            },
          },
          data: {
            activeChecklist: newActiveChecklist,
          },
        });
      } catch (error) {
        console.log(error);
      }
    },
    onCompleted: () => {
      setSubmitting(false);
    },
    onError: () => {
      setSubmitting(false);
    },
  });

  const saveChecklist = (draft: boolean, formData?: FormData) => {
    setSubmitting(true);
    const completedData = formData || form.getFieldsValue();

    let total = 0;
    let maxTotal = 0;
    const sectionTotals: {
      section: number;
      total: number;
      maxTotal: number;
      flaggedNos: number;
      title: string;
    }[] = [];
    const subsectionTotals: {
      section: number;
      subsection: number;
      total: number;
      maxTotal: number;
      flaggedNos: number;
      title: string;
    }[] = [];

    // eslint-disable-next-line no-restricted-syntax
    // eslint-disable-next-line @typescript-eslint/no-loop-func
    // eslint-disable-next-line @typescript-eslint/no-loop-func
    for (const section of completedData.sections)
      section.subsections.flatMap((subsection) =>
        subsection.questions.flatMap((question, _, ogArray) => {
          const isDepend = question.dependent;
          let unusedDep = false;
          if (isDepend) {
            const dependOn = ogArray.find(
              (q) => q.ogName === isDepend.question
            );
            if (dependOn?.answer !== isDepend.answer) unusedDep = true;
          }
          const questionFormatted = {
            section: section.section,
            subsection: subsection.subsection || 0,
            maxWeight:
              question.weights.sort((a, b) => b.weight - a.weight)[0]?.weight ||
              0,
            weight:
              question.weights.find(
                (weight) => weight.answer === question.answer
              )?.weight || 0,
            na: question.answer === 'N/A' || unusedDep,
            flagged: unusedDep ? false : question.answer === 'FAIL',
            answer: question.answer || '',
            id: question.id,
          };

          if (!questionFormatted.na) {
            total += questionFormatted.weight;
            maxTotal += questionFormatted.maxWeight;
            const sectionIndex = sectionTotals.findIndex(
              (sectionTotal) => sectionTotal.section === section.section
            );
            if (sectionIndex === -1)
              sectionTotals.push({
                section: section.section,
                total: questionFormatted.weight,
                maxTotal: questionFormatted.maxWeight,
                flaggedNos: question.answer === 'FAIL' ? 1 : 0,
                title: section.titleLocaled || '',
              });
            else {
              sectionTotals[sectionIndex].total += questionFormatted.weight;
              sectionTotals[sectionIndex].maxTotal +=
                questionFormatted.maxWeight;
              if (question.answer === 'FAIL')
                sectionTotals[sectionIndex].flaggedNos += 1;
            }
            const subsectionIndex = subsectionTotals.findIndex(
              (subsectionTotal) =>
                subsectionTotal.section === section.section &&
                subsectionTotal.subsection === subsection.subsection
            );
            if (subsectionIndex === -1)
              subsectionTotals.push({
                section: section.section,
                subsection: subsection.subsection || 0,
                total: questionFormatted.weight,
                maxTotal: questionFormatted.maxWeight,
                flaggedNos: question.answer === 'FAIL' ? 1 : 0,
                title: subsection.titleLocaled || '',
              });
            else {
              subsectionTotals[subsectionIndex].total +=
                questionFormatted.weight;
              subsectionTotals[subsectionIndex].maxTotal +=
                questionFormatted.maxWeight;
              if (question.answer === 'FAIL')
                subsectionTotals[subsectionIndex].flaggedNos += 1;
            }
          }
          return questionFormatted;
        })
      );

    const questions = completedData.sections
      .flatMap((section) =>
        section.subsections.map((subsection) =>
          subsection.questions.map((question) => ({
            fieldId: question.id,
            answer: question.answer,
            additionalComments: question.additionalComments,
            images:
              question.images?.map(
                (image) => image.response?.[0]?.url || image.url || ''
              ) || [],
            weight:
              question.weights.find(
                (weight) => weight.answer === question.answer
              )?.weight || 0,
            na: question.answer === 'N/A',
            flagged: flaggedArray.has(question.answer || ''),
          }))
        )
      )
      .flat();

    void completeChecklist({
      variables: {
        where: id || '',
        data: {
          draft,
          signature: sign,
          additionalInfo: completedData.additionalInfo,
          total,
          max: maxTotal,
          answers: questions.map((question) => ({
            answer: question.answer,
            fieldId: question.fieldId,
            additionalInfo: question.additionalComments,
            images: question.images,
            weight: question.weight,
            na: question.na,
            flagged: question.flagged,
          })),
        },
      },
    });
  };
  const onFinish = (values: FormData) => {
    saveChecklist(false, values);
  };

  const saveDraft = () => {
    saveChecklist(true);
  };

  return {
    id,
    loading,
    form,
    onFinish,
    data,
    sections,
    saveDraft,
    name,
    file,
    setFile,
    setSign,
    update,
    selectedFont,
    setSelectedFont,
    sign,
    setTab,
    tab,
    submitting,
  };
};

export default useActiveChecklist;
