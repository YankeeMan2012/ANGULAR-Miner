import {Component} from '@angular/core';
import {MdDialogRef} from '@angular/material';

@Component({
    selector: 'dialog-about',
    templateUrl: './dialog-about.component.html',
    styleUrls: ['./dialog-about.component.scss']
})
export class DialogAbout {

    constructor(public dialogRef: MdDialogRef<DialogAbout>) {
    }

    private close(flag: boolean) {
        this.dialogRef.close(flag);
    }
}