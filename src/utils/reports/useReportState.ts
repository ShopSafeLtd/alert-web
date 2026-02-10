/* eslint-disable array-bracket-newline */
import type { DateSelectModeType } from '#/components/reports/DateSelect/DateSelect.view';
import type {
  IReportTemplate,
  MetaData,
  SelectOptions,
} from '#/views/reports/types';
import type {
  SchemeReportDetailsQuery,
  SchemeReportDetailsQueryVariables,
} from 'graphql/reports/queries/__generated__/scheme-details.generated';
import type { ReportType as IReportType } from 'graphql/types';
import type RGL from 'react-grid-layout';

import { tableLengthToHeight } from '#/components/reports/utils/utils';
import {
  currentSchemeAtom,
  currentSchemeBusinessesAtom,
  currentSchemeIdAtom,
} from '#/providers/SchemeProvider/SchemeProvider';
import { userIdAtom } from '#/providers/UserProvider/UserProvider';
import arrangeTemplates from '#/utils/reports/setTemplates';
import { notification } from 'antd';
import { useCreateReportTemplateMutation } from 'graphql/reports/mutations/__generated__/create-report-template.generated';
import { useUpdateReportTemplateMutation } from 'graphql/reports/mutations/__generated__/update-report-template.generated';
import { SchemeReportDetailsDocument } from 'graphql/reports/queries/__generated__/scheme-details.generated';
import { useAtomValue } from 'jotai/index';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

interface Props {
  InitLayout: RGL.Layout[];
  InitMetaData: MetaData[];
  ReportType: IReportType;
}

interface Return {
  addLogo: (arg0: string) => void;
  addLogoDrawer: boolean;
  businesses: { demId?: null | string | undefined; id: string; name: string }[];
  changeSize: (arg0: string, arg1: number) => void;
  currentScheme: string;
  dateRange: { endDate: Date; startDate: Date } | undefined;
  dateRangeMode: DateSelectModeType | undefined;
  defaultTemplate: IReportTemplate;
  editMode: boolean;
  filterCount: number;
  filtersOpen: boolean;
  filtersSet: boolean;
  groups: SelectOptions[];
  layout: RGL.Layout[];
  logo: null | string | undefined;
  logos: string[];
  metadata: MetaData[];
  minDrawer: boolean;
  redactOnPrint: boolean;
  removeItem: (arg0: string) => void;
  removeLogo: (arg0: number) => void;
  saveAsDrawer: boolean;
  saveTemplate: (
    name: string,
    method: 'create' | 'update',
    idsToDelete?: string[]
  ) => void;
  saving: boolean;
  selectTemplate: (arg0: string) => void;
  selectedBrands: string[];
  selectedBusiness: string[];
  selectedGroups: string[];
  selectedIncidentTypes: string[];
  selectedIndustries: string[];
  selectedRoles: string[];
  selectedSchemes: string[];
  selectedTemplate: string;
  setAddLogoDrawer: (arg0: boolean) => void;
  setDateRange: (
    dateRange: { endDate: Date; startDate: Date } | undefined,
    mode: DateSelectModeType | undefined
  ) => void;
  setDateRangeMode: (value: DateSelectModeType | undefined) => void;
  setEditMode: (arg0: boolean) => void;
  setFiltersSet: (value: boolean) => void;
  setGroups: (groups: SelectOptions[]) => void;
  setLayout: (layout: RGL.Layout[]) => void;
  setLogos: (logos: string[]) => void;
  setMetadata: (arg0: MetaData[]) => void;
  setMinDrawer: (arg0: boolean) => void;
  setRedactOnPrint: (arg0: boolean) => void;
  setSaveAsDrawer: (arg0: boolean) => void;
  setSelectedBrands: (value: string[]) => void;
  setSelectedBusiness: (businesses: string[]) => void;
  setSelectedGroups: (groups: string[]) => void;
  setSelectedIncidentTypes: (value: string[]) => void;
  setSelectedIndustries: (value: string[]) => void;
  setSelectedRoles: (arg: string[]) => void;
  setSelectedSchemes: (value: string[]) => void;
  setTemplates: (templates: IReportTemplate[]) => void;
  templates: IReportTemplate[];
  toggleFiltersOpen: () => void;
  userId: string;
}

