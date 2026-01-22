import { message } from 'antd';
import { useState } from 'react';

import {
  type CreatePoliceGeographicalAreaMutationVariables,
  useCreatePoliceGeographicalAreaMutation,
} from './graphql/mutations/__generated__/create-geographical-area.generated';
import { useDeletePoliceGeographicalAreaMutation } from './graphql/mutations/__generated__/delete-geographical-area.generated';
import {
  type UpdatePoliceGeographicalAreaMutationVariables,
  useUpdatePoliceGeographicalAreaMutation,
} from './graphql/mutations/__generated__/update-geographical-area.generated';
import {
  type PoliceGeographicalAreasQuery,
  usePoliceGeographicalAreasQuery,
} from './graphql/queries/__generated__/geographical-areas.generated';

export type GeographicalArea =
  PoliceGeographicalAreasQuery['geographicalAreas'][0];

interface UseGeographicalAreasProps {
  schemeId: string;
}

export const useGeographicalAreas = ({
  schemeId,
}: UseGeographicalAreasProps) => {
  const [searchText, setSearchText] = useState('');

  // Query for fetching geographical areas
  const { data, error, loading, refetch } = usePoliceGeographicalAreasQuery({
    fetchPolicy: 'cache-and-network',
    variables: { schemeId },
  });

  // Mutations
  const [createMutation, { loading: creating }] =
    useCreatePoliceGeographicalAreaMutation({
      onCompleted: () => {
        void message.success('Geographical area created successfully');
        void refetch();
      },
      onError: (error) => {
        void message.error(
          `Failed to create geographical area: ${error.message}`
        );
      },
    });

  const [updateMutation, { loading: updating }] =
    useUpdatePoliceGeographicalAreaMutation({
      onCompleted: () => {
        void message.success('Geographical area updated successfully');
        void refetch();
      },
      onError: (error) => {
        void message.error(
          `Failed to update geographical area: ${error.message}`
        );
      },
    });

  const [deleteMutation, { loading: deleting }] =
    useDeletePoliceGeographicalAreaMutation({
      onCompleted: () => {
        void message.success('Geographical area deleted successfully');
        void refetch();
      },
      onError: (error) => {
        void message.error(
          `Failed to delete geographical area: ${error.message}`
        );
      },
    });

  // Filtered areas based on search
  const areas = data?.geographicalAreas || [];
  const filteredAreas = searchText
    ? areas.filter(
        (area) =>
          area.name.toLowerCase().includes(searchText.toLowerCase()) ||
          area.description?.toLowerCase().includes(searchText.toLowerCase())
      )
    : areas;

  // CRUD operations
  const createArea = async (
    input: CreatePoliceGeographicalAreaMutationVariables['data']
  ) => {
    try {
      await createMutation({
        variables: { data: input },
      });
    } catch (error) {
      console.error('Error creating geographical area:', error);
    }
  };

  const updateArea = async (
    id: string,
    input: UpdatePoliceGeographicalAreaMutationVariables['data']
  ) => {
    try {
      await updateMutation({
        variables: { data: input, id },
      });
    } catch (error) {
      console.error('Error updating geographical area:', error);
    }
  };

  const deleteArea = async (id: string) => {
    try {
      await deleteMutation({
        variables: { id },
      });
    } catch (error) {
      console.error('Error deleting geographical area:', error);
    }
  };

  return {
    allAreas: areas,
    areas: filteredAreas,
    createArea,
    creating,
    deleteArea,
    deleting,
    error,
    loading,
    refetch,
    searchText,
    setSearchText,
    updateArea,
    updating,
  };
};
