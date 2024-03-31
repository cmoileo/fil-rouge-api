import { PrismaClient } from '@prisma/client';
import { FolderType } from '../../../shared/types/folder/folder.type';

export const updateChildFolders = async (
  prisma: PrismaClient,
  folder: FolderType,
  newParentFolderId: string | null,
) => {
  await prisma.folder.update({
    where: {
      id: folder.id,
    },
    data: {
      parent_folder_id: newParentFolderId,
    },
  });
  const folderChildren: FolderType[] = await prisma.folder.findMany({
    where: {
      parent_folder_id: folder.id,
    },
  });

  for (const child of folderChildren) {
    await prisma.folder.update({
      where: {
        id: child.id,
      },
      data: {
        parent_folder_id: folder.parent_folder_id,
      },
    });
    const newChildren = await prisma.folder.findMany({
      where: {
        parent_folder_id: child.id,
      },
    });
    for (const newChild of newChildren) {
      if (!newChildren) {
        return;
      }
      await updateChildFolders(prisma, newChild, child.id);
    }
  }
};
