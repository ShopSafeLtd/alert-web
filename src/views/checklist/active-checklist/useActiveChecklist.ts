import type { ActiveChecklistQuery } from '#/views/checklist/graphql/queries/__generated__/view-active-checklist.generated';
import type { ActiveChecklist } from 'graphql/types';

import { currentUserAtom } from '#/providers/UserProvider/UserProvider';
import { useCompleteChecklistMutation } from '#/views/checklist/graphql/mutations/__generated__/complete-checklist.generated';
import {
  ActiveChecklistDocument,
  useActiveChecklistQuery,
} from '#/views/checklist/graphql/queries/__generated__/view-active-checklist.generated';
import { Form, type FormInstance } from 'antd';
import { useAtomValue } from 'jotai/index';
import { useState } from 'react';
import { useParams } from 'react-router';

import FONT_FAMILIES from '../../../components/onboarding/Onboarding/SchemeTerms/utils/Fonts';

interface Return {
  data: ActiveChecklistQuery | undefined;
  file: { file: string; name: string } | null;
  form: FormInstance<FormData>;
  id: string | undefined;
  loading: boolean;
  name: string;
  onFinish: (data: FormData) => void;
  saveDraft: () => void;
  sections: ActiveChecklistSection[];
  selectedFont: string;
  setFile: (value: { file: string; name: string } | null) => void;
  setSelectedFont: (value: string) => void;
  setSign: (value: string) => void;
  setTab: (value: string) => void;
  sign: string;
  submitting: boolean;
  tab: string;
  update: (value: string) => void;
}

export interface FormData {
  additionalInfo?: string;
  sections: ActiveChecklistSection[];
}

export interface ActiveChecklistSection {
  dependsOnWeight?: { dependsOn: string; weight: string } | null;
  section: number;
  sub: boolean;
  subsection?: null | number;
  subsections: ActiveChecklistSubsection[];
  titleLocaled: string;
}

interface ActiveChecklistSubsection {
  questions: ActiveChecklistField[];
  section: number;
  sub: boolean;
  subsection?: null | number;
  titleLocaled: string;
}

interface ActiveChecklistField {
  additionalComments?: null | string;
  answer: null | string;
  availableAnswers: AvailableAnswer[];
  dependent?: {
    answer: string;
    question: string;
  } | null;
  id: string;
  images?:
    | {
        name: string;
        response?: { url: string }[];
        status: string;
        uid: string;
        url?: string;
      }[]
    | null;
  ogName: string;
  order: number;
  question: LocalizedString;
  section: number;
  subsection: number;
  type: string;
  weights: Weight[];
}

interface LocalizedString {
  [key: string]: string;
}

