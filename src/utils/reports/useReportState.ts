import { useEffect, useState } from 'react';
import type RGL from 'react-grid-layout';
import arrangeTemplates from '#/utils/reports/setTemplates';
import { useStoreState } from '#/state';
import type {
  IReportTemplate,
  MetaData,
  SelectOptions,
} from '#/views/reports/types';
import { tableLengthToHeight } from '#/components/reports/utils/utils';
import {
  SchemeReportDetailsDocument,
  useCreateReportTemplateMutation,
  useSetDefaultTemplateMutation,
  useUpdateReportTemplateMutation,
} from 'graphql/generated';
import type {
  ReportType as IReportType,
  SchemeReportDetailsQuery,
  SchemeReportDetailsQueryVariables,
} from '../../graphql/generated';

interface Props {
  InitLayout: RGL.Layout[];
  InitMetaData: MetaData[];
  ReportType: IReportType;
}

interface Return {
  addLogo: (arg0: string) => void;
  addLogoDrawer: boolean;
  logos: string[];
  metadata: MetaData[];
  removeLogo: (arg0: number) => void;
  saveAsDrawer: boolean;
  saveTemplate: (
    name: string,
    method: 'create' | 'update',
    idsToDelete?: string[]
  ) => void;
  selectTemplate: (arg0: string) => void;
  selectedTemplate: string;
  setMetadata: (arg0: MetaData[]) => void;
  setAddLogoDrawer: (arg0: boolean) => void;
  setSaveAsDrawer: (arg0: boolean) => void;
  templates: IReportTemplate[];
  editMode: boolean;
  setEditMode: (arg0: boolean) => void;
  layout: RGL.Layout[];
  setLayout: (layout: RGL.Layout[]) => void;
  minDrawer: boolean;
  setMinDrawer: (arg0: boolean) => void;
  logo: string | null | undefined;
  removeItem: (arg0: string) => void;
  changeSize: (arg0: string, arg1: number) => void;
  selectedGroups: string[];
  selectedBusiness: string[];
  setSelectedBusiness: (businesses: string[]) => void;
  businesses: { name: string; id: string; demId?: string | null | undefined }[];
  groups: SelectOptions[];
  dateRange: { startDate: Date; endDate: Date };
  setDateRange: (dateRange: { startDate: Date; endDate: Date }) => void;
  setSelectedGroups: (groups: string[]) => void;
  setGroups: (groups: SelectOptions[]) => void;
  currentScheme: string;
  setTemplates: (templates: IReportTemplate[]) => void;
  defaultTemplate: IReportTemplate;
  setLogos: (logos: string[]) => void;
  selectedBrands: string[];
  setSelectedBrands: (value: string[]) => void;
  selectedIndustries: string[];
  setSelectedIndustries: (value: string[]) => void;
  redactOnPrint: boolean;
  setRedactOnPrint: (arg0: boolean) => void;
  filtersOpen: boolean;
  toggleFiltersOpen: () => void;
  selectedRoles: string[];
  setSelectedRoles: (arg: string[]) => void;
  filterCount: number;
  setAsDefault: (arg0: {
    templateId: string;
    type: IReportType;
    default: boolean;
  }) => void;
}

