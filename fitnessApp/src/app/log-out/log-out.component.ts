import { Component } from '@angular/core';
import { NavigationService } from 'src/services/navigation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-out',
  templateUrl: './log-out.component.html',
  styleUrls: ['./log-out.component.css', '../../assets/Stylesheet/mainbox.css']
})
export class LogOutComponent {
  constructor(private navigationService: NavigationService, private router: Router) { }

  // goToAnotherPage(innerItem: string) {
  //   this.navigationService.selectInnerItem(innerItem);
  // }

  goToAnotherPage(nextPage: string) {
    if (nextPage == "LOGOUTUSER") {
      this.router.navigate(['userlogin']);
    } else if (nextPage == "homepage") {
      this.router.navigate(['navbar'])
    }
  }

  loggingOut(logoutChoice: boolean) {
    if (logoutChoice) {
      this.router.navigate(['userlogin']);
    } else {
      this.router.navigate(['navbar'])
    }
  }
}
