import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GatewayClient {

  public api;
  // public apiKey;

  public constructor(public http: HttpClient) {
  }

  public get<T>(endPoint: string, headers?): Observable<T> {
    return this.http.get<T>(this.api + endPoint, this.mergeHeaderOptions(headers));
  }

  public post<T>(endPoint: string, params: object, headers?): Observable<T> {
    return this.http.post<T>(this.api + endPoint, params, this.mergeHeaderOptions(headers));
  }

  public put<T>(endPoint: string, params: object, headers?): Observable<T> {
    return this.http.put<T>(this.api + endPoint, params, this.mergeHeaderOptions(headers));
  }

  public delete<T>(endPoint: string, headers?): Observable<T> {
    return this.http.delete<T>(this.api + endPoint, this.mergeHeaderOptions(headers));
  }

  public request<T>(method, endPoint: string, params, headers?): Observable<T> {
    const opt: any = this.mergeHeaderOptions(headers);

    if (params) {
      opt.body = params;
    }

    return this.http.request<T>(method, this.api + endPoint, this.mergeHeaderOptions(opt));
  }

  private mergeHeaderOptions = (options: {headers} = {headers: {}}): object => {
    const defaultOptions = {
      headers: {

      }
    };

    if (!options.headers) {
      options.headers = {};
    }

    options.headers = Object.assign(options.headers, defaultOptions.headers);

    return options;
  }
}
