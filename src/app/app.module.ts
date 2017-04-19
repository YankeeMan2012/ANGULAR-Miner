import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { Options } from './options/options.component';
import { GameField } from './game-field/game-field.component';

import { MinerService } from './miner.service';

const appRoutes: Routes = [
    { path: '', component: Options },
    { path: 'game', component: GameField },
    { path: '**', component: Options }
];

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
    RouterModule.forRoot(appRoutes)
  ],
  providers: [MinerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
