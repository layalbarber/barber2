import { UtilService } from 'src/app/services/util.service';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  public forgotForm: FormGroup;

  constructor(
    private api: ApiService,
    private util: UtilService,
    private formBuilder: FormBuilder
  ) { 
    this.forgotForm = this.formBuilder.group({
      email: ["", Validators.compose([Validators.required, Validators.email])],
    });
  }

  ngOnInit() {
  }

  public onForgotPassword() {
    this.api.postWithHeader('forgetpassword',this.forgotForm.value).subscribe((res:any) => {
      if(res.success) {
        this.util.success('Success!', 'Check your email...');
      } 
    });
  }

}
