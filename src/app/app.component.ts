import { Component, QueryList, ViewChildren } from "@angular/core";
import { Platform, IonRouterOutlet, ToastController, AlertController } from "@ionic/angular";
import { Router } from "@angular/router";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { ApiService } from "./services/api.service";
import { UtilService } from "./services/util.service";
import { OneSignal } from "@ionic-native/onesignal/ngx";
import { TranslateService } from '@ngx-translate/core';
import { StatusBar } from "@ionic-native/status-bar/ngx";
@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  lastTimeBackPress = 0;
  timePeriodToExit = 2000;
  public selectedIndex = 0;
  language: any;
  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;
  constructor(
    private platform: Platform,
    private router: Router,
    private splashScreen: SplashScreen,
    private api: ApiService,
    private util: UtilService,
    private oneSignal: OneSignal,
    private translate: TranslateService,
    private statusBar: StatusBar,
    private toastController: ToastController,
    private alertCtrl: AlertController,
  ) {
    this.initializeApp();
    this.backButtonEvent();
    // console.log = function () { };
    if (localStorage.getItem("lan")) {
      this.translate.setDefaultLang(localStorage.getItem("lan"));
      if (localStorage.getItem('lan') == "ar") {
        document.documentElement.dir = "rtl";
      }
      if (localStorage.getItem('lan') == "en") {
        document.documentElement.dir = "ltr";
      }
    } else {
      this.translate.setDefaultLang("en");
      localStorage.setItem("lan", "en");
      document.documentElement.dir = "ltr";
    }
    this.language = localStorage.getItem('lan');

  }

  initializeApp() {
    this.platform.ready().then(() => {
      setTimeout(() => this.splashScreen.hide(), 2000);
      this.statusBar.styleDefault();
      this.statusBar.backgroundColorByHexString("#E06287");
    });
    this.api.get("appSetting").subscribe(
      (res: any) => {
        if (res.success) {
          localStorage.setItem("currency_symbol", res.data.currency_symbol);
          localStorage.setItem("lat", res.data.lat);
          localStorage.setItem("lang", res.data.lang);
          console.log("res.setting", res);
          this.oneSignal.startInit(res.data.app_id, res.data.project_no);
          this.oneSignal.getIds().then((token) => {
            localStorage.setItem("pushToken", token.userId);
          });
          this.oneSignal.endInit();
        }
      },
      (err) => {
        console.log("err", err);
      }
    );
  }


  backButtonEvent() {
    this.platform.backButton.subscribe(async () => {
      this.routerOutlets.forEach((outlet: IonRouterOutlet) => {
        if (outlet && outlet.canGoBack()) {
          outlet.pop();
        } else if (
          this.router.url === "/tabs/calendar" ||
          this.router.url === "/tabs/sales" ||
          this.router.url === "/tabs/clients" ||
          this.router.url === "/tabs/notification" ||
          this.router.url === "/tabs/more" ||
          this.router.url === "/signin" ||
          this.router.url === "signin" ||
          this.router.url === "/subscription" ||
          this.router.url === "subscription"
        ) {
          if (
            new Date().getTime() - this.lastTimeBackPress <
            this.timePeriodToExit
          ) {
            navigator["app"].exitApp();
          } else {
            if (this.language == 'en') {
              this.showToast();
              this.lastTimeBackPress = new Date().getTime();
            }
            else {
              this.showArbicToast();
              this.lastTimeBackPress = new Date().getTime();
            }
          }
        }
      });
    });
  }

  async showToast() {
    const toast = await this.toastController.create({
      message: "Press back again to exit App.",
      duration: 2000,
    });
    toast.present();
  }

  async showArbicToast() {
    const toast = await this.toastController.create({
      message: "اضغط مرة أخرى للخروج من التطبيق.",
      duration: 2000,
    });
    toast.present();
  }
}
