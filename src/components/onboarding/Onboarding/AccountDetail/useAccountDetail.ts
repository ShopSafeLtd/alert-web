import { useUserSettingsQuery } from '#/components/onboarding/Onboarding/AccountDetail/graphql/qureries/__generated__/user-settings.generated';
import { useStoreState } from '#/state';

export interface AccountData {
  fullName: string;
  incidentEmail: boolean;
  incidentPush: boolean;
  offenderEmail: boolean;
  offenderPush: boolean;
  subscribedIncidentOnly: boolean;
  subscribedOffenderOnly: boolean;
}
interface Props {
  accountDetail: AccountData | undefined;
  update: (value: AccountData | undefined) => void;
}
interface Return {
  data: AccountData;
  loading: boolean;
  onSubmit: (value: AccountData) => void;
}

const useEditUser = ({ accountDetail, update }: Props): Return => {
  const { fullName } = useStoreState((state) => state.user);
  const onSubmit = (data: AccountData) => {
    update(data);
  };

  const { data: userData, loading } = useUserSettingsQuery();

  const {
    incidentEmail,
    incidentPush,
    offenderEmail,
    offenderPush,
    subscribedIncidentOnly,
    subscribedOffenderOnly,
  } = accountDetail ||
    userData?.currentUser || {
      incidentEmail: false,
      incidentPush: true,
      messagePush: true,
      offenderEmail: false,
      offenderPush: true,
      subscribedIncidentOnly: true,
      subscribedOffenderOnly: true,
    };
  const data = {
    fullName,
    incidentEmail,
    incidentPush,
    offenderEmail,
    offenderPush,
    subscribedIncidentOnly,
    subscribedOffenderOnly,
  };

  //   messagePush: true,
  return {
    data,
    loading,
    onSubmit,
  };
};

export default useEditUser;
