// Core
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

// Components
import { AppComponent } from './app.component';
import { CardComponent } from './components/card/card.component';
import { HomeComponent } from './pages/home/home.component';
import { ScoreComponent } from './components/score/score.component';
import { ButtonComponent } from './components/button/button.component';
import { MaterialModule } from './material/material.module';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    HomeComponent,
    ScoreComponent,
    ButtonComponent,
    LoaderComponent,
  ],
  imports: [BrowserModule, HttpClientModule, MaterialModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
