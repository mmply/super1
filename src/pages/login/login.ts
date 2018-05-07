import { Component } from '@angular/core';
//import { TranslateService } from '@ngx-translate/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IonicPage, NavController, /*ToastController*/ } from 'ionic-angular';


import { AuthService } from '../../services/auth.service';
//import { User } from '../../providers';
import { MainPage } from '../index';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  loginForm: FormGroup;
	loginError: string;

 /*
  account: { email: string, password: string } = {
    email: 'test@example.com',
    password: 'test'
  };*/

  // Our translated text strings
  //private loginErrorString: string;

  constructor(
    private navCtrl: NavController,
    private auth: AuthService,
    fb: FormBuilder) {

      this.loginForm = fb.group({
			email: ['', Validators.compose([Validators.required, Validators.email])],
			password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
		});

    /*this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;*/
    }
    login() {
		let data = this.loginForm.value;

		if (!data.email) {
			return;
		}

		let credentials = {
			email: data.email,
			password: data.password
		};
		this.auth.signInWithEmail(credentials)
			.then(
				() => this.navCtrl.setRoot(MainPage),
				error => this.loginError = error.message
			);
    }

  //Metodo direcciona pagina de registro
  signup(){
    //this.navCtrl.push(SignupPage);
  }

  loginWithGoogle() {
  this.auth.signInWithGoogle()
    .then(
      () => this.navCtrl.setRoot(MainPage),
      error => console.log(error.message)
    );
  }

  }

 
  

