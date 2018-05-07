import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateService } from '@ngx-translate/core';
import { MenuController, Config, Nav, Platform } from 'ionic-angular';

import { AuthService } from '../services/auth.service';

//inica la pantalla de tutorial
//import { FirstRunPage } from '../pages';
//inicia la pantalla de login
import { WelcomePage } from '../pages';
import { LoginPage } from '../pages';
import { MainPage } from '../pages';
import { Settings } from '../providers';

//importado para el tiempo en splash
import { timer } from 'rxjs/observable/timer';

@Component({
  template:`
  <div *ngIf="showSplash" class="splash">
    <div class="spinner"></div>
  </div>

  <ion-menu [content]="content">
    <ion-header>
      <ion-toolbar>
        <ion-title>Menu</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list>
        <ion-item *ngFor="let p of pages" (click)="openPage(p)">
			  <ion-icon [name]="p.icon" item-left></ion-icon>
			    {{p.title}}
		    </ion-item>

        

		<ion-item (click)="logout()" >
			<ion-icon name="log-out" item-left></ion-icon>
			Log out
		</ion-item>

		<ion-item (click)="login()" >
			<ion-icon name="log-in" item-left></ion-icon>
			Log in
		</ion-item>

      </ion-list>
    </ion-content>

  </ion-menu>
  <ion-nav #content [root]="rootPage"></ion-nav>
  `
})
export class MyApp {
  rootPage = WelcomePage;

  // para el splash
  showSplash = true;

  @ViewChild(Nav) nav: Nav;

  pages: any[] = [
    { title: 'Cards', component: 'CardsPage' },
    { title: 'Content', component: 'ContentPage' },
    { title: 'Master Detail', component: 'ListMasterPage' },
    { title: 'Search', component: 'SearchPage' }
  ]

  constructor(
    private translate: TranslateService, 
    private menu: MenuController,
    platform: Platform, 
    settings: Settings, 
    private config: Config, 
    private statusBar: StatusBar,
    private auth: AuthService,
    private splashScreen: SplashScreen) {
    this.menu = menu;
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      // tiempo para el splash
      timer(3000).subscribe(() => this.showSplash = false);
    });
    this.initTranslate();
    this.initializeApp();
  }

  initializeApp() {
			
			this.auth.afAuth.authState
				.subscribe(
					user => {
						if (user) {
							this.rootPage = MainPage;
						} else {
							this.rootPage = WelcomePage;
						}
					}
				);
	}

  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('en');
    const browserLang = this.translate.getBrowserLang();

    if (browserLang) {
      if (browserLang === 'zh') {
        const browserCultureLang = this.translate.getBrowserCultureLang();

        if (browserCultureLang.match(/-CN|CHS|Hans/i)) {
          this.translate.use('zh-cmn-Hans');
        } else if (browserCultureLang.match(/-TW|CHT|Hant/i)) {
          this.translate.use('zh-cmn-Hant');
        }
      } else {
        this.translate.use(this.translate.getBrowserLang());
      }
    } else {
      this.translate.use('en'); // Set your language here
    }

    this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    });
  }

  login() {
		this.menu.close();
		this.auth.signOut();
    this.nav.setRoot(LoginPage);
	}

	logout() {
		this.menu.close();
		this.auth.signOut();
    this.nav.setRoot(WelcomePage);
	}


  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
