import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-add-stack-dialog',
  templateUrl: './add-stack-dialog.component.html',
  styleUrls: ['./add-stack-dialog.component.css']
})
export class AddStackDialogComponent {
  title: string;

  constructor(public dialogRef: MatDialogRef<AddStackDialogComponent>) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClickOkay(): void {
    this.title = this.title ? this.title.trim() : '';
    if (!this.title) {
      // TODO: Handle with error message?
      return;
    }
    this.dialogRef.close(this.title);
  }

}
