import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { PaginationRequestModel } from '@models/response.model';


@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss'
})
export class PaginatorComponent {

  @Input() options: PaginationRequestModel;

  @Output() click = new EventEmitter<keyof PaginationRequestModel>();

  @HostBinding('class') classes = 'd-flex justify-content-end';

}