const useReportState = ({
  InitLayout,
  InitMetaData,
  ReportType,
}: Props): Return => {
  const intl = useIntl();
  const userId = useAtomValue(userIdAtom);
  const currentScheme = useAtomValue(currentSchemeIdAtom);
  const logo = useAtomValue(currentSchemeAtom)?.logo?.optimisedPersisted ?? '';
  const isDemo =
    currentScheme === 'ckdhbosuv01028oiblmjgeuii' ||
    currentScheme === 'ck6zhwkwv00019ourjkgk5bdt';
  // new date 2 years ago at 00:00:00
  const startDateDemo = new Date(
    new Date(new Date().setFullYear(new Date().getFullYear() - 2)).setHours(
      0,
      0,
      0
    )
  );

  const initDate = isDemo
    ? startDateDemo
    : new Date(
        new Date(new Date().setMonth(new Date().getMonth() - 1)).setHours(
          0,
          0,
          0
        )
      );
  // const fixedPages = [
  //   {
  //     w: 2,
  //     h: 1,
  //     x: 0,
  //     y: 30,
  //     i: 'pageBreak',
  //     moved: false,
  //     static: true,
  //   },
  //   {
  //     w: 2,
  //     h: 1,
  //     x: 0,
  //     y: 60,
  //     i: 'pageBreak2',
  //     moved: false,
  //     static: true,
  //   },
  //   {
  //     w: 2,
  //     h: 1,
  //     x: 0,
  //     y: 80,
  //     i: 'pageBreak3',
  //     moved: false,
  //     static: true,
  //   },
  // ];

  const businesses = useAtomValue(currentSchemeBusinessesAtom);
  const [filtersSet, setFiltersSet] = useState(false);
  const [filtersOpen, setFilterOpen] = useState(false);
  const [addLogoDrawer, setAddLogoDrawer] = useState(false);
  const [redactOnPrint, setRedactOnPrint] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [minDrawer, setMinDrawer] = useState(false);
  const [layout, setLayout] = useState<RGL.Layout[]>(
    InitLayout.filter(
      (item) =>
        item.i !== 'pageBreak' &&
        item.i !== 'pageBreak2' &&
        item.i !== 'pageBreak3' &&
        item.i !== 'pageBreak4'
    )
  );
  const [saving, setSaving] = useState(false);
  const [selectedSchemes, setSelectedSchemes] = useState<string[]>([
    currentScheme,
  ]);
  const [selectedBusiness, setSelectedBusiness] = useState<string[]>([]);
  const [groups, setGroups] = useState<SelectOptions[]>([]);
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [selectedIncidentTypes, setSelectedIncidentTypes] = useState<string[]>(
    []
  );
  const [dateRangeMode, setDateRangeMode] = useState<
    DateSelectModeType | undefined
  >(undefined);
  const [dateRange, setDateRangeState] = useState<
    | {
        endDate: Date;
        startDate: Date;
      }
    | undefined
  >({
    // today at 23:59:59
    endDate: new Date(new Date().setHours(23, 59, 59)),
    startDate: initDate,
  });
  const [filterCount, setFilterCount] = useState(0);

  useEffect(() => {
    let count = 0;
    if (selectedRoles.length > 0) count += 1;
    if (selectedIndustries.length > 0) count += 1;
    if (selectedBrands.length > 0) count += 1;
    if (selectedBusiness.length > 0) count += 1;

    setFilterCount(count);
  }, [selectedRoles, selectedIndustries, selectedBrands, selectedBusiness]);

  const defaultTemplate: IReportTemplate = {
    default: true,
    id: 'default',
    layout: InitLayout.filter(
      (item) =>
        item.i !== 'pageBreak' &&
        item.i !== 'pageBreak2' &&
        item.i !== 'pageBreak3' &&
        item.i !== 'pageBreak4'
    ),
    metaData: [
      ...InitMetaData,
      {
        key: 'logo',
        type: 'logo',
        urls: logo ? [logo] : [],
      },
    ],
    name: 'Default',
  };

  const [logos, setLogos] = useState<string[]>(logo ? [logo] : []);
  const [metadata, setMetadata] = useState<MetaData[]>(
    defaultTemplate.metaData
  );
  const [templates, setTemplatesState] = useState<IReportTemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const setDateRange = (
    dateRangeInput:
      | {
          endDate: Date;
          startDate: Date;
        }
      | undefined,
    range: DateSelectModeType | undefined
  ): void => {
    if (dateRangeInput) {
      setDateRangeMode(range);
      setDateRangeState({
        endDate: new Date(
          new Date(dateRangeInput.endDate).setHours(23, 59, 59)
        ),
        startDate: new Date(
          new Date(dateRangeInput.startDate).setHours(0, 0, 0)
        ),
      });
    } else {
      setDateRangeMode(undefined);
      setDateRangeState(undefined);
    }
  };

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
    } else {
      setMetadata([
        ...metadata,
        {
          key: 'logo',
          type: 'logo',
          urls: [url],
        },
      ]);
      setAddLogoDrawer(false);
    }
  };

  const selectTemplate = (arg0: string) => {
    const newTemplate = templates.find((item) => item.id === arg0);
    if (newTemplate) {
      setLayout(
        newTemplate.layout.filter(
          (item) => item.i !== 'pageBreak' && item.i !== 'pageBreak2'
        )
      );
      setMetadata(newTemplate.metaData);
      setSelectedTemplate(newTemplate.id);
    }
  };

  const setTemplates = (input: IReportTemplate[]) => {
    setTemplatesState(input);
    if (!selectedTemplate && input.length > 0) {
      const newTemplate = input[0];
      if (newTemplate) {
        setLayout(
          newTemplate.layout.filter(
            (item) => item.i !== 'pageBreak' && item.i !== 'pageBreak2'
          )
        );
        setMetadata(newTemplate.metaData);
        setSelectedTemplate(newTemplate.id);
      }
    }
  };

  const [createReportTemplate] = useCreateReportTemplateMutation({
    onCompleted: (d) => {
      if (d.createReportTemplate) {
        setTemplates([
          ...templates,
          {
            default: false,
            id: d.createReportTemplate.id || '',
            layout:
              (d.createReportTemplate.layout.map((item) => ({
                ...item,
                maxH: item.maxH ?? undefined,
                maxW: item.maxW ?? undefined,
                minH: item.minH ?? undefined,
                minW: item.minW ?? undefined,
              })) as RGL.Layout[]) || [],
            metaData: (d.createReportTemplate.metaData as MetaData[]) || [],
            name: d.createReportTemplate.name || '',
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
          reportTemplatesWhere: {
            type: {
              equals: ReportType,
            },
          },
          schemeWhere: {
            id: currentScheme,
          },
          where: {
            scheme: {
              id: {
                equals: currentScheme,
              },
            },
          },
        },
      });
      if (existingTemplates && d?.createReportTemplate) {
        cache.writeQuery<
          SchemeReportDetailsQuery,
          SchemeReportDetailsQueryVariables
        >({
          data: {
            groups: existingTemplates.groups,
            scheme: {
              ...existingTemplates.scheme,
              reportIcons: [...(existingTemplates.scheme?.reportIcons || [])],
              reportTemplates: [
                ...(existingTemplates?.scheme?.reportTemplates || []),
                {
                  ...d.createReportTemplate,

                  default: false,
                },
              ],
            },
          },
          query: SchemeReportDetailsDocument,
          variables: {
            reportTemplatesWhere: {
              type: {
                equals: ReportType,
              },
            },
            schemeWhere: {
              id: currentScheme,
            },
            where: {
              scheme: {
                id: {
                  equals: currentScheme,
                },
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
          reportTemplatesWhere: {
            type: {
              equals: ReportType,
            },
          },
          schemeWhere: {
            id: currentScheme,
          },
          where: {
            scheme: {
              id: {
                equals: currentScheme,
              },
            },
          },
        },
      });
      if (existingTemplates && d?.updateReportTemplate) {
        arrangeTemplates(
          [
            ...(existingTemplates?.scheme?.reportTemplates
              .filter((item) => item.id !== d.updateReportTemplate?.id)
              .map((template) => ({
                default: template.default,
                id: template.id || '',
                layout:
                  (template.layout.map((item) => ({
                    ...item,
                    maxH: item.maxH ?? undefined,
                    maxW: item.maxW ?? undefined,
                    minH: item.minH ?? undefined,
                    minW: item.minW ?? undefined,
                  })) as RGL.Layout[]) || [],
                metaData: (template.metaData as MetaData[]) || [],
                name: template.name || '',
                type: template.type,
              })) || []),
            {
              default: d.updateReportTemplate.default,
              id: d.updateReportTemplate.id || '',
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              layout:
                (d.updateReportTemplate.layout.map((item) => ({
                  ...item,
                  maxH: item.maxH ?? undefined,
                  maxW: item.maxW ?? undefined,
                  minH: item.minH ?? undefined,
                  minW: item.minW ?? undefined,
                })) as RGL.Layout[]) || [],
              metaData: (d.updateReportTemplate.metaData as MetaData[]) || [],
              name: d.updateReportTemplate.name || '',
              type: d.updateReportTemplate.type,
            },
          ],
          setTemplates
        );

        cache.writeQuery<
          SchemeReportDetailsQuery,
          SchemeReportDetailsQueryVariables
        >({
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
          query: SchemeReportDetailsDocument,
          variables: {
            reportTemplatesWhere: {
              type: {
                equals: ReportType,
              },
            },
            schemeWhere: {
              id: currentScheme,
            },
            where: {
              scheme: {
                id: {
                  equals: currentScheme,
                },
              },
            },
          },
        });
      }
    },
  });

  const [saveAsDrawer, setSaveAsDrawer] = useState(false);

  const saveTemplate = async (
    name: string,
    method: 'create' | 'update',
    idsToDelete?: string[]
  ) => {
    setSaving(true);
    if (method === 'create')
      await createReportTemplate({
        onCompleted: () => {
          notification.success({
            message: intl.formatMessage({
              defaultMessage: 'Report Saved',
            }),
          });
        },
        update: (cache, { data: d }) => {
          const existingTemplates = cache.readQuery<
            SchemeReportDetailsQuery,
            SchemeReportDetailsQueryVariables
          >({
            query: SchemeReportDetailsDocument,
            variables: {
              reportTemplatesWhere: {
                type: {
                  equals: ReportType,
                },
              },
              schemeWhere: {
                id: currentScheme,
              },
              where: {
                scheme: {
                  id: {
                    equals: currentScheme,
                  },
                },
              },
            },
          });
          if (existingTemplates && d?.createReportTemplate) {
            cache.writeQuery<
              SchemeReportDetailsQuery,
              SchemeReportDetailsQueryVariables
            >({
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
              query: SchemeReportDetailsDocument,
              variables: {
                reportTemplatesWhere: {
                  type: {
                    equals: ReportType,
                  },
                },
                schemeWhere: {
                  id: currentScheme,
                },
                where: {
                  scheme: {
                    id: {
                      equals: currentScheme,
                    },
                  },
                },
              },
            });
          }
        },
        variables: {
          data: {
            layout: {
              createMany: {
                data: layout.map((item) => {
                  const { h, i, maxH, maxW, minH, minW, moved, w, x, y } = item;

                  return {
                    h,
                    i,
                    maxH,
                    maxW,
                    minH,
                    minW,
                    moved,
                    static: false,
                    w,
                    x,
                    y,
                  };
                }),
              },
            },
            metaData: metadata,
            name,
            schemes: {
              connect: [
                {
                  id: currentScheme,
                },
              ],
            },
            type: ReportType,
          },
        },
      });

    if (method === 'update') {
      await updateReportTemplate({
        variables: {
          data: {
            layout: {
              createMany: {
                data: layout.map((item) => {
                  const { h, i, maxH, maxW, minH, minW, moved, w, x, y } = item;

                  return {
                    h,
                    i,
                    maxH,
                    maxW,
                    minH,
                    minW,
                    moved,
                    static: false,
                    w,
                    x,
                    y,
                  };
                }),
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
            metaData: metadata,
            schemes: {
              connect: [
                {
                  id: currentScheme,
                },
              ],
            },
          },
          where: {
            id: selectedTemplate,
          },
        },
      });
    }
    setSaving(false);
  };

  const toggleFiltersOpen = () => {
    setFilterOpen(!filtersOpen);
  };

  return {
    addLogo,
    addLogoDrawer,
    businesses: businesses ?? [],
    changeSize,
    currentScheme,
    dateRange,
    dateRangeMode,
    defaultTemplate,
    editMode,
    filterCount,
    filtersOpen,
    filtersSet,
    groups,
    layout: selectedTemplate ? layout : [],
    logo,
    logos,
    metadata,
    minDrawer,
    redactOnPrint,
    removeItem,
    removeLogo,
    saveAsDrawer,
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    saveTemplate,
    saving,
    selectTemplate,
    selectedBrands,
    selectedBusiness,
    selectedGroups,
    selectedIncidentTypes,
    selectedIndustries,
    selectedRoles,
    selectedSchemes,
    selectedTemplate,
    setAddLogoDrawer,
    setDateRange,
    setDateRangeMode,
    setEditMode,
    setFiltersSet,
    setGroups,
    setLayout,
    setLogos,
    setMetadata,
    setMinDrawer,
    setRedactOnPrint,
    setSaveAsDrawer,
    setSelectedBrands,
    setSelectedBusiness,
    setSelectedGroups,
    setSelectedIncidentTypes,
    setSelectedIndustries,
    setSelectedRoles,
    setSelectedSchemes,
    setTemplates,
    templates,
    toggleFiltersOpen,
    userId,
  };
};

export default useReportState;
