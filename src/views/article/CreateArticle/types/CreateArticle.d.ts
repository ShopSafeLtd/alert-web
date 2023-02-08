// import { Editor } from 'tinymce';
import React from 'react';
import type { SelectProps } from 'antd';
import { FormInstance, UploadProps } from 'antd';
import type { Editor } from 'tinymce';
import { UploadFile } from 'antd/es/upload/interface';
import { AddIncident, AddOffender } from '../hooks/Forms';
import { DrawerType } from '../../../../hooks';
import { OffenderData } from '../../../../components/form-components/incident/offender/AddExisitingOffender/AddExisitingOffender.container';

export interface Props {
  editorRef: React.MutableRefObject<Editor | null>;
  log: () => void;
  preview: () => void;
  imgSrcs: string[];
  previewText: string;
  previewImage: string;
  setPreviewImage: (arg0: string) => void;
  setPreviewText: (arg0: string) => void;
  groups: { value: string; label: string }[];
  groupsLoading: boolean;
  onGroupsChange: (groups: string[]) => void;
  categories: SelectProps['options'];
  categoriesLoading: boolean;
  categoriesChange: (categories: { value: string }[]) => void;
  filePickerCallback: (
    callback: (arg0: string, arg1: { title: string }) => void,
    value: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    meta: Record<string, any>
  ) => void;
  selectedGroups: string[];
  selectedCategories: { value: string }[];
  form: FormInstance<FormData>;
  onSubmit: () => void;
  data: FormData;
  loading: boolean;
  fileList: UploadFile[];
  documentUploadProps: UploadProps;
  insertOffender: (offender: OffenderData) => void;
  insertIncident: (value: string) => void;

  exampleImageUploadHandler(
    blobInfo: { blob: () => string | Blob; filename: () => string | undefined },
    progress: (arg0: number) => void
  ): Promise<string>;
}

export interface FormData {
  title: string;
  content: string;
  groups: string[];
  categories: string[];
  importance: 'Important' | 'Normal';
}

export interface ViewProps extends Props {
  drawer: DrawerType<AddIncident | AddOffender>;
}
