import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CommitModel } from '@models/commits.model';

import { IconPackageComponent } from '../icons/icon-package/icon-package.component';


@Component({
  selector: 'app-commits',
  standalone: true,
  imports: [
    CommonModule,

    IconPackageComponent
  ],
  templateUrl: './commits.component.html',
})
export class CommitsComponent {

  @Input() commit: CommitModel;

}
