import { createClient } from '@supabase/supabase-js';
import { extname } from 'path';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const sharp = require('sharp');

class StorageService {
  private supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_API_KEY,
  );

  async uploadFile(file: any): Promise<string> {
    let compressedBuffer = file.buffer;
    while (compressedBuffer.length > 512000) {
      compressedBuffer = await this.compressFile(compressedBuffer);
    }
    const { data, error } = await this.supabase.storage
      .from('storage')
      .upload(`${Date.now()}${extname(file.originalname)}`, compressedBuffer);
    if (error) {
      throw new Error(error.message);
    }
    this.getSignedUrl(data.path);
    return data.path;
  }
  async getSignedUrl(imagePath: string): Promise<string> {
    const { data: signedUrl, error } = await this.supabase.storage
      .from('storage')
      .createSignedUrl(imagePath, 604800);
    if (error) {
      throw new Error(error.message);
    }
    console.log(signedUrl);
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
    console.log(compressedBuffer.length);
    return compressedBuffer;
  }
}

const storageService = new StorageService();
export default storageService;
