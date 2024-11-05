import { storage } from './firebase';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

export class StorageService {
  async uploadFile(userId: string, file: File) {
    const fileRef = ref(storage, `users/${userId}/${file.name}`);
    await uploadBytes(fileRef, file);
    const downloadURL = await getDownloadURL(fileRef);
    return { path: fileRef.fullPath, url: downloadURL };
  }

  async deleteFile(path: string) {
    const fileRef = ref(storage, path);
    await deleteObject(fileRef);
  }

  async getFileUrl(path: string) {
    const fileRef = ref(storage, path);
    return await getDownloadURL(fileRef);
  }
}

export const storageService = new StorageService(); 