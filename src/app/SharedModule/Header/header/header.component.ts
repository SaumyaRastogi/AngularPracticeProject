import { ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { facebookBoxIcon } from '@progress/kendo-svg-icons';
import { Observable } from 'rxjs';
import { Users } from 'src/app/Models/UserData';
import { CurrentUserService } from 'src/app/Services/CurrenrUser/current-user.service';
import { DataManagementService } from 'src/app/Services/DataManagement/data-management.service';
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
  currentUser$: any;
  currentUser: any;
  cdr:any;
  constructor(
    private langService: ChangeLanguageService,
    public translate: TranslateService,
    private router: Router,
    private dataService: DataManagementService,
    private currentUserService : CurrentUserService,
    _cdr: ChangeDetectorRef
  ) {
    this.cdr = _cdr
    // let info= JSON.parse(localStorage.getItem('loginInfo') || '{}')
    // this.isLoggedin = info.email ? true : false;
    // let userData = JSON.parse(localStorage.getItem('currentUserInfo') || '{}');
    // this.userName = userData.userName
    
    // console.log("ye hai user data", userData) 

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

   async ngOnInit() {
     this.currentUser$= this.currentUserService.currentUser.subscribe((data) =>{
      this.currentUser = data;
      console.log("from header subject", this.currentUser.userName)
      if(this.currentUser.userName == '' || this.currentUser.userName ==  null){
        this.showUsername = this.currentUser.userName
      }
      else{
        this.showUsername = "," + " " + this.currentUser?.userName
      }
      
      console.log("from header subject", this.currentUser)
    })
    
    this.langService.selectedLanguage.subscribe((val) => { this.translate.use(val); });
  }

  ngOnChange(ch : SimpleChanges)
  {
    
  }

  ngAfterViewInit()
  {
    let info= JSON.parse(localStorage.getItem('loginInfo') || '{}')
    console.log("info v    sadadsafav ", localStorage.getItem('loginInfo') )
    this.isLoggedin = info.email ? true : false;
    if(this.currentUser.userName == '' || this.currentUser.userName ==  null){
      this.showUsername = this.currentUser.userName
    }
    else{
      this.showUsername = "," + " " + this.currentUser?.userName
    }
    this.cdr.detectChanges();
  }

  logout() {
    console.log('loggedout!!!');
    this.isLoggedin = false;
    localStorage.clear();
    this.currentUserService.currentUser.next({
      email: 'null',
    userName: '',
    password: 'null',
    isAdmin: false,
    contact: 'null',
    skills: [],
    role: '',
    })
    this.router.navigate(['/home/login']);
  }

  selectLanguage(languageCode: string) {
    console.log(languageCode);
    this.langService.selectedLanguage.next(languageCode);
    
  }

  languageChanged() {
    this.translate.use(
      this.browserLang.match(/en|hin/) ? this.browserLang : 'en'
    );
  }

  ngOnDestroy() {
    
}
}
