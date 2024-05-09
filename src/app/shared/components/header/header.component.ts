import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { IconBookmarkComponent } from '../icons/icon-bookmark/icon-bookmark.component';
import { IconHomeComponent } from '../icons/icon-home/icon-home.component';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,

    IconBookmarkComponent,
    IconHomeComponent,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  readonly activeClasses = ['bg-bg-highlight', 'text-primary']
  readonly iconSize = 1.2;
  readonly strokeWidth = 2;
}
