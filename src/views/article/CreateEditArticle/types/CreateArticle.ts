// import { Editor } from 'tinymce';
import type { OffenderData } from '#/components/form-components/offender/AddExistingOffender/AddExistingOffender.container';
import type { FormInstance, SelectProps, UploadProps } from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';
import type React from 'react';
import type { Editor } from 'tinymce';

import type { Incident } from '../../../../components/form-components/linkOptions/LinkIncident/useLinkIncident';
import type { DrawerType } from '../../../../hooks';
import type { AddIncident, AddOffender } from '../hooks/Forms';
import type { FormData } from '../hooks/useCreateEditArticle';

export interface Props {
  categories: SelectProps['options'];
  categoriesChange: (categories: { value: string }[]) => void;
  categoriesLoading: boolean;
  data: FormData;
  documentUploadProps: UploadProps;
  editorRef: React.MutableRefObject<Editor | null>;
  exampleImageUploadHandler(
    blobInfo: { blob: () => Blob | string; filename: () => string | undefined },
    progress: (arg0: number) => void
  ): Promise<string>;
  fileList: UploadFile[];
  filePickerCallback: (
    callback: (arg0: string, arg1: { title: string }) => void,
    value: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    meta: Record<string, any>
  ) => void;
  form: FormInstance<FormData>;
  groups: { label: string; value: string }[];
  groupsLoading: boolean;
  id?: string;
  incidents: Incident[];
  initData: string | undefined;
  insertIncident: (value: Incident) => void;
  insertOffender: (offender: OffenderData) => void;
  loading: boolean;
  log: () => void;
  offenders: OffenderData[];
  onGroupsChange: (groups: string[]) => void;
  onSubmit: () => void;
  preview: () => void;
  previewImage: string;
  previewText: string;
  removeIncident: (id: string) => void;
  removeOffender: (id: string) => void;
  saveDraft: (value: boolean) => void;
  selectedCategories: { value: string }[];
  selectedGroups: string[];
  selectedSchemes: string[];
  setPreviewImage: (arg0: string) => void;
  setPreviewText: (arg0: string) => void;
}

export interface ViewProps extends Props {
  drawer: DrawerType<AddIncident | AddOffender>;
}
