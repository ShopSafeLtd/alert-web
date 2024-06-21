import { useState } from 'react';
import type { ListData } from '../useActivities';
import { useDeleteQuestionGroupMutation } from '#/views/adminTodo/graphql/mutations/deleteQuestionGroup.generated';

interface Return {
  toggleAddTemplate: () => void;
  createActivity: (id: string | null) => void;
  toggleEdit: (id: string | null) => void;
  deleteQuestion: (id: string) => void;
  addActivity: boolean;
  onClose: () => void;
  selectedActivity: ListData | null;
  activityTemplateForm: boolean;
}

interface Props {
  tableData: ListData[];
  updateTemplates: (
    item: ListData,
    type: 'create' | 'update' | 'delete'
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

  const toggleEdit = (id: string | null) => {
    if (id) {
      setSelectedActivity(tableData.find((item) => item.id === id) || null);
      setActivityTemplateForm(true);
    } else {
      setActivityTemplateForm(false);
      setSelectedActivity(null);
    }
  };

  const createActivity = (id: string | null) => {
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
    toggleAddTemplate,
    createActivity,
    toggleEdit,
    deleteQuestion,
    addActivity,
    onClose,
    selectedActivity,
    activityTemplateForm,
  };
};

export default useActivityTemplates;
