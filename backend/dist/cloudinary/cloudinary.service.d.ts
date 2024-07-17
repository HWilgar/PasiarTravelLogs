import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';
export declare class CloudinaryService {
    constructor();
    uploadImage(filePath: string): Promise<UploadApiResponse | UploadApiErrorResponse>;
    deleteImage(public_id: string): Promise<UploadApiResponse | UploadApiErrorResponse>;
}
