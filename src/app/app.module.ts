import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {
    MdInputModule,
    MdRadioModule,
    MdMenuModule,
    MdSidenavModule,
    MdToolbarModule,
    MdCardModule,
    MdTabsModule,
    MdButtonModule,
    MdIconModule,
    MdDialogModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import 'hammerjs';

import {AppComponent} from './app.component';
import {DialogEndGameComponent} from './end-game-dialog/dialog-end-game.component';
import {DialogStatisticsComponent} from './statistics-dialog/dialog-statistics.component';
import {MinerService} from './shared/miner.service';
import {DialogConfirmComponent} from './confirm-dialog/dialog-confirm.component';
import {DialogRulesComponent} from './rules-dialog/dialog-rules.component';
import {DialogAboutComponent} from './about-dialog/dialog-about.component';

@NgModule({
    declarations: [
        AppComponent,
        DialogEndGameComponent,
        DialogStatisticsComponent,
        DialogConfirmComponent,
        DialogRulesComponent,
        DialogAboutComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        MdInputModule,
        MdRadioModule,
        MdMenuModule,
        MdSidenavModule,
        MdToolbarModule,
        MdCardModule,
        MdTabsModule,
        MdButtonModule,
        MdIconModule,
        MdDialogModule,
        BrowserAnimationsModule
    ],
    providers: [MinerService],
    bootstrap: [AppComponent],
    entryComponents: [
        DialogEndGameComponent,
        DialogStatisticsComponent,
        DialogConfirmComponent,
        DialogRulesComponent,
        DialogAboutComponent
    ]
})
export class AppModule {
}
