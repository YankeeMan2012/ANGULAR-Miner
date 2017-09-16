import {Component, OnInit, Inject} from '@angular/core';
import {MdDialogRef, MD_DIALOG_DATA} from '@angular/material';

@Component({
    selector: 'app-dialog-confirm',
    templateUrl: './dialog-confirm.component.html',
    styleUrls: ['./dialog-confirm.component.scss']
})
export class DialogConfirmComponent implements OnInit {

    constructor(public dialogRef: MdDialogRef<DialogConfirmComponent>,
                @Inject(MD_DIALOG_DATA) private res: any) {}

    ngOnInit(): void {
    }

    private close(flag: boolean): void {
        this.dialogRef.close(flag);
    }
}
