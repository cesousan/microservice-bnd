import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { UploadService } from 'file-upload';
import { map, pluck, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'test-app';
  private selectedFile = new BehaviorSubject({});

  public fileDestination$ = of('avatars');
  public ownerId$ = of('admin123');

  public file$ = this.upload.lastUploadedFile$;

  public files$ = this.upload.uploadedFiles$.pipe(
    map(files =>
      files.map(file => ({
        name: file.name,
        size: file.size,
      })),
    ),
  );

  constructor(private upload: UploadService, private http: HttpClient) {}

  ngOnInit() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
      }),
      reportProgress: true,
    };
    this.http
      .post(
        'http://127.0.0.1:8080/auth/login',
        {
          username: 'chris',
          password: 'secret',
        },
        httpOptions,
      )
      .pipe(pluck('access_token'), tap(setTokenInLocalStorage))
      .subscribe();
  }

  uploadedFile(event) {
    this.selectedFile.next(event);
  }
}
function setTokenInLocalStorage(token: string) {
  localStorage.setItem('user_token', token);
}
