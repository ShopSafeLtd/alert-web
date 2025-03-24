import type { ActionCreator } from 'easy-peasy';

import { type SetUserPayload } from '#/state';

interface HandleSuccessArgs extends SetUserPayload {
  accessToken: string;
  authenticated: ActionCreator<string>;
}

export const handleSuccess = async ({
  accessToken,
  authenticated,
}: // eslint-disable-next-line @typescript-eslint/require-await
HandleSuccessArgs) => {
  authenticated(accessToken);
};
