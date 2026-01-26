/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access */
import type ImportRecord from '@importok/javascript/ImportRecord';

import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { useBusinessesListLazyQuery } from '#/views/settings/businesses/ListBusinesses/graphql/queries/__generated__/list-businesses.generated';
import { useGoodsTypesQuery } from '#/views/settings/data-import/csv/data-import/graphql/queries/__generated__/goods-types.generated';
import { useIncidentImportMutation } from '#/views/settings/data-import/incident-import/__generated__/incident-import.generated';
import saveJsonToUrl from '#/views/settings/data-import/utils/save-json-to-url';
import { GenericProvider } from '@importok/javascript';
import ImportokWizard from '@importok/react';
import { Card } from 'antd';
import { isValid, parse } from 'date-fns';
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
      transformers: 'trim|smartdate',
      validators: 'required|validDateFormat',
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
  const transformers = {
    smartdate(record, key) {
      const raw = record.get(key);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      if (raw === null || raw === '') return raw;

      const s = String(raw).trim();

      // Numeric? Assume Excel
      if (/^\d+(\.\d+)?$/.test(s)) {
        const n = Number(s); // keep time fraction if present
        // Excel serial 1 = 1900-01-01 ⇒ epoch = 1899-12-30 (handles 1900 leap bug)
        const epoch = Date.UTC(1899, 11, 30);
        const d = new Date(epoch + n * 86_400_000);

        // Check if there's a time component (fractional part)
        const hasFractionalPart = n % 1 !== 0;
        if (hasFractionalPart) {
          // Return with time: DD/MM/YYYY HH:mm:ss
          const day = String(d.getUTCDate()).padStart(2, '0');
          const month = String(d.getUTCMonth() + 1).padStart(2, '0');
          const year = d.getUTCFullYear();
          const hours = String(d.getUTCHours()).padStart(2, '0');
          const minutes = String(d.getUTCMinutes()).padStart(2, '0');
          const seconds = String(d.getUTCSeconds()).padStart(2, '0');
          return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
        } else {
          // Return date only: DD/MM/YYYY
          const day = String(d.getUTCDate()).padStart(2, '0');
          const month = String(d.getUTCMonth() + 1).padStart(2, '0');
          const year = d.getUTCFullYear();
          return `${day}/${month}/${year}`;
        }
      }

      // Try common text formats
      const formats = [
        'DD/MM/YYYY HH:mm:ss',
        'DD/MM/YYYY HH:mm',
        'DD/MM/YYYY',
        'DD-MM-YYYY HH:mm:ss',
        'DD-MM-YYYY HH:mm',
        'DD-MM-YYYY',
      ];
      for (const f of formats) {
        const d = parse(s, f, new Date());
        if (isValid(d)) {
          // Check if original format had time component
          const hasTime = f.includes('HH:mm');
          if (hasTime) {
            // Return with time: DD/MM/YYYY HH:mm:ss
            const day = String(d.getDate()).padStart(2, '0');
            const month = String(d.getMonth() + 1).padStart(2, '0');
            const year = d.getFullYear();
            const hours = String(d.getHours()).padStart(2, '0');
            const minutes = String(d.getMinutes()).padStart(2, '0');
            const seconds = String(d.getSeconds()).padStart(2, '0');
            return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
          } else {
            // Return date only: DD/MM/YYYY
            const day = String(d.getDate()).padStart(2, '0');
            const month = String(d.getMonth() + 1).padStart(2, '0');
            const year = d.getFullYear();
            return `${day}/${month}/${year}`;
          }
        }
      }
      return s; // leave as-is; validator will flag it
    },
  };

  /**
   * Custom validators
   * Check https://importok.io/docs/validators for more details
   */
  const validators = {
    validDateFormat(record, key) {
      const value = record.get(key);
      if (!value || value === '') return true; // Allow empty values (required validator handles this)

      const validFormats = [
        'DD/MM/YYYY HH:mm:ss',
        'DD/MM/YYYY HH:mm',
        'DD/MM/YYYY',
        'DD-MM-YYYY HH:mm:ss',
        'DD-MM-YYYY HH:mm',
        'DD-MM-YYYY',
      ];

      const s = String(value).trim();

      // Check if the value matches any of the valid formats exactly
      for (const format of validFormats) {
        const d = parse(s, format, new Date());
        if (isValid(d)) {
          // Additional check: ensure the parsed date formats back to the same string
          // This prevents partial matches
          const day = String(d.getDate()).padStart(2, '0');
          const month = String(d.getMonth() + 1).padStart(2, '0');
          const year = d.getFullYear();

          let expectedFormat;
          if (format.includes('HH:mm:ss')) {
            const hours = String(d.getHours()).padStart(2, '0');
            const minutes = String(d.getMinutes()).padStart(2, '0');
            const seconds = String(d.getSeconds()).padStart(2, '0');
            expectedFormat = format.includes('/')
              ? `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`
              : `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
          } else if (format.includes('HH:mm')) {
            const hours = String(d.getHours()).padStart(2, '0');
            const minutes = String(d.getMinutes()).padStart(2, '0');
            expectedFormat = format.includes('/')
              ? `${day}/${month}/${year} ${hours}:${minutes}`
              : `${day}-${month}-${year} ${hours}:${minutes}`;
          } else {
            expectedFormat = format.includes('/')
              ? `${day}/${month}/${year}`
              : `${day}-${month}-${year}`;
          }

          if (s === expectedFormat) {
            return true;
          }
        }
      }

      return 'Date must be in one of these formats: DD/MM/YYYY, DD/MM/YYYY HH:mm, DD/MM/YYYY HH:mm:ss, DD-MM-YYYY, DD-MM-YYYY HH:mm, or DD-MM-YYYY HH:mm:ss';
    },
  };

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

          return (
            response.data?.businessRelay.edges.map((item) => ({
              label: item.node.name,
              value: item.node.id,
            })) ?? []
          );
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
      ...(typesData
        ? {
            goodsData: new GenericProvider(
              // eslint-disable-next-line unicorn/no-array-reduce
              goodsData?.goodsTypes.reduce((acc, curr) => {
                acc[curr.id] = curr.name;
                return acc;
              }, {}) ?? {}
            ),
            typesData: new GenericProvider(
              // eslint-disable-next-line unicorn/no-array-reduce
              typesData.listIncidentTags.reduce((acc, curr) => {
                acc[curr.value] = curr.label;
                return acc;
              }, {})
            ),
          }
        : {}),
    }),
    [goodsData, typesData, getBusinesses, schemeId]
  );

  /**
   * Push the provided record to the API
   * Check https://importok.io/docs/webhooks for more details
   */

  const onImportReady = async function (records: ImportRecord[]) {
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
