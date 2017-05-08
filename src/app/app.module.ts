import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {MaterialModule} from '@angular/material';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import 'hammerjs';

import {AppComponent} from './app.component';
import {DialogEndGame} from './end-game-dialog/dialog-end-game.component';
import {DialogStatistics} from './statistics-dialog/dialog-statistics.component';
import {MinerService} from './shared/miner.service';
import {DialogConfirm} from "./confirm-dialog/dialog-confirm.component";
import {DialogRules} from "./rules-dialog/dialog-rules.component";
import {DialogAbout} from "./about-dialog/dialog-about.component";

@NgModule({
    declarations: [
        AppComponent,
        DialogEndGame,
        DialogStatistics,
        DialogConfirm,
        DialogRules,
        DialogAbout
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        MaterialModule,
        BrowserAnimationsModule
    ],
    providers: [MinerService],
    bootstrap: [AppComponent],
    entryComponents: [
        DialogEndGame,
        DialogStatistics,
        DialogConfirm,
        DialogRules,
        DialogAbout
    ]
})
export class AppModule {
}
