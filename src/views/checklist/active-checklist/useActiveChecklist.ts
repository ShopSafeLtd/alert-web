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
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useSearchParams } from 'react-router-dom';

import FONT_FAMILIES from '../../../components/onboarding/Onboarding/SchemeTerms/utils/Fonts';
import { adjustDependentThreshold } from '../utils/adjustDependentThreshold';

type SaveStatus = 'error' | 'idle' | 'saved' | 'saving';

interface CompletionStats {
  answeredQuestions: number;
  completionPercentage: number;
  sectionCompletion: Map<
    number,
    { answered: number; percentage: number; total: number }
  >;
  totalQuestions: number;
}

interface Return {
  activeKeys: string[];
  completionStats: CompletionStats;
  data: ActiveChecklistQuery | undefined;
  file: { file: string; name: string } | null;
  form: FormInstance<FormData>;
  id: string | undefined;
  loading: boolean;
  name: string;
  onFinish: (data: FormData) => void;
  saveDraft: () => void;
  saveStatus: SaveStatus;
  sections: ActiveChecklistSection[];
  selectedBusinessId: null | string;
  selectedFont: string;
  setActiveKeys: (keys: string[]) => void;
  setFile: (value: { file: string; name: string } | null) => void;
  setSelectedBusinessId: (value: null | string) => void;
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
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isEditMode = searchParams.get('edit') === 'true';
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
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle');
  const [activeKeys, setActiveKeys] = useState<string[]>(['0']); // First section open by default
  const [selectedBusinessId, setSelectedBusinessId] = useState<null | string>(
    null
  );
  const [completionStats, setCompletionStats] = useState<CompletionStats>({
    answeredQuestions: 0,
    completionPercentage: 0,
    sectionCompletion: new Map(),
    totalQuestions: 0,
  });

  const autoSaveTimerRef = useRef<NodeJS.Timeout | null>(null);
  const saveStatusTimerRef = useRef<NodeJS.Timeout | null>(null);
  const originalSignatureRef = useRef<null | string>(null);
  const originalCompletionDateRef = useRef<null | string>(null);

  const update = (value: string) => {
    setSign(value);
  };

  // Calculate completion statistics
  const calculateCompletion = useCallback(
    (formData: FormData): CompletionStats => {
      let totalQuestions = 0;
      let answeredQuestions = 0;
      const sectionCompletion = new Map<
        number,
        { answered: number; percentage: number; total: number }
      >();

      // Safety check - ensure sections exist
      if (
        !formData ||
        !formData.sections ||
        !Array.isArray(formData.sections)
      ) {
        return {
          answeredQuestions: 0,
          completionPercentage: 0,
          sectionCompletion: new Map(),
          totalQuestions: 0,
        };
      }

      for (const section of formData.sections) {
        let sectionTotal = 0;
        let sectionAnswered = 0;

        for (const subsection of section.subsections) {
          for (const question of subsection.questions) {
            // Skip dependent questions that shouldn't be shown
            if (question.dependent) {
              const dependentQuestion = section.subsections
                .flatMap((s) => s.questions)
                .find((q) => q.ogName === question.dependent?.question);
              if (
                !dependentQuestion ||
                dependentQuestion.answer !== question.dependent.answer
              ) {
                continue; // Skip this question
              }
            }

            sectionTotal += 1;
            totalQuestions += 1;

            // Count as answered if there's a non-empty answer
            if (
              question.answer &&
              question.answer !== '' &&
              question.answer !== null
            ) {
              sectionAnswered += 1;
              answeredQuestions += 1;
            }
          }
        }

        const sectionPercentage =
          sectionTotal > 0 ? (sectionAnswered / sectionTotal) * 100 : 0;
        sectionCompletion.set(section.section, {
          answered: sectionAnswered,
          percentage: Math.round(sectionPercentage),
          total: sectionTotal,
        });
      }

      const completionPercentage =
        totalQuestions > 0
          ? Math.round((answeredQuestions / totalQuestions) * 100)
          : 0;

      return {
        answeredQuestions,
        completionPercentage,
        sectionCompletion,
        totalQuestions,
      };
    },
    []
  );

