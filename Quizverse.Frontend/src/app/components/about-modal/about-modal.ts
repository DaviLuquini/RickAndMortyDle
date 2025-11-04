import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-about-modal',
  imports: [],
  templateUrl: './about-modal.html',
  styleUrl: './about-modal.scss'
})
export class AboutModal {
  @Output() closeOutput = new EventEmitter<void>();

  closeModal() {
    this.closeOutput.emit();
  }
}
