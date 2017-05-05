import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {MaterialModule} from '@angular/material';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import 'hammerjs';

import {AppComponent} from './app.component';
import {Options} from './options/options.component';
import {GameField} from './game-field/game-field.component';

import {MinerService} from './miner.service';

@NgModule({
    declarations: [
        AppComponent,
        Options,
        GameField
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        MaterialModule,
        BrowserAnimationsModule
    ],
    providers: [MinerService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
