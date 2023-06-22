// import { Editor } from 'tinymce';
import type React from 'react';
import type { FormInstance, SelectProps, UploadProps } from 'antd';
import type { Editor } from 'tinymce';
import type { UploadFile } from 'antd/es/upload/interface';
import type { AddIncident, AddOffender } from '../hooks/Forms';
import type { DrawerType } from '../../../../hooks';
import type { OffenderData } from '../../../../components/form-components/offender/offender/AddExistingOffender/AddExistingOffender.container';
import type { Incident } from '../../../../components/form-components/linkOptions/LinkIncident/LinkIncident.container';
import type { FormData } from '../hooks/useEditArticle';

export interface Props {
  editorRef: React.MutableRefObject<Editor | null>;
  log: () => void;
  preview: () => void;
  previewText: string;
  previewImage: string;
  setPreviewImage: (arg0: string) => void;
  setPreviewText: (arg0: string) => void;
  groups: { value: string; label: string }[];
  groupsLoading: boolean;
  onGroupsChange: (groups: string[]) => void;
  categories: SelectProps['options'];
  categoriesLoading: boolean;
  selectedCategories: SelectProps['options'];
  categoriesChange: (categories: { value: string }[]) => void;
  filePickerCallback: (
    callback: (arg0: string, arg1: { title: string }) => void,
    value: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    meta: Record<string, any>
  ) => void;
  selectedGroups: string[];
  form: FormInstance<FormData>;
  onSubmit: () => void;
  data: FormData;
  loading: boolean;
  fileList: UploadFile[];
  selectedSchemes: string[];
  documentUploadProps: UploadProps;
  insertOffender: (offender: OffenderData) => void;
  insertIncident: (value: Incident) => void;
  incidents: Incident[];
  offenders: OffenderData[];
  removeIncident: (id: string) => void;
  removeOffender: (id: string) => void;

  exampleImageUploadHandler(
    blobInfo: { blob: () => string | Blob; filename: () => string | undefined },
    progress: (arg0: number) => void
  ): Promise<string>;
}

export interface ViewProps extends Props {
  drawer: DrawerType<AddIncident | AddOffender>;
}
