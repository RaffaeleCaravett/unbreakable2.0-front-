import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorsDialogComponent } from './appStructure/Shared/Components/dialogs/errors-dialog/errors-dialog.component';
import { CommentsAndReviewsComponent } from './appStructure/Shared/Components/comments-and-reviews/comments-and-reviews.component';
import { ModifyCommentDialogComponent } from './appStructure/Shared/Components/dialogs/modifyCommentDialog/modify-comment-dialog/modify-comment-dialog.component';
import { EmojisComponent } from './appStructure/Shared/Components/emojis/emojis/emojis.component';
import { FooterComponent } from './appStructure/Shared/Components/footer/footer.component';
import { MapComponent } from './appStructure/Shared/Components/map/map.component';
import { NavbarComponent } from './appStructure/Shared/Components/navbar/navbar.component';
import { UnbreackableLettersComponent } from './appStructure/Shared/Components/unbreackable-letters/unbreackable-letters.component';
import { X401SpeechComponent } from './appStructure/Shared/Components/x401-speech/x401-speech.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    AppComponent,
    ErrorsDialogComponent,
    CommentsAndReviewsComponent,
    ModifyCommentDialogComponent,
    EmojisComponent,
    FooterComponent,
    MapComponent,
    NavbarComponent,
    UnbreackableLettersComponent,
    X401SpeechComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatIconModule,
    ReactiveFormsModule,
    MatBadgeModule,
    MatDialogModule
  ],
  exports:[
    ErrorsDialogComponent,
    CommentsAndReviewsComponent,
    ModifyCommentDialogComponent,
    EmojisComponent,
    FooterComponent,
    MapComponent,
    NavbarComponent,
    UnbreackableLettersComponent,
    X401SpeechComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
