import {IOptions, ICell, IState} from './options.interface';
import {Subject} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable()
export class MinerService {

    public onChangeState = new Subject();
    private freeCounter: number;
    private options: IOptions;
    private stateGame: IState = {
        victory: false,
        lose: false,
        mines: 0
    };

    public setOptions(options: IOptions): void {
        this.options = options;
    }

    private changeState(): void {
        this.onChangeState.next(this.stateGame);
    }

    public generateField(field: ICell[][]): ICell[][] {
        this.stateGame = {
            victory: false,
            lose: false,
            mines: this.options.mines
        };
        this.freeCounter = 0;

        for (let h = 0; h < this.options.height; h++) {
            for (let w = 0; w < this.options.width; w++) {
                if (!field[h]) field[h] = [];
                field[h][w] = { title: null, state: 0, x: w, y: h, flag: false, active: false, };
            }
        }
        this.changeState();
        return field;
    }

    public generateMines(field: ICell[][], cell: ICell): ICell[][] {
        let counter = this.options.mines;
        while (counter > 0) {
            const h = Math.round(Math.random() * (this.options.height - 1));
            const w = Math.round(Math.random() * (this.options.width - 1));
            if (field[h][w].state !== 2 && field[h][w] !== cell) {
                field[h][w].state = 2;
                field[h][w].title = null;
                for (let x = h - 1; x < h + 2; x++) {
                    for (let y = w - 1; y < w + 2; y++) {
                        if (x >= 0 && x < this.options.height && y >= 0 && y < this.options.width) {
                            if (field[x][y].state !== 2) {
                                field[x][y].title += 1;
                            }
                        }
                    }
                }
                counter--;
            }
        }
        cell.state = 1;
        return field;
    }

    public changeType(field: ICell[][], cell: ICell): ICell[][] {
        let h = this.options.height;
        let w = this.options.width;
        if (cell.state === 2) {
            for (let i = 0; i < h; i++) {
                for (let j = 0; j < w; j++) {
                    if (field[i][j].state === 2) {
                        field[i][j].state = 3
                    }
                }
            }
            this.stateGame.lose = true;
        } else if (!cell.title) {
            cell.state = 1;
            for (let i = cell.y - 1; i < cell.y + 2; i++) {
                for (let j = cell.x - 1; j < cell.x + 2; j++) {
                    if (i >= 0 && i < h && j >= 0 && j < w && field[i][j].state === 0 && !field[i][j].flag) {
                        field = this.changeType(field, field[i][j]);
                    }
                }
            }
        } else {
            cell.state = 1;
        }
        this.countFreeCells();
        this.changeState();
        return field;
    }

    public changeActiveCells(field: ICell[][], cell: ICell, flag, open?): ICell[][] {
        let flagCounter = 0;
        for (let i = cell.y - 1; i < cell.y + 2; i++) {
            for (let j = cell.x - 1; j < cell.x + 2; j++) {
                if (i >= 0 && i < this.options.height && j >= 0 && j < this.options.width) {
                    if (!flag) {
                        field[i][j].active = flag;
                    } else if ((field[i][j].state === 0 || field[i][j].state === 2) && !field[i][j].flag) {
                        field[i][j].active = flag;
                    }
                    if (field[i][j].flag) flagCounter++;
                }
            }
        }
        if (cell.title == flagCounter && open) {
            for (let i = cell.y - 1; i < cell.y + 2; i++) {
                for (let j = cell.x - 1; j < cell.x + 2; j++) {
                    if (i >= 0 && i < this.options.height && j >= 0 && j < this.options.width) {
                        if ((field[i][j].state === 0 || field[i][j].state === 2) && !field[i][j].flag) {
                            field = this.changeType(field, field[i][j]);
                        }
                    }
                }
            }
        }
        return field;
    }

    public changeFlag(field: ICell[][], cell: ICell): ICell[][] {
        if (cell.state === 0 || cell.state === 2) {
            cell.flag = !cell.flag;
            cell.flag ? this.stateGame.mines-- : this.stateGame.mines++;
        }
        // cell.flag = (cell.state === 0 || cell.state === 2) && !cell.flag;
        // cell.flag ? this.stateGame.mines-- : this.stateGame.mines++;
        this.changeState();
        return field;
    }

    private countFreeCells(): void {
        this.freeCounter++;
        let freeCells = this.options.width * this.options.height - this.options.mines - this.freeCounter;
        if (freeCells === 0) {
            this.stateGame.victory = true;
        }
    }

}