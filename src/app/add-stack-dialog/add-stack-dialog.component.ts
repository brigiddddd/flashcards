import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-add-stack-dialog',
  templateUrl: './add-stack-dialog.component.html',
  styleUrls: ['./add-stack-dialog.component.css']
})
export class AddStackDialogComponent {
  name: string;

  constructor(public dialogRef: MatDialogRef<AddStackDialogComponent>) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClickOkay(): void {
    this.name = this.name ? this.name.trim() : '';
    if (!this.name) {
      // TODO: Handle with error message?
      return;
    }
    this.dialogRef.close(this.name);
  }

}
