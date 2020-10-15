import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HomeComponent } from './Components/home/home.component';
import { MaterialModule } from './Modules/material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MenuComponent } from './Components/menu/menu.component';
import { AppComponent } from './Components/app.component';
import { ListComponent } from './Components/list/list.component';

import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
