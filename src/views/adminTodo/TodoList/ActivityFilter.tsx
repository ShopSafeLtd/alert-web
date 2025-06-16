import type { DateSelectModeType } from '#/components/reports/DateSelect/DateSelect.view';

import BusinessesSelect from '#/components/form-components/BusinessesSelect/BusinessesSelect.view';
import GroupsSelect from '#/components/form-components/GroupsSelect/GroupsSelect.view';
import UsersSelect from '#/components/form-components/UsersSelect/UsersSelectFetchMore.view';
import DateSelect from '#/components/reports/DateSelect/DateSelect.view';
import { Form } from 'antd';
import { atom, useAtom } from 'jotai';
import React from 'react';
import { useIntl } from 'react-intl';

export const activityFilterGroupIdsAtom = atom<null | string[] | undefined>([]);
export const activityFilterBusinessIdsAtom = atom<null | string[] | undefined>(
  []
);
export const activityFilterUserIdsAtom = atom<null | string[] | undefined>([]);
export const activityFilterDueDateAtom = atom<{
  range: DateSelectModeType | undefined;
  value: { endDate: Date; startDate: Date } | undefined;
} | null>(null);
export const activityFilterCreatedDateAtom = atom<{
  range: DateSelectModeType | undefined;
  value: { endDate: Date; startDate: Date } | undefined;
} | null>(null);
export const activityFilterCompletedDateAtom = atom<{
  range: DateSelectModeType | undefined;
  value: { endDate: Date; startDate: Date } | undefined;
} | null>(null);

const ActivityFilter = () => {
  const intl = useIntl();
  const [groupIds, setGroupIds] = useAtom(activityFilterGroupIdsAtom);
  const [businessIds, setBusinessIds] = useAtom(activityFilterBusinessIdsAtom);
  const [userIds, setUserIds] = useAtom(activityFilterUserIdsAtom);
  const [dueDate, setDueDate] = useAtom(activityFilterDueDateAtom);
  const [createdDate, setCreatedDate] = useAtom(activityFilterCreatedDateAtom);
  const [completedData, setCompletedDate] = useAtom(
    activityFilterCompletedDateAtom
  );

  return (
    <Form layout="vertical">
      <Form.Item label={intl.formatMessage({ defaultMessage: 'Groups' })}>
        <GroupsSelect
          allowClear
          mode="multiple"
          onChange={setGroupIds}
          showSearch
          style={{ width: '100%' }}
          value={groupIds ?? []}
        />
      </Form.Item>
      <Form.Item label={intl.formatMessage({ defaultMessage: 'Businesses' })}>
        <BusinessesSelect
          allowClear
          mode="multiple"
          onChange={setBusinessIds}
          showSearch
          style={{ width: '100%' }}
          value={businessIds ?? []}
        />
      </Form.Item>
      <Form.Item
        label={intl.formatMessage({ defaultMessage: 'Assigned Users' })}
      >
        <UsersSelect
          allowClear
          mode="multiple"
          onChange={setUserIds}
          showSearch
          style={{ width: '100%' }}
          value={userIds ?? []}
        />
      </Form.Item>
      <Form.Item label={intl.formatMessage({ defaultMessage: 'Due Date' })}>
        <DateSelect
          defaultRange={dueDate?.range}
          onChange={(value, range) => setDueDate({ range, value })}
        />
      </Form.Item>
      <Form.Item label={intl.formatMessage({ defaultMessage: 'Created Date' })}>
        <DateSelect
          defaultRange={createdDate?.range}
          onChange={(value, range) => setCreatedDate({ range, value })}
        />
      </Form.Item>
      <Form.Item
        label={intl.formatMessage({ defaultMessage: 'Completed Date' })}
      >
        <DateSelect
          defaultRange={completedData?.range}
          onChange={(value, range) => setCompletedDate({ range, value })}
        />
      </Form.Item>
    </Form>
  );
};

export default ActivityFilter;
