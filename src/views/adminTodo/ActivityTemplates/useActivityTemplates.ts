import { useDeleteQuestionGroupMutation } from '#/views/adminTodo/graphql/mutations/__generated__/deleteQuestionGroup.generated';
import { useState } from 'react';

import type { ListData } from '../useActivities';

interface Return {
  activityTemplateForm: boolean;
  addActivity: boolean;
  createActivity: (id: null | string) => void;
  deleteQuestion: (id: string) => void;
  onClose: () => void;
  selectedActivity: ListData | null;
  toggleAddTemplate: () => void;
  toggleEdit: (id: null | string) => void;
}

interface Props {
  tableData: ListData[];
  updateTemplates: (
    item: ListData,
    type: 'create' | 'delete' | 'update'
  ) => void;
}

const useActivityTemplates = ({
  tableData,
  updateTemplates,
}: Props): Return => {
  const [addActivity, setAddActivity] = useState(false);
  const [activityTemplateForm, setActivityTemplateForm] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<ListData | null>(
    null
  );

  const onClose = () => {
    setAddActivity(false);
    setActivityTemplateForm(false);
    setSelectedActivity(null);
  };

  const toggleAddTemplate = () => {
    setActivityTemplateForm(!activityTemplateForm);
  };

  const toggleEdit = (id: null | string) => {
    if (id) {
      setSelectedActivity(tableData.find((item) => item.id === id) || null);
      setActivityTemplateForm(true);
    } else {
      setActivityTemplateForm(false);
      setSelectedActivity(null);
    }
  };

  const createActivity = (id: null | string) => {
    if (id) {
      setSelectedActivity(tableData.find((item) => item.id === id) || null);
      setAddActivity(true);
    } else {
      setAddActivity(false);
      setSelectedActivity(null);
    }
  };

  const [deleteTemplate] = useDeleteQuestionGroupMutation();

  const deleteQuestion = (id: string) => {
    void deleteTemplate({
      variables: {
        where: {
          id,
        },
      },
    });
    const found = tableData.find((item) => item.id === id);
    if (!found) return;
    updateTemplates(found, 'delete');
  };

  return {
    activityTemplateForm,
    addActivity,
    createActivity,
    deleteQuestion,
    onClose,
    selectedActivity,
    toggleAddTemplate,
    toggleEdit,
  };
};

export default useActivityTemplates;
