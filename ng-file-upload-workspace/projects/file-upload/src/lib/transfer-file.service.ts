import { Observable } from 'rxjs';

import { Injectable, InjectionToken, Inject } from '@angular/core';
import {
  HttpClient,
  HttpEvent,
  HttpRequest,
  HttpHeaders,
} from '@angular/common/http';

export interface TransferFileConfig {
  host: string;
  port: number;
  APIEndpoint: string;
  ssl: boolean;
  serviceName: string;
  uploadEndpoint: string;
  getFileEndpoint: string;
  getFileMetadataEndpoint: string;
}

export const TransferFileConfigService = new InjectionToken<TransferFileConfig>(
  'FileUploadConfig',
);

export const TransferFileDefaultConfig: TransferFileConfig = {
  host: '127.0.0.1',
  port: 3000,
  APIEndpoint: 'files',
  ssl: false,
  serviceName: null,
  uploadEndpoint: 'upload',
  getFileEndpoint: 'stream',
  getFileMetadataEndpoint: 'metadata',
};

@Injectable()
export class TransferFileService {
  private API_UPLOAD_BASE_URL = this.getAPIBaseUrl(this.config);

  constructor(
    @Inject(TransferFileConfigService) private config: TransferFileConfig,
    private http: HttpClient,
  ) {}

  public uploadFile(
    file: File,
    destination?: string,
  ): Observable<HttpEvent<{}>> {
    const formData = new FormData();

    formData.append('file', file, file.name);
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'multipart/form-data',
      }),
      reportProgress: true,
      observe: 'events',
    };

    const req = new HttpRequest(
      'POST',
      this.getUploadEndpointUrl(this.config, destination),
      formData,
      options,
    );
    return this.http.request(req);
  }

  public getFileUrl(fileName: string, fileCategory: string) {
    return `${this.API_UPLOAD_BASE_URL}/stream/${fileCategory}/${fileName}`;
  }

  public getFile(fileName: string, fileCategory: string) {
    return this.http.get(this.getFileUrl(fileName, fileCategory));
  }

  public getFileInfo(fileName: string) {
    const url = `${this.API_UPLOAD_BASE_URL}/metadata/${fileName}`;
    return this.http.get(url);
  }

  private getUploadEndpointUrl(
    { uploadEndpoint }: TransferFileConfig,
    destination?: string,
  ): string {
    const APIEndpoint = this.API_UPLOAD_BASE_URL;
    const upload = uploadEndpoint ? `/${uploadEndpoint}` : '';
    const dest = destination ? `/${destination}` : '';
    return `${APIEndpoint}${upload}${dest}`;
  }

  private getAPIBaseUrl({
    host,
    port,
    APIEndpoint: endpoint,
    ssl,
    serviceName,
  }: TransferFileConfig): string {
    const addr = `${host}:${port}${endpoint ? `/${endpoint}` : ''}`;
    const protocol = !!serviceName ? serviceName : `${ssl ? 'https' : 'http'}`;
    return `${protocol}://${addr}`;
  }
}
