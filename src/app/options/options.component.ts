import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {IOptions} from '../options';
import {MinerService} from '../miner.service';

@Component({
    selector: 'app-options',
    templateUrl: './options.component.html',
    styleUrls: ['./options.component.css']
})
export class Options {

    private options: IOptions = {
        width: null,
        height: null,
        mines: null
    };

    constructor (private router: Router, private miner: MinerService) {}

    private play(e): void {
        e.preventDefault();
        this.miner.setOptions(this.options);
        this.router.navigate(['/game']);
    }

}
