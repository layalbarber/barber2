import { UtilService } from "./../services/util.service";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { ToastrService } from "ngx-toastr";
import { Injectable } from "@angular/core";
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/finally";
import "rxjs/add/observable/throw";

interface toastConfig {
  progressAnimation: any;
  progressBar: boolean;
  onActivateTick: boolean;
  closeButton: boolean;
  positionClass: string;
}

@Injectable()
export class ApiInterceptorProvider implements HttpInterceptor {
  private toastConfig: toastConfig = {
    progressAnimation: "decreasing",
    progressBar: true,
    onActivateTick: true,
    closeButton: true,
    positionClass: "toast-bottom-center",
  };

  constructor(
    private ngxService: NgxUiLoaderService,
    private toastr: ToastrService,
    private util: UtilService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.ngxService.start();
    setTimeout(() => this.ngxService.stop(), 5000);
    let token = localStorage.getItem("admin_token");
    const authReq = req.clone({
      headers: req.headers.set("Authorization", "Bearer " + token),
    });
    return next
      .handle(authReq)
      .map((response: HttpEvent<any>) => {
        if (response instanceof HttpResponse) {
         
        }
        return response;
      })
      .catch((err: any) => {
        if (err instanceof HttpErrorResponse) {
          console.log("err.status: ", err.status);
          if (err.status === 401) {
           
            localStorage.removeItem("adminKey");
            this.util.navCtrl.navigateRoot("signin");
          } else if (err.status === 400) {
            this.toastr.error(err.error.msg, "Error!", this.toastConfig);
          } else if (err.status === 422) {
            for (let e in err.error.errors) {
              console.log("e: ", e);
              break;
            }
          } else {
            console.log(err);
            this.toastr.error("Error!", err.statusText, this.toastConfig);
          }
          return Observable.throw(err);
        }
      })
      .finally(() => {
        this.ngxService.stop();
      });
  }
}
