import { createClient } from '@supabase/supabase-js';
import { extname } from 'path';
import { fromBlob } from 'image-resize-compress';

class StorageService {
  private supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_API_KEY,
  );

  async uploadFile(file: any) {
    // const compressedBuffer = await this.compressFile(file);

    const { data, error } = await this.supabase.storage
      .from('storage')
      .upload(`${Date.now()}${extname(file.originalname)}`, file);
    if (error) {
      throw new Error(error.message);
    }
    return data;
  }

  // private async compressFile(buffer: File): Promise<Blob> {
  //   const quality = 80;
  //   const width = 0;
  //   const height = 0;
  //   const format = 'webp';
  //
  //   const compressedBuffer = await fromBlob(
  //     buffer,
  //     quality,
  //     width,
  //     height,
  //     format,
  //   );
  //   return compressedBuffer;
  // }
}

const storageService = new StorageService();
export default storageService;
