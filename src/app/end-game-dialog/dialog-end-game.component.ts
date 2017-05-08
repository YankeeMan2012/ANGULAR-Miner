import {Component, OnInit} from '@angular/core';
import {MdDialogRef} from '@angular/material';

@Component({
    selector: 'dialog-end-game',
    templateUrl: './dialog-end-game.component.html',
    styleUrls: ['./dialog-end-game.component.scss']
})
export class DialogEndGame implements OnInit {
    private res: string;
    private percent: number;
    private complexity: number = 0;

    constructor(public dialogRef: MdDialogRef<DialogEndGame>) {}

    ngOnInit(): void {
        this.res = this.dialogRef._containerInstance.dialogConfig.data;
        this.complexity = this.res['complexity'];
        if (this.complexity !== 3) {
            this.percent = Math.round((this.res['stat'].win / this.res['stat'].game) * 100);
        }
    }

    private close(flag: boolean) {
        this.dialogRef.close(flag);
    }
}