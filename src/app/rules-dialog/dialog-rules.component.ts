import {Component} from '@angular/core';
import {MdDialogRef} from '@angular/material';

@Component({
    selector: 'dialog-rules',
    templateUrl: './dialog-rules.component.html',
    styleUrls: ['./dialog-rules.component.scss']
})
export class DialogRules {

    constructor(public dialogRef: MdDialogRef<DialogRules>) {}

    private close(flag: boolean) {
        this.dialogRef.close(flag);
    }
}