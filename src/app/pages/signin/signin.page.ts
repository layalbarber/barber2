import { UtilService } from "./../../services/util.service";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ApiService } from "src/app/services/api.service";

@Component({
  selector: "app-signin",
  templateUrl: "./signin.page.html",
  styleUrls: ["./signin.page.scss"],
})
export class SigninPage implements OnInit {
  public myForm: FormGroup;
  isLog: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private util: UtilService
  ) {
    this.myForm = this.formBuilder.group({
      email: ["", Validators.compose([Validators.required, Validators.email])],
      password: ["", Validators.compose([Validators.required])],
    });
  }

  ngOnInit() {}

  signIn() {
    this.api
      .post("login", {
        email: this.myForm.value.email,
        password: this.myForm.value.password,
        device_token: localStorage.getItem("pushToken")
          ? localStorage.getItem("pushToken")
          : "I Hate This",
      })
      .subscribe((res: any) => {
        if (res.message != "no") {
          console.log("no");
          localStorage.setItem("message", res.message);
          if (res.success) {
            localStorage.setItem("admin_token", res.data.token);
           
            this.util.navCtrl.navigateRoot("tabs/calendar");
            this.api.setNewLogin(true);
          } else {
            let lan = localStorage.getItem("lan");
            if (lan == "en") {
              this.util.showToast("Invalid Email Or Password");
            } else {
              this.util.showToast("بريد إلكتروني أو كلمة مرور خاطئة");
            }
          }
        } else {
          if (res.success) {
           
            this.api.setNewLogin(true);
            this.util.navCtrl.navigateRoot("add-salon");
            localStorage.setItem("owner_id", res.data.id);
          }
        }
      });
  }
}
