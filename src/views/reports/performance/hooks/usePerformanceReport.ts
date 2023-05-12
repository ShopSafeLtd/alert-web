import type {
  SchemeReportDetailsQuery,
  SchemeReportDetailsQueryVariables,
} from 'graphql/generated';
import {
  ReportType,
  SchemeReportDetailsDocument,
  useCreateReportTemplateMutation,
  usePerformanceReportQuery,
  useSchemeReportDetailsQuery,
  useUpdateReportTemplateMutation,
} from 'graphql/generated';
import { useStoreState } from 'state';
import { useState } from 'react';
import type RGL from 'react-grid-layout';
import useReportPrint from 'utils/reportPrint/usePrintReports';
import { tableLengthToHeight } from 'components/reports/utils/utils';
import PerformanceLayout, { PerformanceMetaData } from './initLayout';
import type { IReportTemplate, MetaData, SelectOptions } from '../../types';
import type { Props as Return } from './types';

const usePerformanceReport = (): Return => {
  const { componentRef, handlePrint, isPrinting } = useReportPrint();
  const { id: currentScheme, logo } = useStoreState((state) => state.scheme);

  const defaultTemplate: IReportTemplate = {
    id: 'default',
    name: 'Default',
    metaData: [
      ...PerformanceMetaData,
      {
        key: 'logo',
        type: 'logo',
        urls: logo ? [logo] : [],
      },
    ],
    layout: PerformanceLayout,
  };

  const [editMode, setEditMode] = useState(false);
  const [minDrawer, setMinDrawer] = useState(false);
  const [groups, setGroups] = useState<SelectOptions[]>([]);
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const [dateRange, setDateRangeState] = useState<{
    startDate: Date;
    endDate: Date;
  }>({
    startDate: new Date(
      new Date(new Date().setMonth(new Date().getMonth() - 1)).setHours(
        0,
        0,
        59
      )
    ),
    endDate: new Date(new Date().setHours(23, 59, 59)),
  });
  const [layout, setLayout] = useState<RGL.Layout[]>(PerformanceLayout);
  const [addLogoDrawer, setAddLogoDrawer] = useState(false);
  const [logos, setLogos] = useState<string[]>(logo ? [logo] : []);
  const [metadata, setMetadata] = useState<MetaData[]>(
    defaultTemplate.metaData
  );
  const [templates, setTemplates] = useState<IReportTemplate[]>([
    defaultTemplate,
  ]);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('default');

  const { data: reportData, loading: groupsLoading } =
    useSchemeReportDetailsQuery({
      variables: {
        where: {
          scheme: {
            id: {
              equals: currentScheme,
            },
          },
        },
        schemeWhere: {
          id: currentScheme,
        },
        reportTemplatesWhere: {
          type: {
            equals: ReportType.Performance,
          },
        },
      },
      onCompleted: (groupsData) => {
        const groupsFormatted = groupsData.groups.map((group) => ({
          label: group.name,
          value: group.id,
        }));
        setGroups(groupsFormatted);
        setSelectedGroups(groupsFormatted.map((item) => item.value));
        setLogos([
          ...logos,
          ...(groupsData.scheme?.reportIcons?.map(
            (icon) => icon.optimisedPersisted ?? ''
          ) || []),
        ]);
        const importedTemplates: IReportTemplate[] =
          groupsData.scheme?.reportTemplates.map((template) => ({
            id: template.id || '',
            name: template.name || '',
            metaData: template.metaData || [],
            layout:
              (template.layout.map((item) => ({
                ...item,
                maxH: item.maxH ?? undefined,
                maxW: item.maxW ?? undefined,
                minH: item.minH ?? undefined,
                minW: item.minW ?? undefined,
              })) as RGL.Layout[]) || [],
          })) || [];

        setTemplates([defaultTemplate, ...importedTemplates]);
      },
    });

  const { data, loading } = usePerformanceReportQuery({
    fetchPolicy: 'cache-and-network',
    skip:
      !currentScheme ||
      !groups ||
      groupsLoading ||
      !selectedGroups ||
      selectedGroups.filter(Boolean).length === 0,
    variables: {
      where: {
        dateRange,
        schemeIds: [currentScheme],
        groupIds: selectedGroups,
      },
    },
  });

  const setDateRange = (dateRangeInput: {
    startDate: Date;
    endDate: Date;
  }): void => {
    setDateRangeState({
      startDate: new Date(
        new Date(dateRangeInput.startDate).setHours(0, 0, 59)
      ),
      endDate: new Date(new Date(dateRangeInput.endDate).setHours(23, 59, 59)),
    });
  };

  const businessContributionTableData =
    data?.businessContribution?.businessContributions?.map((business, i) => ({
      key: business.name + i,
      fullName: business.name,
      incidentsCreated: business.totalIncidents,
      offendersCreated: business.totalOffenders,
      updatesCreated: business.totalUpdates,
      messagesSent: business.totalMessages,
      logins: business.totalLogins,
      users: business.totalUsers,
    })) || [];

  const userContributionTableData =
    data?.userContributions?.userContributions?.map((user, index) => ({
      key: user.name + index,
      fullName: user.name,
      incidentsCreated: user.totalIncidents,
      offendersCreated: user.totalOffenders,
      updatesCreated: user.totalUpdates,
      messagesSent: user.totalMessages,
      logins: user.totalLogins,
    })) || [];

  const offendersTableData =
    data?.offendersPerformance?.offenderPerformance?.map((offender, i) => ({
      totalIncidents: offender.totalIncidents,
      key: offender.name + i,
      alertId: offender.alertId,
      fullName: offender.name,
      image: offender.primaryPhoto,
      lastIncident: offender.lastIncidentDate
        ? new Date(offender.lastIncidentDate).toLocaleDateString()
        : 'N/A',
      lostValue: offender.totalLostValue.toFixed(2),
      recoveredValue: offender.totalRecoveredValue.toFixed(2),
      successRate: ((offender.totalSuccessRate || 0) * 100).toFixed(2),
    })) || [];

  const crimeGroupPerformanceTableData =
    data?.crimeGroupPerformance?.crimeGroupPerformance?.map(
      (crimeGroup, i) => ({
        totalIncidents: crimeGroup.totalIncidents,
        key: crimeGroup.alias + i,
        alertId: crimeGroup.alertId,
        fullName: crimeGroup.alias,
        totalOffenders: crimeGroup.totalOffenders,
        lostValue: crimeGroup.totalLostValue.toFixed(2),
        lastIncident: crimeGroup.lastIncident
          ? new Date(crimeGroup.lastIncident).toLocaleDateString()
          : '',
        recoveredValue: crimeGroup.totalRecoveredValue.toFixed(2),
        successRate: ((crimeGroup.totalSuccessRate || 0) * 100).toFixed(2),
      })
    ) || [];

  const targetedBusinessData =
    data?.businessContribution?.businessContributions
      ?.filter((business) => business.totalIncidents > 0)

      .map((business, i) => ({
        key: business.name + i,
        fullName: business.name,
        incidentsCreated: business.totalIncidents,
        offendersCreated: business.totalOffenders,
        lostValue: business.totalLostValue.toFixed(2),
        recoveredValue: business.totalRecoveredValue.toFixed(2),
        successRate: ((business.totalSuccessRate || 0) * 100).toFixed(2),
        commonLost: business.mostCommonGoodLost || 'unknown',
        highestValueLost: business.highestTotalValueGoodLost || 0,
        avgLost: business?.averageLossValue?.toFixed(2) || '',
      })) || [];

  const targetedGoodsData =
    data?.targetedGoods?.targetedGoods
      ?.filter((good) => good.totalIncidents > 0)

      .map((good, i) => ({
        key: good.name + i,
        fullName: good.name,
        incidentsCreated: good.totalIncidents,
        offendersCreated: good.totalOffenders,
        lostValue: good.totalLostValue.toFixed(2),
        recoveredValue: good.totalRecoveredValue.toFixed(2),
        successRate: ((good.totalSuccessRate || 0) * 100).toFixed(2),
        avgLost: good?.averageLossValue?.toFixed(2),
      })) || [];

  const removeItem = (item: string) => {
    setLayout(layout.filter((i) => i.i !== item));
  };

  const changeSize = (item: string, size: number) => {
    setLayout(
      layout.map((i) => {
        if (i.i === item) {
          return { ...i, h: tableLengthToHeight(size) };
        }
        return i;
      })
    );
  };

  const removeLogo = (index: number) => {
    const logoArray = metadata?.find((item) => item.key === 'logo');
    if (logoArray) {
      const newLogoArray = logoArray.urls?.filter((item, i) => i !== index);
      setMetadata(
        metadata?.map((item) => {
          if (item.key === 'logo') {
            return { ...item, urls: newLogoArray };
          }
          return item;
        })
      );
    }
  };

  const addLogo = (url: string) => {
    // add to logos array but check if it exists first, if it does don't add it
    const newLogo = logos.find((item) => item === url);
    if (!newLogo) {
      setLogos([...logos, url]);
    }

    const logoArray = metadata?.find((item) => item.key === 'logo');
    if (logoArray) {
      const newLogoArray = logoArray.urls?.concat(url);
      setMetadata(
        metadata?.map((item) => {
          if (item.key === 'logo') {
            return { ...item, urls: newLogoArray };
          }
          return item;
        })
      );
      setAddLogoDrawer(false);
    }
  };

  const selectTemplate = (arg0: string) => {
    const newTemplate = templates.find((item) => item.id === arg0);
    if (newTemplate) {
      setLayout(newTemplate.layout);
      setMetadata(newTemplate.metaData);
      setSelectedTemplate(newTemplate.id);
    }
  };

  const [createReportTemplate] = useCreateReportTemplateMutation({
    onCompleted: (d) => {
      if (d.createReportTemplate) {
        setTemplates([
          ...templates,
          {
            id: d.createReportTemplate.id || '',
            name: d.createReportTemplate.name || '',
            metaData: d.createReportTemplate.metaData || [],
            layout:
              (d.createReportTemplate.layout.map((item) => ({
                ...item,
                maxH: item.maxH ?? undefined,
                maxW: item.maxW ?? undefined,
                minH: item.minH ?? undefined,
                minW: item.minW ?? undefined,
              })) as RGL.Layout[]) || [],
          },
        ]);
        setSelectedTemplate(d.createReportTemplate.id || '');
      }
    },
    update: (cache, { data: d }) => {
      const existingTemplates = cache.readQuery<
        SchemeReportDetailsQuery,
        SchemeReportDetailsQueryVariables
      >({
        query: SchemeReportDetailsDocument,
        variables: {
          where: {
            scheme: {
              id: {
                equals: currentScheme,
              },
            },
          },
          schemeWhere: {
            id: currentScheme,
          },
          reportTemplatesWhere: {
            type: {
              equals: ReportType.Performance,
            },
          },
        },
      });
      if (existingTemplates && d?.createReportTemplate) {
        cache.writeQuery<
          SchemeReportDetailsQuery,
          SchemeReportDetailsQueryVariables
        >({
          query: SchemeReportDetailsDocument,
          data: {
            groups: existingTemplates.groups,
            scheme: {
              ...existingTemplates.scheme,
              reportIcons: [...(existingTemplates.scheme?.reportIcons || [])],
              reportTemplates: [
                ...(existingTemplates?.scheme?.reportTemplates || []),
                d.createReportTemplate,
              ],
            },
          },
          variables: {
            where: {
              scheme: {
                id: {
                  equals: currentScheme,
                },
              },
            },
            schemeWhere: {
              id: currentScheme,
            },
            reportTemplatesWhere: {
              type: {
                equals: ReportType.Performance,
              },
            },
          },
        });
      }
    },
  });

  const [updateReportTemplate] = useUpdateReportTemplateMutation({
    update: (cache, { data: d }) => {
      const existingTemplates = cache.readQuery<
        SchemeReportDetailsQuery,
        SchemeReportDetailsQueryVariables
      >({
        query: SchemeReportDetailsDocument,
        variables: {
          where: {
            scheme: {
              id: {
                equals: currentScheme,
              },
            },
          },
          schemeWhere: {
            id: currentScheme,
          },
          reportTemplatesWhere: {
            type: {
              equals: ReportType.Performance,
            },
          },
        },
      });
      if (existingTemplates && d?.updateReportTemplate) {
        setTemplates([
          defaultTemplate,
          ...(existingTemplates?.scheme?.reportTemplates
            .filter((item) => item.id !== d.updateReportTemplate?.id)
            .map((template) => ({
              id: template.id || '',
              name: template.name || '',
              metaData: template.metaData || [],
              layout:
                (template.layout.map((item) => ({
                  ...item,
                  maxH: item.maxH ?? undefined,
                  maxW: item.maxW ?? undefined,
                  minH: item.minH ?? undefined,
                  minW: item.minW ?? undefined,
                })) as RGL.Layout[]) || [],
            })) || []),
          {
            id: d.updateReportTemplate.id || '',
            name: d.updateReportTemplate.name || '',
            metaData: d.updateReportTemplate.metaData || [],
            layout:
              (d.updateReportTemplate.layout.map((item) => ({
                ...item,
                maxH: item.maxH ?? undefined,
                maxW: item.maxW ?? undefined,
                minH: item.minH ?? undefined,
                minW: item.minW ?? undefined,
              })) as RGL.Layout[]) || [],
          },
        ]);
        cache.writeQuery<
          SchemeReportDetailsQuery,
          SchemeReportDetailsQueryVariables
        >({
          query: SchemeReportDetailsDocument,
          data: {
            groups: existingTemplates.groups,
            scheme: {
              ...existingTemplates.scheme,
              reportIcons: [...(existingTemplates.scheme?.reportIcons || [])],
              reportTemplates: [
                ...(existingTemplates?.scheme?.reportTemplates.filter(
                  (item) => item.id !== d.updateReportTemplate?.id
                ) || []),
                d.updateReportTemplate,
              ],
            },
          },
          variables: {
            where: {
              scheme: {
                id: {
                  equals: currentScheme,
                },
              },
            },
            schemeWhere: {
              id: currentScheme,
            },
            reportTemplatesWhere: {
              type: {
                equals: ReportType.Performance,
              },
            },
          },
        });
      }
    },
  });

  const [saveAsDrawer, setSaveAsDrawer] = useState(false);

  const saveTemplate = async (name: string, method: 'create' | 'update') => {
    if (method === 'create')
      await createReportTemplate({
        variables: {
          data: {
            name,
            metaData: {
              set: metadata,
            },
            schemes: {
              connect: [
                {
                  id: currentScheme,
                },
              ],
            },
            type: ReportType.Performance,
            layout: {
              createMany: {
                data: layout,
              },
            },
          },
        },
        update: (cache, { data: d }) => {
          const existingTemplates = cache.readQuery<
            SchemeReportDetailsQuery,
            SchemeReportDetailsQueryVariables
          >({
            query: SchemeReportDetailsDocument,
            variables: {
              where: {
                scheme: {
                  id: {
                    equals: currentScheme,
                  },
                },
              },
              schemeWhere: {
                id: currentScheme,
              },
              reportTemplatesWhere: {
                type: {
                  equals: ReportType.Performance,
                },
              },
            },
          });
          if (existingTemplates && d?.createReportTemplate) {
            cache.writeQuery<
              SchemeReportDetailsQuery,
              SchemeReportDetailsQueryVariables
            >({
              query: SchemeReportDetailsDocument,
              data: {
                groups: existingTemplates.groups,
                scheme: {
                  ...existingTemplates.scheme,
                  reportIcons: [
                    ...(existingTemplates.scheme?.reportIcons || []),
                  ],
                  reportTemplates: [
                    ...(existingTemplates?.scheme?.reportTemplates || []),
                    d.createReportTemplate,
                  ],
                },
              },
              variables: {
                where: {
                  scheme: {
                    id: {
                      equals: currentScheme,
                    },
                  },
                },
                schemeWhere: {
                  id: currentScheme,
                },
                reportTemplatesWhere: {
                  type: {
                    equals: ReportType.Performance,
                  },
                },
              },
            });
          }
        },
      });

    if (method === 'update') {
      const idsToDelete = reportData?.scheme?.reportTemplates
        .find((item) => item.id === selectedTemplate)
        ?.layout.map((item) => item.id);
      await updateReportTemplate({
        variables: {
          where: {
            id: selectedTemplate,
          },
          data: {
            metaData: {
              set: metadata,
            },
            schemes: {
              connect: [
                {
                  id: currentScheme,
                },
              ],
            },
            layout: {
              createMany: {
                data: layout,
              },
              deleteMany: idsToDelete
                ? [
                    {
                      id: {
                        in: idsToDelete,
                      },
                    },
                  ]
                : undefined,
            },
          },
        },
      });
    }
  };

  return {
    addLogo,
    addLogoDrawer,
    businessContributionTableData,
    changeSize,
    componentRef,
    crimeGroupPerformanceTableData,
    data,
    dateRange,
    editMode,
    groups,
    groupsLoading,
    handlePrint,
    isPrinting,
    layout,
    loading,
    logos,
    metadata,
    minDrawer,
    offendersTableData,
    removeItem,
    removeLogo,
    saveAsDrawer,
    saveTemplate,
    selectTemplate,
    selectedGroups,
    selectedTemplate,
    setAddLogoDrawer,
    setDateRange,
    setEditMode,
    setLayout,
    setMetadata,
    setMinDrawer,
    setSaveAsDrawer,
    setSelectedGroups,
    targetedBusinessData,
    targetedGoodsData,
    templates,
    userContributionTableData,
  };
};

export default usePerformanceReport;
