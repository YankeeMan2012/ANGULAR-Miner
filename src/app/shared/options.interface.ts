export interface IOptions {
    width: number;
    height: number;
    mines: number;
}

export interface ILevel {
    title: string;
    params: IOptions;
}

export interface IState {
    victory: boolean,
    lose: boolean,
    mines: number,
}

export interface ICell {
    title: number;
    state: number;
    x: number;
    y: number;
    flag: boolean;
    active: boolean;
}

// states: 0 - free hidden;
//         1 - free open;
//         2 - mine hidden;
//         3 - mine open;
//         4 - mine target;