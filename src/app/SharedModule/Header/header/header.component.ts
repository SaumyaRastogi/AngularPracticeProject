import { Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { facebookBoxIcon } from '@progress/kendo-svg-icons';
import { ChangeLanguageService } from 'src/app/Services/Language/change-language.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit{
  isLoggedin: boolean;
  userName : string;
  showUsername = ""
  switchLang: string;
  browserLang: string;
  constructor(
    private langService: ChangeLanguageService,
    public translate: TranslateService,
    private router: Router
  ) {
    let info= JSON.parse(localStorage.getItem('loginInfo') || '{}')
    this.isLoggedin = info.email ? true : false;
    let userData = JSON.parse(localStorage.getItem('currentUserInfo') || '{}');
    this.userName = userData.userName
    if(this.userName){
      this.showUsername = "," + " " + this.userName
    }
    console.log("ye hai user data", userData) 

    translate.addLangs(['en', 'hin']);
    translate.setDefaultLang('en');
    translate.use('en');
    this.browserLang = translate.getDefaultLang();
    this.languageChanged();
    this.langService.selectedLanguage.next(this.browserLang);
    this.langService.selectedLanguage.subscribe((res) => {
      this.switchLang = res;
    });
  }

  ngOnInit(): void {}


  logout() {
    console.log('loggedout!!!');
    this.isLoggedin = false;
    localStorage.clear();
    this.router.navigate(['/home/login']);
  }

  selectLanguage(languageCode: string) {
    console.log(languageCode);
    this.langService.selectedLanguage.next(languageCode);
    this.translate.use(this.langService.selectedLanguage.value);
  }

  languageChanged() {
    this.translate.use(
      this.browserLang.match(/en|hin/) ? this.browserLang : 'en'
    );
  }
}
