import { useStoreState } from 'state';
import { useMemo } from 'react';
import { type IntlShape, useIntl } from 'react-intl';
import type { Model } from '../../../graphql/generated';
import { useWorkflowsQuery, WorkflowTrigger } from '../../../graphql/generated';
import type { WorkflowItem } from './types';

interface Return {
  data: WorkflowItem[];
  loading: boolean;
}

const worflowTriggerToReadable = ({
  trigger,
  triggerModels,
  intl,
}: {
  trigger: WorkflowTrigger;
  triggerModels: Model;
  intl: IntlShape;
}) => {
  switch (trigger) {
    case WorkflowTrigger.Created: {
      return intl.formatMessage(
        { defaultMessage: 'When a {triggerModel} is created', id: 'Qjmksz' },
        { triggerModel: triggerModels.toLowerCase() }
      );
    }
    case WorkflowTrigger.Updated: {
      return intl.formatMessage(
        { defaultMessage: 'When a {triggerModel} is updated', id: 'LNGjPe' },
        { triggerModel: triggerModels.toLowerCase() }
      );
    }
    case WorkflowTrigger.Approved: {
      return intl.formatMessage(
        { defaultMessage: 'When a {triggerModel} is approved', id: 'AsU0X4' },
        { triggerModel: triggerModels.toLowerCase() }
      );
    }
    case WorkflowTrigger.Assigned: {
      return intl.formatMessage(
        { defaultMessage: 'When a {triggerModel} is assigned', id: 'v4v120' },
        { triggerModel: triggerModels.toLowerCase() }
      );
    }
    case WorkflowTrigger.Completed: {
      return intl.formatMessage(
        { defaultMessage: 'When a {triggerModel} is completed', id: 'HFWH8J' },
        { triggerModel: triggerModels.toLowerCase() }
      );
    }
    default: {
      return '';
    }
  }
};

const useListWorkflows = (): Return => {
  const { id: currentScheme } = useStoreState((state) => state.scheme);
  const intl = useIntl();
  const { data: initData, loading } = useWorkflowsQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      where: {
        schemes: {
          some: {
            id: {
              equals: currentScheme,
            },
          },
        },
      },
    },
  });

  const data: WorkflowItem[] = useMemo(() => {
    if (initData) {
      const { workflows } = initData;
      return workflows.map((workflow) => ({
        key: workflow.id,
        name: workflow.name,
        triggeredOff: worflowTriggerToReadable({
          trigger: workflow.trigger,
          triggerModels: workflow.triggerModels,
          intl,
        }),

        timesRun: workflow.actions.reduce(
          (acc, action) => acc + (action?.timesRun || 0),
          0
        ),
      }));
    }
    return [];
  }, [initData, intl]);

  return {
    data,
    loading,
  };
};

export default useListWorkflows;
