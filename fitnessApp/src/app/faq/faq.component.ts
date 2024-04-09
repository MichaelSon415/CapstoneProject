import { Component } from '@angular/core';
import { NavigationService } from 'src/services/navigation.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css', '../../assets/Stylesheet/mainbox.css']
})
export class FaqComponent {
  constructor(private navigationService: NavigationService) { }

  goToAnotherPage(innerItem: string) {
    this.navigationService.selectInnerItem(innerItem);
  }
}
