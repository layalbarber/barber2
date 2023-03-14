import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { URL } from "../../environments/environment";
import { BehaviorSubject } from 'rxjs';

// base url of app
var base_url = URL.enable == "1" ? URL.local : URL.live;

@Injectable({
  providedIn: "root",
})
export class ApiService {
  public dataTransfer: any = new Object();
  total: number;
  totall: any;
  appointment: any;
  constructor(public http: HttpClient) { }

  public get(url) {
    return this.http.get(base_url + url);
  }
  newLogin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  setNewLogin(val) {
    this.newLogin.next(val);
  }

  isNewLogin() {
    return this.newLogin.asObservable();
  }

  public post(url, data) {
    let headers = new HttpHeaders();
    headers.set("Accept", "application/json");
    return this.http.post(base_url + url, data);
  }

  public getWithHeader(url) {
    let tok = "Bearer " + localStorage.getItem("admin_token");
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", tok);
    return this.http.get(base_url + url, { headers: headers });
  }

  public postWithHeader(url, data) {
    let tok = "Bearer " + localStorage.getItem("admin_token");
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", tok);
    headers = headers.set("Accept", "application/json");
    return this.http.post(base_url + url, data, { headers: headers });
  }
}
