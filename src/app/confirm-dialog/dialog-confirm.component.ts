import {Component, OnInit} from '@angular/core';
import {MdDialogRef} from '@angular/material';

@Component({
    selector: 'dialog-confirm',
    templateUrl: './dialog-confirm.component.html',
    styleUrls: ['./dialog-confirm.component.scss']
})
export class DialogConfirm implements OnInit {
    private res: string;

    constructor(public dialogRef: MdDialogRef<DialogConfirm>) {}

    ngOnInit(): void {
        this.res = this.dialogRef._containerInstance.dialogConfig.data;
    }

    private close(flag: boolean) {
        this.dialogRef.close(flag);
    }
}