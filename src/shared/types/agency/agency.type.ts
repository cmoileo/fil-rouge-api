import { FolderType } from '../folder/folder.type';

export type AgencyType = {
  id: string;
  name: string;
  created_at: Date;
  updated_at: Date;
  folders: FolderType[];
};