interface AvailableAnswer {
  answer: string;
  id?: string;
  questionId?: string;
  weight: number;
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
  const name = useAtomValue(currentUserAtom)?.fullName ?? '';
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
                  questionsMap
                    .get(section.section)
                    ?.get(subsection.subsection || 1)
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
                    additionalComments:
                      question?.answer?.additionalComments || '',
                    answer: question?.answer?.answer || '',
                    availableAnswers: (question?.availableAnswers ||
                      []) as AvailableAnswer[],
                    images:
                      question?.answer?.images?.map((image, index) => ({
                        name: `image-${index + 1}`,
                        status: 'done',
                        uid: `-${index + 1}`,
                        url: image,
                      })) || [],
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    ogName: question.question.og || '',
                    weights:
                      question.availableAnswers?.map((weight) => ({
                        answer: (weight.answer as string) || '',
                        weight: (weight.weight as number) || 0,
                      })) || [],
                  })),
                };
              }) || [],
          };
        });

        form.setFieldsValue({
          additionalInfo: initData?.activeChecklist?.comments || '',
          // @ts-expect-error type error with generics
          sections: sectionsAndSubsections,
        });
        setSections(sectionsAndSubsections as ActiveChecklistSection[]);
        if (initData?.activeChecklist?.signature) {
          setSign(initData.activeChecklist.signature);
        }
      } catch (error) {
        console.log(error);
      }
    },
    variables: {
      where: {
        id: id || '',
      },
    },
  });

  const [completeChecklist] = useCompleteChecklistMutation({
    onCompleted: () => {
      setSubmitting(false);
    },
    onError: () => {
      setSubmitting(false);
    },
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
          data: {
            activeChecklist: newActiveChecklist,
          },
          query: ActiveChecklistDocument,
          variables: {
            where: {
              id: id || '',
            },
          },
        });
      } catch (error) {
        console.log(error);
      }
    },
  });

  const saveChecklist = (draft: boolean, formData?: FormData) => {
    setSubmitting(true);
    const completedData = formData || form.getFieldsValue();

    let total = 0;
    let maxTotal = 0;
    const sectionTotals: {
      flaggedNos: number;
      maxTotal: number;
      section: number;
      title: string;
      total: number;
    }[] = [];
    const subsectionTotals: {
      flaggedNos: number;
      maxTotal: number;
      section: number;
      subsection: number;
      title: string;
      total: number;
    }[] = [];

    for (const section of completedData.sections) {
      // If the section has a dependency, check if the dependent section meets the threshold.
      if (section.dependsOnWeight) {
        const dependencyIndex = Number(section.dependsOnWeight.dependsOn);
        const threshold = Number(section.dependsOnWeight.weight);
        const dependentSection = completedData.sections.find(
          (s) => s.section === dependencyIndex && s.sub === false
        );
        if (dependentSection) {
          const dependentTotal = dependentSection.subsections
            .flatMap((sub) =>
              sub.questions.map((q) =>
                q.answer === 'N/A'
                  ? 0
                  : q.weights.find((w) => w.answer === q.answer)?.weight || 0
              )
            )
            .reduce((a, b) => a + b, 0);
          if (dependentTotal < threshold) {
            continue;
          }
        } else {
          continue;
        }
      }
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
            answer: question.answer || '',
            flagged: unusedDep ? false : question.answer === 'FAIL',
            id: question.id,
            maxWeight:
              question.weights.sort((a, b) => b.weight - a.weight)[0]?.weight ||
              0,
            na: question.answer === 'N/A' || unusedDep,
            section: section.section,
            subsection: subsection.subsection || 0,
            weight:
              question.weights.find(
                (weight) => weight.answer === question.answer
              )?.weight || 0,
          };

          if (!questionFormatted.na) {
            total += questionFormatted.weight;
            maxTotal += questionFormatted.maxWeight;
            const sectionIndex = sectionTotals.findIndex(
              (sectionTotal) => sectionTotal.section === section.section
            );
            if (sectionIndex === -1)
              sectionTotals.push({
                flaggedNos: question.answer === 'FAIL' ? 1 : 0,
                maxTotal: questionFormatted.maxWeight,
                section: section.section,
                title: section.titleLocaled || '',
                total: questionFormatted.weight,
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
                flaggedNos: question.answer === 'FAIL' ? 1 : 0,
                maxTotal: questionFormatted.maxWeight,
                section: section.section,
                subsection: subsection.subsection || 0,
                title: subsection.titleLocaled || '',
                total: questionFormatted.weight,
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
    }

    const questions = completedData.sections
      .flatMap((section) =>
        section.subsections.map((subsection) =>
          subsection.questions.map((question) => ({
            additionalComments: question.additionalComments,
            answer: question.answer,
            fieldId: question.id,
            flagged: flaggedArray.has(question.answer || ''),
            images:
              question.images?.map(
                (image) => image.response?.[0]?.url || image.url || ''
              ) || [],
            na: question.answer === 'N/A',
            weight:
              question.weights.find(
                (weight) => weight.answer === question.answer
              )?.weight || 0,
          }))
        )
      )
      .flat();

    void completeChecklist({
      variables: {
        data: {
          additionalInfo: completedData.additionalInfo,
          answers: questions.map((question) => ({
            additionalInfo: question.additionalComments,
            answer: question.answer,
            fieldId: question.fieldId,
            flagged: question.flagged,
            images: question.images,
            na: question.na,
            weight: question.weight,
          })),
          draft,
          max: maxTotal,
          signature: sign,
          total,
        },
        where: id || '',
      },
    });
  };
  const onFinish = (values: FormData) => {
    saveChecklist(false, values);
  };

  const saveDraft = () => {
    saveChecklist(true);
  };

  console.log(sections);

  return {
    data,
    file,
    form,
    id,
    loading,
    name,
    onFinish,
    saveDraft,
    sections,
    selectedFont,
    setFile,
    setSelectedFont,
    setSign,
    setTab,
    sign,
    submitting,
    tab,
    update,
  };
};

export default useActiveChecklist;
