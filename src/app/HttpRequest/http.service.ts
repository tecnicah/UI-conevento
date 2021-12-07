import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  url_api = `${environment.API_URL}`;
  url_images = `${environment.images_path}`;
  headers = new HttpHeaders();

  constructor(private http: HttpClient) { }

  service_general_post_with_url(url:any, parametros:any): Observable<any> {
    return this.http.post(this.url_api + url, parametros, { headers: this.headers });
  }

  public service_general_get(url:any): Observable<any> {
    return this.http.get(this.url_api + url, { headers: this.headers });
  }

}
