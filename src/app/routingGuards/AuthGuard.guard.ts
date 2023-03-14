import { UtilService } from './../services/util.service';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(private util: UtilService) {}

  public canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (localStorage.getItem('admin_token')) {
      return true;
    } else {
      this.util.navCtrl.navigateRoot('signin');
      return false;
    }
  }

}
