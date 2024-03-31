import { PrismaClient } from '@prisma/client';
import { FolderType } from '../../../shared/types/folder/folder.type';

let folderIdToMove: string | null = null;
let initialFolderId: string | null = null;

export const verifyParentId = async (
  prisma: PrismaClient,
  folder: FolderType,
  targetParentFolderId: string | null,
  initialfolderIdToMove: string | null,
): Promise<boolean> => {
  if (initialfolderIdToMove) {
    folderIdToMove = initialfolderIdToMove;
  }
  if (initialFolderId === null) {
    initialFolderId = folder.id;
  }

  if (targetParentFolderId === null) {
    initialFolderId = null;
    folderIdToMove = null;
    return true;
  }
  const parentFolder = await prisma.folder.findFirst({
    where: {
      id: targetParentFolderId,
    },
  });
  if (initialFolderId === parentFolder.parent_folder_id) {
    initialFolderId = null;
    folderIdToMove = null;
    return false;
  }
  if (targetParentFolderId === null || parentFolder.parent_folder_id === null) {
    initialFolderId = null;
    folderIdToMove = null;
    return true;
  }
  folderIdToMove = folderIdToMove === null ? folder.id : folderIdToMove;
  if (
    folder.parent_folder_id === null &&
    folderIdToMove !== targetParentFolderId
  ) {
    initialFolderId = null;
    folderIdToMove = null;
    return true;
  }
  if (folder.parent_folder_id === targetParentFolderId) {
    initialFolderId = null;
    folderIdToMove = null;
    return false;
  }
  if (folder.id === targetParentFolderId) {
    initialFolderId = null;
    folderIdToMove = null;
    return true;
  }

  if (!parentFolder) {
    initialFolderId = null;
    folderIdToMove = null;
    return false;
  }

  if (folder.id === folderIdToMove) {
    initialFolderId = null;
    folderIdToMove = null;
    return false;
  }

  if (parentFolder.parent_folder_id) {
    const parentFolderType: FolderType = {
      id: parentFolder.id,
      name: parentFolder.name,
      agency_id: parentFolder.agency_id,
      parent_folder_id: parentFolder.parent_folder_id,
      createdAt: parentFolder.createdAt,
      updatedAt: parentFolder.updatedAt,
      deletedAt: parentFolder.deletedAt,
    };

    return await verifyParentId(
      prisma,
      parentFolderType,
      parentFolderType.parent_folder_id,
      null,
    );
  }

  initialFolderId = null;
  folderIdToMove = null;

  return true;
};
