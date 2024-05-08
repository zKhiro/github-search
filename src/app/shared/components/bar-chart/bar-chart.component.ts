import { CommonModule } from '@angular/common';
import { Component, HostBinding, Input } from '@angular/core';


@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.scss'
})
export class BarChartComponent {
  @Input() percentage: number;

  @HostBinding('class') classes = 'd-grid gap-2';
}
