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