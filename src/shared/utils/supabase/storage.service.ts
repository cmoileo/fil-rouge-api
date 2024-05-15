import { createClient } from '@supabase/supabase-js';
import { extname } from 'path';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const sharp = require('sharp');

class StorageService {
  private supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_API_KEY,
  );

  async uploadFile(file: any): Promise<{ name: string; image_url: string }> {
    try {
      let compressedBuffer = file.buffer;
      while (compressedBuffer.length > 512000) {
        compressedBuffer = await this.compressFile(compressedBuffer);
      }
      const { data, error } = await this.supabase.storage
        .from('storage')
        .upload(`${Date.now()}${extname(file.originalname)}`, compressedBuffer);
      console.log(data, error);
      if (error) {
        throw new Error(error.message);
      }
      return {
        name: `${Date.now()}${extname(file.originalname)}`,
        image_url: data.path ? data.path : '',
      };
    } catch (err) {
      throw new Error(err.message);
    }
  }
  async getSignedUrl(imagePath: string): Promise<string> {
    const { data: signedUrl, error } = await this.supabase.storage
      .from('storage')
      .createSignedUrl(imagePath, 604800);
    if (error) {
      throw new Error(error.message);
    }
    return signedUrl?.signedUrl || '';
  }

  private async compressFile(buffer: Buffer): Promise<Buffer> {
    console.log('compressing...');
    const maxWidth = 1080;
    const maxHeight = 1080;
    const compressedBuffer = await sharp(buffer)
      .resize(maxWidth, maxHeight, {
        fit: 'inside',
        withoutEnlargement: true,
      })
      .webp({ quality: 80 })
      .toBuffer();
    return compressedBuffer;
  }
}

const storageService = new StorageService();
export default storageService;
