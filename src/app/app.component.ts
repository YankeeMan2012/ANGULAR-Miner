import {Component, OnInit} from '@angular/core';
import {IOptions, ILevel, ICell, IState} from './shared/options.interface';
import {levels} from './shared/levels';
import {MinerService} from './shared/miner.service';

import {DomSanitizer} from '@angular/platform-browser';
import {MdIconRegistry, MdDialog, MdDialogRef, MdDialogConfig} from '@angular/material';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    private startGame: boolean = true;
    private field: ICell[][];
    private options: IOptions;
    private stateGame = {
        victory: false,
        lose: false,
        mines: null
    };
    private levels: ILevel[] = levels;
    private complexity = 0;
    private lvlTitle: string = this.levels[this.complexity].title;

    private rightPress: boolean = false;
    private leftPress: boolean = false;

    private interval;
    private time: number = 0;
    private statistics = {
        0: {
            best: null,
            game: 0,
            win: 0,
            date: ''
        },
        1: {
            best: null,
            game: 0,
            win: 0,
            date: ''
        },
        2: {
            best: null,
            game: 0,
            win: 0,
            date: ''
        }
    };
    constructor(private MINER: MinerService, iconRegistry: MdIconRegistry, sanitizer: DomSanitizer, public dialog: MdDialog) {
        iconRegistry.addSvgIcon('bomb', sanitizer.bypassSecurityTrustResourceUrl('assets/img/bomb.svg'));
        this.MINER.onChangeState.subscribe(
            (state: IState) => {
                this.stateGame = state;
                if (this.stateGame.victory) {
                    this.endGame('Поздравляем, Вы выиграли!');
                    this.saveStatistics(true);
                } else if (this.stateGame.lose) {
                    this.endGame('Вы проиграли!');
                    this.saveStatistics(false);
                }
            }
        );
    }

    ngOnInit() {
        if ('statistics' in localStorage) {
            this.statistics = JSON.parse(localStorage.statistics);
        }
        this.start();
        console.log(this.statistics);
    }

    private endGame(msg): void {
        this.timer(false);
        const config = new MdDialogConfig();
        config.disableClose = true;
        config.data = { title: msg, time: this.time, stat: this.statistics[this.complexity] };
        const dialogRef = this.dialog.open(DialogEndGame, config);
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.start();
            } else {
                console.log('End Game');
            }
        });
    }

    private start(): void {
        if (this.complexity !== 3) {
            this.options = levels[this.complexity].params;
        }
        this.MINER.setOptions(this.options);
        this.field = [];
        this.field = this.MINER.generateField(this.field);
        this.startGame = true;
        this.lvlTitle = this.levels[this.complexity].title;
        this.time = 0;
    }

    private timer(start): void {
        if (start) {
            this.interval = setInterval(() => {
                this.time++;
            }, 1000);
        } else {
            clearInterval(this.interval);
        }
    }

    private saveStatistics(win): void {
        let data = this.statistics[this.complexity];
        if (win) {
            if (this.time < data.best || !data.best) {
                data.best = this.time;
                data.date = new Date();
            }
            data.win++;
        }
        data.game++;
        localStorage.statistics = JSON.stringify(this.statistics);
    }

    private cellClick(cell: ICell): void {
        if (cell.flag || this.stateGame.lose || this.stateGame.victory || cell.state === 1) return;
        if (this.startGame) {
            this.startGame = false;
            this.field = this.MINER.generateMines(this.field, cell);
            this.timer(true);
        }
        this.field = this.MINER.changeType(this.field, cell);
    }

    private rightClick(e, cell) {
        e.preventDefault();
        if (this.stateGame.lose || this.stateGame.victory) return;
        this.field = this.MINER.changeFlag(this.field, cell);
    }

    private up(e, cell) {
        if (e.which === 3) this.rightPress = false;
        if (e.which === 1) this.leftPress = false;
        if (!this.leftPress || !this.rightPress) {
            let isOpen: boolean = e.which === 1 && this.rightPress || e.which === 3 && this.leftPress;
            this.field = this.MINER.changeActiveCells(this.field, cell, false, isOpen);
        }
    }

    private down(e, cell) {
        if (e.which === 3) this.rightPress = true;
        if (e.which === 1) this.leftPress = true;
        if (this.leftPress && this.rightPress) {
            this.field = this.MINER.changeActiveCells(this.field, cell, true);
        }
    }
}

@Component({
    selector: 'dialog-end-game',
    templateUrl: './dialog-end-game.html',
})
export class DialogEndGame implements OnInit {
    private res: string;
    private percent: number;


    constructor(public dialogRef: MdDialogRef<DialogEndGame>) {}

    ngOnInit(): void {
        let configData: any = this.dialogRef._containerInstance.dialogConfig.data;
        this.res = configData;
        this.percent = Math.round((this.res['stat'].win / this.res['stat'].game) * 100);
    }

    private close(msg) {
        this.dialogRef.close(msg);
    }
}
