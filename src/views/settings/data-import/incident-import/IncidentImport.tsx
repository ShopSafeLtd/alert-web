import type ImportRecord from '@importok/javascript/ImportRecord';

import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { useBusinessesListLazyQuery } from '#/views/settings/businesses/ListBusinesses/graphql/queries/__generated__/list-businesses.generated';
import { useGoodsTypesQuery } from '#/views/settings/data-import/csv/data-import/graphql/queries/__generated__/goods-types.generated';
import { useIncidentImportMutation } from '#/views/settings/data-import/incident-import/__generated__/incident-import.generated';
import saveJsonToUrl from '#/views/settings/data-import/utils/save-json-to-url';
import { GenericProvider } from '@importok/javascript';
import ImportokWizard from '@importok/react';
import { Card } from 'antd';
import { useListIncidentTagsQuery } from 'graphql/tags/queries/__generated__/list-incident-tags.generated';
import { useAtomValue } from 'jotai/index';
import React, { useMemo } from 'react';
import { useIntl } from 'react-intl';
import { v4 as uuidv4 } from 'uuid';

interface IncidentData {
  businessName?: string;
  crimeReference?: string;
  dateTime: string;
  description: string;
  goodsTypeId?: string;
  groupId?: string;
  offenderDescriptions?: string;
  reference?: string;
  siteNumber?: string;
  tagIds: string;
  typeId: string;
  uuid: string;
  value?: string;
  vehicleColour?: string;
  vehicleMake?: string;
  vehicleModel?: string;
  vehicleRegistration?: string;
}

