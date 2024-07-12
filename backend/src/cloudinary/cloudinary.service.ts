import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  constructor() {
    v2.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_KEY,
      api_secret: process.env.CLOUDINARY_SECRET,
    });
  }

  async uploadImage(
    filePath: string,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      v2.uploader.upload(
        filePath,
        { folder: 'travel-logs' },
        (error, result) => {
          if (error) return reject(error);
          if (!result) return reject(new Error('Upload result is undefined'));
          resolve(result);
        },
      );
    });
  }

  async deleteImage(
    public_id: string,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      v2.uploader.destroy(`travel-logs/${public_id}`, (error, result) => {
        if (error) return reject(error);
        if (!result) return reject(new Error('Upload result is undefined'));
        resolve(result);
      });
    });
  }
}
