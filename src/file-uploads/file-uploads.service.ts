import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FileUploadsService {
  private readonly uploadDirectory = path.join(__dirname, '..', '..', 'uploads');

  constructor() {
    this.ensureUploadDirectoryExists();
  }

  private ensureUploadDirectoryExists() {
    if (!fs.existsSync(this.uploadDirectory)) {
      fs.mkdirSync(this.uploadDirectory, { recursive: true });
    }
  }

  async saveFile(file: Express.Multer.File, subfolder = ''): Promise<string> {
    const folderPath = path.join(this.uploadDirectory, subfolder);
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    const fileExtension = path.extname(file.originalname);
    const fileName = `${uuidv4()}${fileExtension}`;
    const filePath = path.join(folderPath, fileName);

    await fs.promises.writeFile(filePath, file.buffer);

    return path.join(subfolder, fileName);
  }

  async deleteFile(filePath: string): Promise<void> {
    const fullPath = path.join(this.uploadDirectory, filePath);
    if (fs.existsSync(fullPath)) {
      await fs.promises.unlink(fullPath);
    }
  }

  getFileStream(filePath: string) {
    const fullPath = path.join(this.uploadDirectory, filePath);
    if (fs.existsSync(fullPath)) {
      return fs.createReadStream(fullPath);
    }
    return null;
  }
}
