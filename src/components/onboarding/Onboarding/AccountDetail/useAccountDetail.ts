import { useStoreState } from '#/state';
import { useUserSettingsQuery } from '#/components/onboarding/Onboarding/AccountDetail/graphql/qureries/user-settings.generated';

export interface AccountData {
  fullName: string;
  subscribedIncidentOnly: boolean;
  incidentEmail: boolean;
  incidentPush: boolean;
  subscribedOffenderOnly: boolean;
  offenderEmail: boolean;
  offenderPush: boolean;
}
interface Props {
  update: (value: AccountData | undefined) => void;
  accountDetail: AccountData | undefined;
}
interface Return {
  onSubmit: (value: AccountData) => void;
  data: AccountData;
  loading: boolean;
}

const useEditUser = ({ update, accountDetail }: Props): Return => {
  const { fullName } = useStoreState((state) => state.user);
  const onSubmit = (data: AccountData) => {
    update(data);
  };

  const { data: userData, loading } = useUserSettingsQuery();

  const {
    subscribedIncidentOnly,
    incidentEmail,
    incidentPush,
    subscribedOffenderOnly,
    offenderEmail,
    offenderPush,
  } = accountDetail ||
    userData?.currentUser || {
      subscribedIncidentOnly: true,
      incidentEmail: false,
      incidentPush: true,
      subscribedOffenderOnly: true,
      offenderEmail: false,
      offenderPush: true,
      messagePush: true,
    };
  const data = {
    fullName,
    subscribedIncidentOnly,
    incidentEmail,
    incidentPush,
    subscribedOffenderOnly,
    offenderEmail,
    offenderPush,
  };

  //   messagePush: true,
  return {
    data,
    onSubmit,
    loading,
  };
};

export default useEditUser;
