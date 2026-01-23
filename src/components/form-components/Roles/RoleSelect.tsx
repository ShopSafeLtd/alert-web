import type { ValueType } from '#/components/form-components/BusinessesSelect/BusinessesSelect.view';
import type { SelectOptions } from '#/types/DataType';

import { useUserRolesQuery } from '#/components/form-components/user/graphql/queries/__generated__/custom-roles.generated';
import { Select } from 'antd';
import React, { useState } from 'react';

const RoleSelect = ({
  multi = false,
  onChange,
  roleId,
  schemeId,
  value,
}: {
  multi?: boolean;
  onChange?: (arg0: ValueType) => void;
  roleId?: string;
  schemeId: string;
  value?: ValueType;
}) => {
  const [availableRoles, setAvailableRoles] = useState<SelectOptions[]>([]);

  const { loading: rolesLoading } = useUserRolesQuery({
    fetchPolicy: 'cache-and-network',
    onCompleted: ({ roles }) => {
      const rolesFormatted = roles.edges.map(({ node: role }) => ({
        label: role.name,
        value: role.id,
      }));
      setAvailableRoles(rolesFormatted);
    },

    skip: !schemeId,
    variables: {
      roleId,
      schemeId,
      take: 1000,
    },
  });

  if (rolesLoading) return <Select loading={true} />;
  return (
    <Select
      // disabled={availableRoles.length === 0}
      loading={rolesLoading}
      mode={multi ? 'multiple' : undefined}
      onChange={onChange}
      options={availableRoles}
      value={value}
    />
  );
};

export default RoleSelect;
