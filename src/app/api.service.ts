import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Settings } from 'src/models/settings';

const BASE_URL = 'http://127.0.0.1:7362/';
const SETTINGS_ENDPOINT = 'settings/';
const PUMPS_ENDPOINT = 'pumps/';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  public getSettings(): Observable<Settings> {
    const url = BASE_URL + SETTINGS_ENDPOINT;
    return this.getJson<Settings>(url);
  }
  
  public putSettings(settings: Settings): Observable<any> {
    const url = BASE_URL + SETTINGS_ENDPOINT;
    return this.putJson(url, JSON.stringify(settings));
  }

  public postPump(pumpNumber: number, duration: number): Observable<any> {
    const url = BASE_URL + PUMPS_ENDPOINT + pumpNumber.toString();
    return this.postText(url, duration.toString());
  }

  private getJson<T>(url: string): Observable<T> {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };
    return this.http.get<T>(url, httpOptions);
  }

  private postText(url: string, payload: string) {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "text/plain" })
    };
    return this.http.post(url, payload, httpOptions);
  }

  private putJson(url: string, payload: string) {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };
    return this.http.put(url, payload, httpOptions);
  }
}
