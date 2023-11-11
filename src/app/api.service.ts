import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private _http: HttpClient) {}
  apiUrl = 'http://localhost:3000/user';

  getAllData(): Observable<any[]> {
  return this._http.get<any[]>(this.apiUrl);
}

  getUser(userId: string): Observable<any> {
    return this._http.get(`${this.apiUrl}/${userId}`);
  }

  createUser(data: any): Observable<any> {
    return this._http.post(`${this.apiUrl}`, data);
  }

  deleteUser(userId: string): Observable<any> {
    const url = `${this.apiUrl}/${userId}`;
    return this._http.delete(url);
  }

  editUser(userId: string, newUserDetails: any): Observable<any> {
    const url = `${this.apiUrl}/${userId}`;
    return this._http.put(url, newUserDetails);
  }

  updateUser(userId: string, userData: any): Observable<any> {
    const url = `${this.apiUrl}/${userId}`;
    return this._http.put(url, userData);
  }

}
