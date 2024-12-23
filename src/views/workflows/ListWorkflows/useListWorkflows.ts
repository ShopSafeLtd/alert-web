import { Model, WorkflowTrigger } from '#/graphql/types';
import { useWorkflowsQuery } from '#/views/workflows/graphql/queries/__generated__/list-workflows.generated';
import { useMemo } from 'react';
import { type IntlShape, useIntl } from 'react-intl';
import { useStoreState } from 'state';

import type { WorkflowItem } from './types';

interface Return {
  data: WorkflowItem[];
  loading: boolean;
}

const worflowTriggerToReadable = ({
  intl,
  trigger,
  triggerModels,
}: {
  intl: IntlShape;
  trigger: WorkflowTrigger;
  triggerModels: Model;
}) => {
  if (triggerModels === Model.Offender)
    return intl.formatMessage({
      defaultMessage: 'When an offender is added to an incident',
    });
  switch (trigger) {
    case WorkflowTrigger.Created: {
      return intl.formatMessage(
        { defaultMessage: 'When a {triggerModel} is created' },
        { triggerModel: triggerModels.toLowerCase() }
      );
    }
    case WorkflowTrigger.Updated: {
      return intl.formatMessage(
        { defaultMessage: 'When a {triggerModel} is updated' },
        { triggerModel: triggerModels.toLowerCase() }
      );
    }
    case WorkflowTrigger.Approved: {
      return intl.formatMessage(
        { defaultMessage: 'When a {triggerModel} is approved' },
        { triggerModel: triggerModels.toLowerCase() }
      );
    }
    case WorkflowTrigger.Assigned: {
      return intl.formatMessage(
        { defaultMessage: 'When a {triggerModel} is assigned' },
        { triggerModel: triggerModels.toLowerCase() }
      );
    }
    case WorkflowTrigger.Completed: {
      return intl.formatMessage(
        { defaultMessage: 'When a {triggerModel} is completed' },
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
  const variables = {
    where: {
      schemes: {
        some: {
          id: {
            equals: currentScheme,
          },
        },
      },
    },
  };
  const { data: initData, loading } = useWorkflowsQuery({
    fetchPolicy: 'cache-and-network',
    variables,
  });

  const data: WorkflowItem[] = useMemo(() => {
    if (initData) {
      const { workflows } = initData;
      return workflows.map((workflow) => ({
        key: workflow.id,
        name: workflow.name,
        timesRun: workflow.actions.reduce(
          (acc, action) => acc + (action?.timesRun || 0),
          0
        ),

        triggeredOff: worflowTriggerToReadable({
          intl,
          trigger: workflow.trigger,
          triggerModels: workflow.triggerModels,
        }),
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
