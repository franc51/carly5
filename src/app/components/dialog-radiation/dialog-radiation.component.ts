import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-radiation',
  templateUrl: './dialog-radiation.component.html',
  styleUrl: './dialog-radiation.component.css'
})
export class DialogRadiationComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogRadiationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { vehicle: string }
  ) {}

  onConfirm(): void {
    this.dialogRef.close(true); // confirm
  }

  onCancel(): void {
    this.dialogRef.close(false); // cancel
  }
}