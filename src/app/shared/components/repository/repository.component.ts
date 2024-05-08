import { Component, Input } from '@angular/core';
import { RepositoryContentModel } from '@models/repository.model';

import { IconPackageComponent } from '../icons/icon-package/icon-package.component';


@Component({
  selector: 'app-repository',
  standalone: true,
  imports: [ IconPackageComponent ],
  templateUrl: './repository.component.html',
  styleUrl: './repository.component.scss'
})
export class RepositoryComponent {
  @Input() repository: RepositoryContentModel;

}
