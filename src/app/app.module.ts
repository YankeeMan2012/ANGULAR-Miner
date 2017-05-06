import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {MaterialModule} from '@angular/material';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import 'hammerjs';

import {AppComponent, DialogEndGame} from './app.component';
import {MinerService} from './shared/miner.service';

@NgModule({
    declarations: [
        AppComponent,
        DialogEndGame
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
    entryComponents: [DialogEndGame]
})
export class AppModule {
}
