import {Component, OnDestroy, OnInit} from '@angular/core';
import {IOptions, ILevel, ICell, IState} from './shared/options.interface';
import {levels} from './shared/levels';
import {defStats} from './shared/statistics';
import {MinerService} from './shared/miner.service';

import {DomSanitizer} from '@angular/platform-browser';
import {MdIconRegistry, MdDialog, MdDialogConfig} from '@angular/material';
import {DialogEndGameComponent} from './end-game-dialog/dialog-end-game.component';
import {DialogStatisticsComponent} from './statistics-dialog/dialog-statistics.component';
import {DialogRulesComponent} from './rules-dialog/dialog-rules.component';
import {DialogAboutComponent} from './about-dialog/dialog-about.component';
import {DialogConfirmComponent} from './confirm-dialog/dialog-confirm.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

    private startGame = true;
    private field: ICell[][];
    private options: IOptions;
    private stateGame = {
        victory: false,
        lose: false,
        mines: null
    };
    private levels: ILevel[] = levels;
    private complexity = 0;
    private lvlTitle = this.levels[this.complexity].title;

    private rightPress = false;
    private leftPress = false;

    private interval;
    private time = 0;
    private statistics = defStats;

    constructor(private MINER: MinerService, iconRegistry: MdIconRegistry, sanitizer: DomSanitizer, public dialog: MdDialog) {
        iconRegistry.addSvgIcon('bomb', sanitizer.bypassSecurityTrustResourceUrl('assets/img/bomb.svg'));
        iconRegistry.addSvgIcon('timer', sanitizer.bypassSecurityTrustResourceUrl('assets/img/signs.svg'));
        iconRegistry.addSvgIcon('github', sanitizer.bypassSecurityTrustResourceUrl('assets/img/github.svg'));
        this.MINER.onChangeState.subscribe(
            (state: IState) => {
                this.stateGame = state;
                if (!this.startGame) {
                    if (this.stateGame.victory) {
                        this.endGame('Поздравляем, Вы выиграли!');
                        if (this.complexity !== 3) {
                            this.saveStatistics(true);
                        }
                    } else if (this.stateGame.lose) {
                        this.endGame('Вы проиграли!');
                        if (this.complexity !== 3) {
                            this.saveStatistics(false);
                        }
                    }
                }
            }
        );
    }

    ngOnInit(): void {
        if ('statistics' in localStorage) {
            this.statistics = JSON.parse(localStorage['statistics']);
        } else {
            localStorage['statistics'] = JSON.stringify(this.statistics);
        }
        this.start();
    }

    ngOnDestroy(): void {
        if (!this.startGame) {
            this.saveStatistics(false);
        }
    }

    private onStart(): void {
        if (!this.startGame) {
            const config = new MdDialogConfig();
            config.data = {title: 'Текущая игра будет защитана как проигрыш. Продолжить?'};
            const dialogRef = this.dialog.open(DialogConfirmComponent, config);
            dialogRef.afterClosed().subscribe(result => {
                if (result) {
                    this.start();
                }
            });
        } else {
            this.start();
        }

    }

    private start(): void {
        clearInterval(this.interval);
        if (!this.startGame) {
            this.saveStatistics(false);
        }
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

    private endGame(msg: string): void {
        this.timer(false);
        this.startGame = true;
        const config = new MdDialogConfig();
        config.width = '450px';
        config.data = {
            title: msg,
            time: this.time,
            stat: this.statistics[this.complexity],
            complexity: this.complexity
        };
        const dialogRef = this.dialog.open(DialogEndGameComponent, config);
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.start();
            }
        });
    }

    private timer(start: boolean): void {
        if (start) {
            this.interval = setInterval(() => {
                this.time++;
            }, 1000);
        } else {
            clearInterval(this.interval);
        }
    }

    private saveStatistics(win: boolean): void {
        const data = this.statistics[this.complexity];
        if (win) {
            if (this.time < data.best || !data.best) {
                data.best = this.time;
                data.date = new Date().toString();
            }
            data.win++;
        }
        data.game++;
        localStorage['statistics'] = JSON.stringify(this.statistics);
    }

    private cellClick(cell: ICell): void {
        if (cell.flag || this.stateGame.lose || this.stateGame.victory || cell.state === 1) {
            return;
        }
        if (this.startGame) {
            this.startGame = false;
            this.field = this.MINER.generateMines(this.field, cell);
            this.timer(true);
        }
        this.field = this.MINER.changeType(this.field, cell);
    }

    private rightClick(e, cell: ICell): void {
        e.preventDefault();
        if (this.stateGame.lose || this.stateGame.victory) {
            return;
        }
        this.field = this.MINER.changeFlag(this.field, cell);
    }

    private up(e, cell: ICell): void {
        if (e.which === 3) {
            this.rightPress = false;
        }
        if (e.which === 1) {
            this.leftPress = false;
        }
        if (!this.leftPress || !this.rightPress) {
            const isOpen = e.which === 1 && this.rightPress || e.which === 3 && this.leftPress;
            this.field = this.MINER.changeActiveCells(this.field, cell, false, isOpen);
        }
    }

    private down(e, cell: ICell): void {
        if (e.which === 3) {
            this.rightPress = true;
        }
        if (e.which === 1) {
            this.leftPress = true;
        }
        if (this.leftPress && this.rightPress) {
            this.field = this.MINER.changeActiveCells(this.field, cell, true);
        }
    }


    private showStatistics(): void {
        const dialogRef = this.dialog.open(DialogStatisticsComponent);
        dialogRef.afterClosed().subscribe(() => {
            this.statistics = JSON.parse(localStorage['statistics']);
        });
    }

    private showRules(): void {
        this.dialog.open(DialogRulesComponent);
    }

    private showAbout(): void {
        const config = new MdDialogConfig();
        config.width = '450px';
        this.dialog.open(DialogAboutComponent, config);
    }

}
