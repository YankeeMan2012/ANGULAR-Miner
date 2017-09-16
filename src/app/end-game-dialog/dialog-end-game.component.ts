import {Component, OnInit, Inject} from '@angular/core';
import {MdDialogRef, MD_DIALOG_DATA} from '@angular/material';

@Component({
    selector: 'app-dialog-end-game',
    templateUrl: './dialog-end-game.component.html',
    styleUrls: ['./dialog-end-game.component.scss']
})
export class DialogEndGameComponent implements OnInit {
    private res: string;
    private percent: number;
    private complexity: number = 0;

    constructor(public dialogRef: MdDialogRef<DialogEndGameComponent>,
                @Inject(MD_DIALOG_DATA) private data: any) {}

    ngOnInit(): void {
        this.res = this.data;
        this.complexity = this.res['complexity'];
        if (this.complexity !== 3) {
            this.percent = Math.round((this.res['stat'].win / this.res['stat'].game) * 100);
        }
    }

    private close(flag: boolean): void {
        this.dialogRef.close(flag);
    }
}
