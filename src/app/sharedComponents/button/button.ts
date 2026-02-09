import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { BUTTONDATA } from '../../interfaces/common';

@Component({
  selector: 'app-button',
  imports: [MatButtonModule, CommonModule],
  templateUrl: './button.html',
  styleUrl: './button.scss'
})
export class Button {

  @Input() buttonData: BUTTONDATA = {
    value: 'Send',
    type: 'primary',
    icon: '',
  };

  @Output() buttonHandler = new EventEmitter<any>();

  public onClick() {
    this.buttonHandler.emit(this.buttonData);
  }

}