const IncidentImport = () => {
  const intl = useIntl();
  const schemeId = useAtomValue(currentSchemeIdAtom);

  const { data: goodsData } = useGoodsTypesQuery();
  const { data: typesData } = useListIncidentTagsQuery({
    variables: {
      where: {
        schemeId,
      },
    },
  });
  const [getBusinesses] = useBusinessesListLazyQuery();
  const [processImport] = useIncidentImportMutation();

  /**
   * Import fields to be mapped
   * Check https://importok.io/docs/fields for more details
   */
  const fieldsArray = [
    {
      description: intl.formatMessage({
        defaultMessage:
          'The type of the incident to be imported, this needs to match with the defined incident types in the system.',
      }),
      label: intl.formatMessage({ defaultMessage: 'Type' }),
      name: 'type',
      provider: 'typesData',
      transformers: 'trim|as:typesData',
      validators: 'required|in:typesData',
    },
    {
      description: intl.formatMessage({
        defaultMessage:
          'The name of the business to which the incident belongs to, this needs to match exactly with the existing business name to match the incident to it.',
      }),
      label: intl.formatMessage({ defaultMessage: 'Business Name' }),
      name: 'businessName',
      provider: 'businesses',
      transformers: 'trim',
    },
    {
      label: intl.formatMessage({ defaultMessage: 'Site Number' }),
      name: 'siteNumber',
    },
    {
      description: intl.formatMessage({
        defaultMessage: 'The time and date the incident occurred.',
      }),
      label: intl.formatMessage({ defaultMessage: 'Date & Time' }),
      name: 'date',
      transformers: 'trim',
      validators: 'required',
    },
    {
      description: intl.formatMessage({
        defaultMessage:
          'The description of the incident, this can be a short description of the incident, or a detailed description of the incident, or a combination of both.',
      }),
      label: intl.formatMessage({ defaultMessage: 'Description' }),
      name: 'description',
      validators: 'required',
    },
    {
      description: intl.formatMessage({
        defaultMessage: 'Crime Reference Number provided by the police.',
      }),
      label: intl.formatMessage({ defaultMessage: 'Crime Reference' }),
      name: 'crimeReference',
    },
    {
      label: intl.formatMessage({ defaultMessage: 'Offender Names' }),
      name: 'offenderNames',
    },
    {
      label: intl.formatMessage({ defaultMessage: 'Vehicle Registration' }),
      name: 'vehicleRegistration',
    },
    {
      label: intl.formatMessage({ defaultMessage: 'Vehicle Make' }),
      name: 'vehicleMake',
    },
    {
      label: intl.formatMessage({ defaultMessage: 'Vehicle Model' }),
      name: 'vehicleModel',
    },
    {
      label: intl.formatMessage({ defaultMessage: 'Vehicle Colour' }),
      name: 'vehicleColour',
    },
    {
      description: intl.formatMessage({
        defaultMessage:
          'Any existing reference for the incident, this can be a client defined number, a case number, etc.',
      }),
      label: intl.formatMessage({ defaultMessage: 'Reference' }),
      name: 'reference',
      transformers: 'trim',
      validators: 'unique',
    },
    {
      description: intl.formatMessage({
        defaultMessage:
          'The total value of the goods involved in the incident.',
      }),
      label: intl.formatMessage({ defaultMessage: 'Value' }),
      name: 'value',
      transformers: 'trim|number',
      validators: 'number',
    },
    {
      description: intl.formatMessage({
        defaultMessage:
          'The type of goods involved in the incident, this needs to match with the defined goods types in the system.',
      }),
      label: intl.formatMessage({ defaultMessage: 'Goods Type' }),
      name: 'goodsType',
      provider: 'goodsData|as:goodsData',
      transformers: 'trim',
    },
    {
      description: intl.formatMessage({
        defaultMessage: 'The group to import the incident and offenders into.',
      }),
      label: intl.formatMessage({ defaultMessage: 'Group' }),
      name: 'group',
    },
    {
      label: intl.formatMessage({ defaultMessage: 'Incident Tag' }),
      name: 'tag',
    },
  ];
  /**
   * Custom transformers
   * Check https://importok.io/docs/transformers for more details
   */
  const transformers = {};

  /**
   * Custom validators
   * Check https://importok.io/docs/validators for more details
   */
  const validators = {};

  /**
   * Custom providers
   * Check https://importok.io/docs/data-providers for more details
   */

  const providers = useMemo(
    () => ({
      businesses: {
        async find(query: string) {
          const response = await getBusinesses({
            variables: {
              where: {
                name: {
                  contains: query,
                },
                schemes: {
                  some: {
                    id: {
                      in: [schemeId],
                    },
                  },
                },
              },
            },
          });

          return response.data?.businessRelay.edges.map((item) => ({
            label: item.node.name,
            value: item.node.id,
          }));
        },
        async get(query: string) {
          const response = await getBusinesses({
            variables: {
              where: {
                name: {
                  equals: query,
                },
                schemes: {
                  some: {
                    id: {
                      in: [schemeId],
                    },
                  },
                },
              },
            },
          });

          if (response.data?.businessRelay.edges.length === 0) {
            throw new Error(`No business found for ${query}`);
          }

          return {
            label: response.data?.businessRelay.edges.at(0)?.node?.name ?? '',
            value: response.data?.businessRelay.edges.at(0)?.node?.id ?? '',
          };
        },
      },
      goodsData: typesData
        ? new GenericProvider(
            // eslint-disable-next-line unicorn/no-array-reduce
            goodsData?.goodsTypes.reduce((acc, curr) => {
              acc[curr.id] = curr.name;
              return acc;
            }, {}) ?? {}
          )
        : {},
      typesData: typesData
        ? new GenericProvider(
            // eslint-disable-next-line unicorn/no-array-reduce
            typesData.listIncidentTags.reduce((acc, curr) => {
              acc[curr.value] = curr.label;
              return acc;
            }, {})
          )
        : {},
    }),
    [goodsData, typesData, getBusinesses, schemeId]
  );

  /**
   * Push the provided record to the API
   * Check https://importok.io/docs/webhooks for more details
   */

  const onImportReady = async function (
    records: ImportRecord[],
    meta: unknown
  ) {
    console.log(records, meta);

    const importData: IncidentData[] = records.map((item) => {
      const itemProperties = item.getProperties();

      const typeId = itemProperties['type'];
      const businessName = itemProperties['businessName'];
      const siteNumber = itemProperties['siteNumber'];
      const dateTime = itemProperties['date'];
      const description = itemProperties['description'];
      const crimeReference = itemProperties['crimeReference'];
      const offenderDescriptions = itemProperties['offenderNames'];
      const vehicleRegistration = itemProperties['vehicleRegistration'];
      const vehicleMake = itemProperties['vehicleMake'];
      const vehicleModel = itemProperties['vehicleModel'];
      const vehicleColour = itemProperties['vehicleColour'];
      const reference = itemProperties['reference'];
      const value = itemProperties['value'];
      const goodsTypeId = itemProperties['goodsType'];
      const groupId = itemProperties['group'];
      const tagIds = itemProperties['tag'];

      console.log(itemProperties);
      return {
        businessName,
        crimeReference,
        dateTime,
        description,
        goodsTypeId,
        groupId,
        offenderDescriptions,
        reference,
        siteNumber,
        tagIds,
        typeId,
        uuid: uuidv4(),
        value,
        vehicleColour,
        vehicleMake,
        vehicleModel,
        vehicleRegistration,
      };
    });

    if (importData && importData.length > 0) {
      try {
        const url = await saveJsonToUrl(importData);
        console.log('File uploaded successfully:', url);
        if (!url) {
          throw new Error('File upload failed');
        }
        const result = await processImport({
          variables: {
            data: {
              fileUrl: url,
              skipDuplicateCheck: false,
            },
          },
        });
        for (const [i, record] of records.entries()) {
          const importItem = importData[i];
          const processedItem =
            result.data?.incidentImport.validationErrors?.find(
              (item) => item.uuid === importItem.uuid
            );

          if (processedItem?.message) {
            record.markAsRejected(processedItem.message);
          }
        }
      } catch (error) {
        console.error('Upload failed:', error);
      }
    }
  };

  return (
    <Card style={{ margin: 20 }}>
      {goodsData && typesData ? (
        <ImportokWizard
          fields={Object.fromEntries(
            fieldsArray.map((field) => [field.name, field])
          )}
          onImportReady={onImportReady}
          providers={providers}
          style={`
            .button-primary {
              background-color: #0ea5e9;
            }
            .h-108 {
              height: 78vh;
            }
            .h-100 {
              height: 74vh;
            }
            .bg-white {
              height: 90vh;
            }
            .button-primary:hover {
              background-color: #0369a1;
            }
            .button-link {
              color: #0ea5e9;
            }
            .button-link:hover {
              color: #0369a1;
            }
            .progress-percentage {
              color: #0ea5e9;
            }
          `}
          transformers={transformers}
          validators={validators}
        />
      ) : undefined}
    </Card>
  );
};

export default IncidentImport;
