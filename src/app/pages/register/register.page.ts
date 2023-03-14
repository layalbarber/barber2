import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { ApiService } from "src/app/services/api.service";
import { UtilService } from "src/app/services/util.service";
import { countryCode } from 'src/environments/environment';

@Component({
  selector: "app-register",
  templateUrl: "./register.page.html",
  styleUrls: ["./register.page.scss"],
})
export class RegisterPage implements OnInit {
  email: string = "";
  name: string = "";
  password: string = "";
  confirm_password: string = "";
  phone: string = "";
  err: any;
  emailErr: any;
  passErr: any;
  ConfPassErr: any;
  phoneErr: any;
  nameErr: any;
  code = "+972";
  cCode: any = countryCode;
  constructor(
    private api: ApiService,
    private util: UtilService,
    private translate: TranslateService
  ) { }

  ngOnInit() { }

  signIn() {
    let translateData: any;
    let tData: any;

    this.translate.get("signupErr").subscribe((data: any) => {
      translateData = data;
    });

    this.api
      .post("register", {
        email: this.email,
        name: this.name,
        password: this.password,
        confirm_password: this.confirm_password,
        phone: this.phone,
        code: this.code
      })
      .subscribe(
        (res: any) => {
          if (res.success) {
            localStorage.setItem("admin_token", res.data.token);
            this.util.navCtrl.navigateRoot("tabs/calendar");
          }
        },
        (err) => {
          console.log(err);
          this.err = err.error.errors;
          this.emailErr = this.err.email ? this.err.email[0] : '';
          this.passErr = this.err.password ? this.err.password[0] : '';
          this.ConfPassErr = this.err.confirm_password[0];
          console.log(this.ConfPassErr);

          this.phoneErr = this.err.phone ? this.err.phone[0] : '';
          this.nameErr = this.err.name ? this.err.name[0] : '';

          if (err.status == 422) {
            this.err = err.error.errors;
            if (
              this.err.name && this.err.name[0] == "The name field is required."
            ) {
              this.nameErr = translateData.name;
              console.log(this.err.name[0]);
            }
            if (
              this.err.email && this.err.email[0] ==
              "The email field is required."
            ) {
              this.emailErr = translateData.email;
              console.log(this.err.name[0]);
            }
            if (this.err.email && this.err.email[0] == "The email has already been taken.") {
              this.emailErr = translateData.emailTaken
            }

            if (
              this.err.password && this.err.password[0] ==
              "The password field is required."
            ) {
              this.passErr = translateData.password;
              console.log(this.err.password[0]);
            } else if (
              this.err.password && this.err.password[0] ==
              "The password must be at least 8 characters."
            ) {
              this.passErr = translateData.password_minChar;
              console.log("asddsdadasdas", this.err.password[0]);
            }

            if (
              this.err.phone && this.err.phone[0] ==
              "The phone field is required."
            ) {
              this.phoneErr = translateData.phone;
              console.log(this.err.phone[0]);
            }
          }
        }
      );
  }
}
