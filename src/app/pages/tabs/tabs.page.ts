import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  
  public activeTabIndex:string = 'calendar';

  constructor(
    private router: Router
  ) {}

  public setActiveTabIndex(): void {
    this.activeTabIndex = this.router.url;
  }

}
