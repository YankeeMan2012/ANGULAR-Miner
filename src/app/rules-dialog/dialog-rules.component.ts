import {Component} from '@angular/core';
import {MdDialogRef} from '@angular/material';

@Component({
    selector: 'app-dialog-rules',
    templateUrl: './dialog-rules.component.html',
    styleUrls: ['./dialog-rules.component.scss']
})
export class DialogRulesComponent {

    constructor(public dialogRef: MdDialogRef<DialogRulesComponent>) {}

    private close(flag: boolean): void {
        this.dialogRef.close(flag);
    }
}
