import {Component, OnInit} from '@angular/core';
import {MdDialog, MdDialogConfig} from '@angular/material';
import {DialogConfirmComponent} from '../confirm-dialog/dialog-confirm.component';

interface LvlStats {
    best: number;
    date: string;
    game: number;
    win: number;
    title: string;
    percent: number;
}

@Component({
    selector: 'app-dialog-statistics',
    templateUrl: './dialog-statistics.component.html',
    styleUrls: ['./dialog-statistics.component.scss']
})
export class DialogStatisticsComponent implements OnInit {

    private statistics: LvlStats[];

    constructor(public dialog: MdDialog) {}

    ngOnInit(): void {
        this.statistics = JSON.parse(localStorage.statistics);
        this.statistics.forEach((item) => {
            item['percent'] = Math.round((item.win / item.game) * 100);
        });
    }

    private onClear(stat): void {
        const config = new MdDialogConfig();
        config.data = { title: 'Are you sure that you want to clear statistics?' };
        const dialogRef = this.dialog.open(DialogConfirmComponent, config);
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.clearStats(stat);
            }
        });
    }

    private clearStats(stat): void {
        stat.best = null;
        stat.game = 0;
        stat.win = 0;
        stat.date = '';
        localStorage.statistics = JSON.stringify(this.statistics);
    }
}
