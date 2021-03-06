import { Component, Input, OnInit } from '@angular/core';
import { navItems } from './../../_nav';
import { SessionproviderService } from '../../providers/sessionprovider.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
 
  public navItems = navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement = document.body;
  constructor(private sessionprovider:SessionproviderService) {
    this.navItems=this.sessionprovider.navI;
    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = document.body.classList.contains('sidebar-minimized');
    });

    this.changes.observe(<Element>this.element, {
      attributes: true
    });
  }
}