  const [completeChecklist] = useCompleteChecklistMutation({
    onCompleted: () => {
      setSubmitting(false);
      setSaveStatus('saved');
      // Reset save status after 3 seconds
      if (saveStatusTimerRef.current) {
        clearTimeout(saveStatusTimerRef.current);
      }
      saveStatusTimerRef.current = setTimeout(() => {
        setSaveStatus('idle');
        // If in edit mode, navigate back to completed view
        if (isEditMode) {
          navigate(`/app/checklists/active/${id || ''}`);
        }
      }, 3000);
    },
    onError: () => {
      setSubmitting(false);
      setSaveStatus('error');
      // Reset save status after 5 seconds
      if (saveStatusTimerRef.current) {
        clearTimeout(saveStatusTimerRef.current);
      }
      saveStatusTimerRef.current = setTimeout(() => {
        setSaveStatus('idle');
      }, 5000);
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

    // Helper function to recursively check if a section should be included
    // based on its full dependency chain
    const shouldSectionBeIncluded = (sectionIndex: number): boolean => {
      const section = completedData.sections.find(
        (s) => s.section === sectionIndex && s.sub === false
      );

      if (!section) return false;
      if (!section.dependsOnWeight) return true;

      const dependencyIndex = Number(section.dependsOnWeight.dependsOn);
      const threshold = Number(section.dependsOnWeight.weight);

      // Recursive check: is the parent visible?
      if (!shouldSectionBeIncluded(dependencyIndex)) return false;

      const dependentSection = completedData.sections.find(
        (s) => s.section === dependencyIndex && s.sub === false
      );

      if (!dependentSection) return false;

      // Calculate parent's score
      const dependentTotal = dependentSection.subsections
        .flatMap((sub) =>
          sub.questions.map((q) =>
            q.answer === 'N/A'
              ? 0
              : q.weights.find((w) => w.answer === q.answer)?.weight || 0
          )
        )
        .reduce((a, b) => a + b, 0);

      // Adjust threshold and compare
      const adjustedThreshold = adjustDependentThreshold(
        dependentSection,
        threshold
      );

      return dependentTotal <= adjustedThreshold;
    };

    for (const section of completedData.sections) {
      // Check if section should be included based on full dependency chain
      if (
        section.dependsOnWeight &&
        !shouldSectionBeIncluded(section.section)
      ) {
        continue;
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

    // When editing a completed checklist (isEditMode=true), the backend should preserve:
    // - completedBy (original user who completed it)
    // - completedAt (original completion date)
    // These fields are not part of CompleteActiveChecklistInput and are managed by the backend.
    // By passing the original signature, the backend should recognize this as an edit operation.
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
          businessId: selectedBusinessId,
          draft,
          max: maxTotal,
          // Use original signature if editing a completed checklist, otherwise use current signature
          signature:
            isEditMode && originalSignatureRef.current
              ? originalSignatureRef.current
              : sign,
          total,
        },
        where: id || '',
      },
    });
  };

  // Debounced auto-save function

  const debouncedSave = useCallback(() => {
    // Don't auto-save when editing a completed checklist
    if (isEditMode) {
      return;
    }

    if (autoSaveTimerRef.current) {
      clearTimeout(autoSaveTimerRef.current);
    }

    autoSaveTimerRef.current = setTimeout(() => {
      setSaveStatus('saving');
      saveChecklist(true);
    }, 10_000); // 10 seconds
  }, [isEditMode]);

  // Watch form changes for completion tracking and auto-save
  const formValues = Form.useWatch([], form);

  useEffect(() => {
    if (formValues && sections.length > 0) {
      const stats = calculateCompletion(formValues);
      setCompletionStats(stats);

      // Trigger auto-save
      debouncedSave();
    }
  }, [formValues, sections, calculateCompletion, debouncedSave]);

  // Cleanup timers on unmount
  useEffect(
    () => () => {
      if (autoSaveTimerRef.current) {
        clearTimeout(autoSaveTimerRef.current);
      }
      if (saveStatusTimerRef.current) {
        clearTimeout(saveStatusTimerRef.current);
      }
    },
    []
  );

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

        // eslint-disable-next-line no-unsafe-optional-chaining
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
          sections: sectionsAndSubsections,
        });
        setSections(sectionsAndSubsections as ActiveChecklistSection[]);

        // Set all sections open by default
        const allSectionKeys = sectionsAndSubsections.map((_, index) =>
          index.toString()
        );
        setActiveKeys(allSectionKeys);

        if (initData?.activeChecklist?.signature) {
          setSign(initData.activeChecklist.signature);
        }

        // Initialize selectedBusinessId with current business ID
        if (initData?.activeChecklist?.business?.id) {
          setSelectedBusinessId(initData.activeChecklist.business.id);
        }

        // Store original signature and completion date if editing a completed checklist
        if (isEditMode && initData?.activeChecklist?.status === 'COMPLETED') {
          originalSignatureRef.current =
            initData.activeChecklist.signature || '';
          originalCompletionDateRef.current = initData.activeChecklist
            .completedAt
            ? String(initData.activeChecklist.completedAt)
            : '';
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

  const onFinish = (values: FormData) => {
    saveChecklist(false, values);
  };

  const saveDraft = () => {
    saveChecklist(true);
  };

  console.log(sections);
  return {
    activeKeys,
    completionStats,
    data,
    file,
    form,
    id,
    loading,
    name,
    onFinish,
    saveDraft,
    saveStatus,
    sections,
    selectedBusinessId,
    selectedFont,
    setActiveKeys,
    setFile,
    setSelectedBusinessId,
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
