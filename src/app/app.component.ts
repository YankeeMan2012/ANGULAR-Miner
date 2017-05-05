import { Component, OnInit } from '@angular/core';
import {ICell} from './field';
import {IOptions, ILevel} from './options';
import {MinerService} from './miner.service';

import {DomSanitizer} from '@angular/platform-browser';
import {MdIconRegistry} from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    private startGame: boolean = true;
    private field: ICell[][] = [];
    private options: IOptions = {
        width: null,
        height: null,
        mines: null
    };
    private stateGame = {
        victory: false,
        lose: false
    };
    private levels: ILevel[] = [
        {title: 'Новичок'},
        {title: 'Любитель'},
        {title: 'Профессионал'},
        {title: 'Настроенный под заказ'}
    ];

    private rightPress: boolean = false;
    private leftPress: boolean = false;

    constructor(private MINER: MinerService, iconRegistry: MdIconRegistry, sanitizer: DomSanitizer) {
        iconRegistry.addSvgIcon('bomb', sanitizer.bypassSecurityTrustResourceUrl('assets/img/bomb.svg'));
    }

    ngOnInit() {
        // this.field = this.MINER.generateField(this.field);
    }

    private play(e): void {
        e.preventDefault();
        this.MINER.setOptions(this.options);
        this.field = this.MINER.generateField(this.field);
    }

    private cellClick(cell: ICell): void {
        if (cell.flag || this.stateGame.lose || this.stateGame.victory || cell.state === 1) return;
        if (this.startGame) {
            this.startGame = false;
            this.field = this.MINER.generateMines(this.field, cell);
        }
        this.field = this.MINER.changeType(this.field, cell);
        this.stateGame = this.MINER.checkStateGame();
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
            console.log(e.which === 1 , this.rightPress);
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
