import {Component, OnInit} from '@angular/core';
import {MdDialog, MdDialogConfig, MdDialogRef} from '@angular/material';
import {DialogConfirm} from "../confirm-dialog/dialog-confirm.component";

interface lvlStats {
    best: number;
    date: string;
    game: number;
    win: number;
    title: string;
    percent: number;
}

@Component({
    selector: 'dialog-statistics',
    templateUrl: './dialog-statistics.component.html',
    styleUrls: ['./dialog-statistics.component.scss']
})
export class DialogStatistics implements OnInit {

    private statistics: lvlStats[];

    constructor(public dialogRef: MdDialogRef<DialogStatistics>, public dialog: MdDialog) {}

    ngOnInit(): void {
        this.statistics = JSON.parse(localStorage.statistics);
        this.statistics.forEach((item) => {
            item['percent'] = Math.round((item.win / item.game) * 100);
        });
    }

    private onClear(stat) {
        const config = new MdDialogConfig();
        config.data = { title: 'Вы действительно хотите очистить статистику?' };
        let dialogRef = this.dialog.open(DialogConfirm, config);
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.clearStats(stat);
            }
        });
    }

    private clearStats(stat) {
        stat.best = null;
        stat.game = 0;
        stat.win = 0;
        stat.date = '';
        localStorage.statistics = JSON.stringify(this.statistics);
    }
}