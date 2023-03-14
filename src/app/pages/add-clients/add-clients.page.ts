import { Validators } from "@angular/forms";
import { UtilService } from "./../../services/util.service";
import { ApiService } from "./../../services/api.service";
import { FormBuilder } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { countryCode } from "src/environments/environment";
@Component({ 
  selector: "app-add-clients",
  templateUrl: "./add-clients.page.html",
  styleUrls: ["./add-clients.page.scss"],
})
export class AddClientsPage implements OnInit {
  public userForm: FormGroup;
  public state: number = 1;
  public err: any = Object();
  code = "+91";
  cCode: any = countryCode;
  constructor(
    private api: ApiService,
    private formBuilder: FormBuilder,
    private util: UtilService
  ) {
    this.userForm = this.formBuilder.group({
      name: ["", Validators.compose([Validators.required])],
      email: ["", Validators.compose([Validators.required, Validators.email])],
      code: ["", Validators.compose([Validators.required])],
      phone: ["", Validators.compose([Validators.required])],
      password: [
        "",
        Validators.compose([Validators.required, Validators.minLength(6)]),
      ],
    }); 

    console.log(this.util.dataTransfer);
  }

  ngOnInit() { }

  public onSave() {
    this.api.postWithHeader("addClient", this.userForm.value).subscribe(
      (res: any) => {
        if (res.success) {
          this.util.success("Success!", "User has been added successfully");
          this.util.navCtrl.navigateBack("/");
        }
      },
      (err) => {
        this.err = err.error.errors;
        console.log("this.err: ", this.err);
      }
    );
  }

  public logScrolling(ev) {
    if (ev.detail.scrollTop >= 50) {
      this.state = 2;
    } else {
      this.state = 1;
    }
    console.log("this.state: ", this.state);
  }
}
