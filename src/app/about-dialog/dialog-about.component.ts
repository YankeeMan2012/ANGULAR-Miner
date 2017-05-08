import {Component} from '@angular/core';
import {MdDialogRef} from '@angular/material';

@Component({
    selector: 'app-dialog-about',
    templateUrl: './dialog-about.component.html',
    styleUrls: ['./dialog-about.component.scss']
})
export class DialogAboutComponent {

    constructor(public dialogRef: MdDialogRef<DialogAboutComponent>) {
    }

    private close(flag: boolean) {
        this.dialogRef.close(flag);
    }
}