const useReportState = ({
  InitLayout,
  InitMetaData,
  ReportType,
}: Props): Return => {
  const { id: currentScheme, logo } = useStoreState((state) => state.scheme);
  const isDemo =
    currentScheme === 'ckdhbosuv01028oiblmjgeuii' ||
    currentScheme === 'ck6zhwkwv00019ourjkgk5bdt';
  // new date 2 years ago at 00:00:00
  const startDateDemo = new Date(
    new Date(new Date().setFullYear(new Date().getFullYear() - 2)).setHours(
      0,
      0,
      59
    )
  );

  const initDate = isDemo
    ? startDateDemo
    : new Date(
        new Date(new Date().setMonth(new Date().getMonth() - 1)).setHours(
          0,
          0,
          59
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

  const businesses = useStoreState((state) => state.user.businesses);
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
  const [selectedBusiness, setSelectedBusiness] = useState<string[]>([]);
  const [groups, setGroups] = useState<SelectOptions[]>([]);
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [dateRange, setDateRangeState] = useState<{
    startDate: Date;
    endDate: Date;
  }>({
    startDate: initDate,
    // today at 23:59:59
    endDate: new Date(new Date().setHours(23, 59, 59)),
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
    id: 'default',
    name: 'Default',
    default: true,
    metaData: [
      ...InitMetaData,
      {
        key: 'logo',
        type: 'logo',
        urls: logo ? [logo] : [],
      },
    ],
    layout: InitLayout.filter(
      (item) =>
        item.i !== 'pageBreak' &&
        item.i !== 'pageBreak2' &&
        item.i !== 'pageBreak3' &&
        item.i !== 'pageBreak4'
    ),
  };

  const [logos, setLogos] = useState<string[]>(logo ? [logo] : []);
  const [metadata, setMetadata] = useState<MetaData[]>(
    defaultTemplate.metaData
  );
  const [templates, setTemplatesState] = useState<IReportTemplate[]>([
    // defaultTemplate,
  ]);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');

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
            id: d.createReportTemplate.id || '',
            name: d.createReportTemplate.name || '',
            metaData: (d.createReportTemplate.metaData as MetaData[]) || [],
            default: false,
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
              equals: ReportType,
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
                {
                  ...d.createReportTemplate,

                  default: false,
                },
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
                equals: ReportType,
              },
            },
          },
        });
      }
    },
  });

  const [setAsDefaultMutation] = useSetDefaultTemplateMutation({
    onCompleted: (d) => {
      const updatedTemps = [
        ...(templates?.map((template) => {
          const isNew = template.id === d?.setDefaultTemplate?.id;
          return {
            ...template,
            id: template.id || '',
            name: template.name || '',
            metaData: template.metaData || [],
            default: isNew ? !!d?.setDefaultTemplate?.default : false,
            type: ReportType,
            layout:
              template.layout.map((item) => ({
                ...item,
                maxH: item.maxH ?? undefined,
                maxW: item.maxW ?? undefined,
                minH: item.minH ?? undefined,
                minW: item.minW ?? undefined,
              })) || [],
          };
        }) || []),
      ];
      arrangeTemplates(updatedTemps, defaultTemplate, setTemplates);
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
              equals: ReportType,
            },
          },
        },
      });
      if (existingTemplates && d?.setDefaultTemplate) {
        const updatedTemps = [
          ...(existingTemplates?.scheme?.reportTemplates.map((template) => {
            const isNew = template.id === d?.setDefaultTemplate?.id;
            return {
              ...template,
              id: template.id || '',
              name: template.name || '',
              metaData: (template.metaData as MetaData[]) || [],
              default: isNew ? !!d?.setDefaultTemplate?.default : false,
              type: template.type,
              layout:
                template.layout.map((item) => ({
                  ...item,
                  maxH: item.maxH ?? undefined,
                  maxW: item.maxW ?? undefined,
                  minH: item.minH ?? undefined,
                  minW: item.minW ?? undefined,
                })) || [],
            };
          }) || []),
        ];

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
              reportTemplates: updatedTemps,
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
                equals: ReportType,
              },
            },
          },
        });
      }
    },
  });
  const setAsDefault = (arg0: {
    templateId: string;
    type: IReportType;
    default: boolean;
  }) => {
    void setAsDefaultMutation({
      variables: {
        data: arg0,
      },
    });
  };
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
              equals: ReportType,
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
                id: template.id || '',
                name: template.name || '',
                metaData: (template.metaData as MetaData[]) || [],
                default: template.default,
                type: template.type,
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
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              metaData: (d.updateReportTemplate.metaData as MetaData[]) || [],
              default: d.updateReportTemplate.default,
              type: d.updateReportTemplate.type,
              layout:
                (d.updateReportTemplate.layout.map((item) => ({
                  ...item,
                  maxH: item.maxH ?? undefined,
                  maxW: item.maxW ?? undefined,
                  minH: item.minH ?? undefined,
                  minW: item.minW ?? undefined,
                })) as RGL.Layout[]) || [],
            },
          ],
          defaultTemplate,
          setTemplates
        );

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
                equals: ReportType,
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
    if (method === 'create')
      await createReportTemplate({
        variables: {
          data: {
            name,
            metaData: metadata,
            schemes: {
              connect: [
                {
                  id: currentScheme,
                },
              ],
            },
            type: ReportType,
            layout: {
              createMany: {
                data: layout.map((item) => {
                  const { i, x, y, w, h, minW, minH, maxW, maxH, moved } = item;

                  return {
                    i,
                    x,
                    y,
                    w,
                    h,
                    minW,
                    minH,
                    maxW,
                    maxH,
                    static: true,
                    moved,
                  };
                }),
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
                  equals: ReportType,
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
                    equals: ReportType,
                  },
                },
              },
            });
          }
        },
      });

    if (method === 'update') {
      await updateReportTemplate({
        variables: {
          where: {
            id: selectedTemplate,
          },
          data: {
            metaData: metadata,
            schemes: {
              connect: [
                {
                  id: currentScheme,
                },
              ],
            },
            layout: {
              createMany: {
                data: layout.map((item) => {
                  const {
                    i,
                    x,
                    y,
                    w,
                    h,
                    minW,
                    minH,
                    maxW,
                    maxH,
                    static: staticVal,
                    moved,
                  } = item;

                  return {
                    i,
                    x,
                    y,
                    w,
                    h,
                    minW,
                    minH,
                    maxW,
                    maxH,
                    static: staticVal,
                    moved,
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
          },
        },
      });
    }
  };

  const toggleFiltersOpen = () => {
    setFilterOpen(!filtersOpen);
  };

  return {
    addLogo,
    addLogoDrawer,
    logos,
    metadata,
    removeLogo,
    saveAsDrawer,
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    saveTemplate,
    selectTemplate,
    selectedTemplate,
    setMetadata,
    setAddLogoDrawer,
    setSaveAsDrawer,
    templates,
    editMode,
    setEditMode,
    layout,
    setLayout,
    minDrawer,
    setMinDrawer,
    logo,
    removeItem,
    changeSize,
    selectedGroups,
    selectedBusiness,
    setSelectedBusiness,
    businesses,
    groups,
    dateRange,
    setDateRange,
    setSelectedGroups,
    setGroups,
    currentScheme,
    setTemplates,
    defaultTemplate,
    setLogos,
    selectedBrands,
    setSelectedBrands,
    selectedIndustries,
    setSelectedIndustries,
    redactOnPrint,
    setRedactOnPrint,
    filtersOpen,
    toggleFiltersOpen,
    setSelectedRoles,
    selectedRoles,
    filterCount,
    setAsDefault,
  };
};

export default useReportState;
