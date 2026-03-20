import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-no-data',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './no-data.html',
  styleUrl: './no-data.scss'
})
export class NoData {
  @Input() message: string = 'No Data Found';
}
