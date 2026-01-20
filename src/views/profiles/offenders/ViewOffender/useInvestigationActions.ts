import type { InvestigationData } from 'types/DataType';

import { notification } from 'antd';
import { useUpdateInvestigationOffendersMutation } from 'graphql/investigations/mutations/update/__generated__/update-investigation-offenders.generated';
import { ViewOffenderDocument } from 'graphql/offenders/queries/__generated__/view-offender.generated';
import { useIntl } from 'react-intl';
import errorNotification from 'types/mutation_notifications/error_notification';

interface UseInvestigationActionsParams {
  offenderId: string;
}

interface UseInvestigationActionsReturn {
  handleCreateInvestigation: (investigationId: string) => Promise<void>;
  handleLinkInvestigation: (investigation: InvestigationData) => Promise<void>;
  handleUnlinkInvestigation: (investigationId: string) => Promise<void>;
  linking: boolean;
}

export const useInvestigationActions = ({
  offenderId,
}: UseInvestigationActionsParams): UseInvestigationActionsReturn => {
  const intl = useIntl();
  const [updateInvestigationOffenders, { loading: linking }] =
    useUpdateInvestigationOffendersMutation();

  const variables = {
    where: { id: offenderId },
  };

  const handleCreateInvestigation = async (investigationId: string) => {
    try {
      await updateInvestigationOffenders({
        awaitRefetchQueries: true,
        refetchQueries: [
          {
            query: ViewOffenderDocument,
            variables,
          },
        ],
        variables: {
          id: investigationId,
          offenderIds: [offenderId],
        },
      });

      notification.success({
        message: intl.formatMessage({
          defaultMessage: 'Investigation linked successfully',
        }),
      });
    } catch (error) {
      errorNotification(error);
    }
  };

  const handleLinkInvestigation = async (investigation: InvestigationData) => {
    try {
      await updateInvestigationOffenders({
        awaitRefetchQueries: true,
        refetchQueries: [
          {
            query: ViewOffenderDocument,
            variables,
          },
        ],
        variables: {
          id: investigation.id,
          offenderIds: [offenderId],
        },
      });

      notification.success({
        message: intl.formatMessage({
          defaultMessage: 'Investigation linked successfully',
        }),
      });
    } catch (error) {
      errorNotification(error);
    }
  };

  const handleUnlinkInvestigation = async (investigationId: string) => {
    try {
      await updateInvestigationOffenders({
        awaitRefetchQueries: true,
        refetchQueries: [
          {
            query: ViewOffenderDocument,
            variables,
          },
        ],
        variables: {
          disconnectOffenderIds: [offenderId],
          id: investigationId,
        },
      });

      notification.success({
        message: intl.formatMessage({
          defaultMessage: 'Investigation unlinked successfully',
        }),
      });
    } catch (error) {
      errorNotification(error);
    }
  };

  return {
    handleCreateInvestigation,
    handleLinkInvestigation,
    handleUnlinkInvestigation,
    linking,
  };
};
