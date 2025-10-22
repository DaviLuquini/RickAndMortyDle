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

  copyDebugData() {
    const debugData = 'Debug data copied to clipboard!';
    navigator.clipboard.writeText(debugData).then(() => {
      console.log('Debug data copied to clipboard');
    }).catch(err => {
      console.error('Failed to copy debug data: ', err);
    });
  }
}
