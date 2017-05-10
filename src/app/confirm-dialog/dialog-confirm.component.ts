import {Component, OnInit} from '@angular/core';
import {MdDialogRef} from '@angular/material';

@Component({
    selector: 'app-dialog-confirm',
    templateUrl: './dialog-confirm.component.html',
    styleUrls: ['./dialog-confirm.component.scss']
})
export class DialogConfirmComponent implements OnInit {
    private res: string;

    constructor(public dialogRef: MdDialogRef<DialogConfirmComponent>) {}

    ngOnInit(): void {
        this.res = this.dialogRef._containerInstance.dialogConfig.data;
    }

    private close(flag: boolean): void {
        this.dialogRef.close(flag);
    }
}
