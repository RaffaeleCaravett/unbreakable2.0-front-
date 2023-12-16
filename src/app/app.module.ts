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
import { FormsComponent } from './appStructure/Components/Forms/forms/forms.component';
import { SignupComponent } from './appStructure/Components/Forms/signup/signup.component';
import { LoginComponent } from './appStructure/Components/Forms/login/login.component';
import { HomePageComponent } from './appStructure/Components/MainPages/home-page/home-page.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatOptionModule } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import { ChemistryComponent } from './appStructure/Components/MainPages/Chemistry/chemistry.component';
import { ExerciseComponent } from './appStructure/Components/MainPages/Exercise/exercise/exercise.component';
import { MakeContactComponent } from './appStructure/Components/MainPages/make-contact/make-contact.component';
import { LightComponent } from './appStructure/Components/MainPages/Light/light/light.component';
import { MusicComponent } from './appStructure/Components/MainPages/Music/music/music.component';
import { NeurogenesisComponent } from './appStructure/Components/MainPages/Neurogenesis/neurogenesis/neurogenesis.component';
import { NutritionComponent } from './appStructure/Components/MainPages/Nutrition/nutrition/nutrition.component';
import { PathComponent } from './appStructure/Components/MainPages/Path/path/path.component';
import { ProfileComponent } from './appStructure/Components/MainPages/profile/profile.component';
import { SleepComponent } from './appStructure/Components/MainPages/Sleep/sleep/sleep.component';
import { TipsComponent } from './appStructure/Components/MainPages/Tips/tips/tips.component';
import { VisitProfileComponent } from './appStructure/Components/MainPages/visit-profile/visit-profile.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

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
    X401SpeechComponent,
    FormsComponent,
    SignupComponent,
    LoginComponent,
    HomePageComponent,
    ChemistryComponent,
    ExerciseComponent,
    MakeContactComponent,
    LightComponent,
    MusicComponent,
    NeurogenesisComponent,
    NutritionComponent,
    PathComponent,
    ProfileComponent,
    SleepComponent,
    TipsComponent,
    VisitProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatIconModule,
    ReactiveFormsModule,
    MatBadgeModule,
    MatDialogModule,
    MatFormFieldModule,

    MatStepperModule,
    MatOptionModule,
    HttpClientModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
MatTableModule,
MatPaginatorModule,
MatInputModule,
MatButtonModule,
MatSelectModule

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
    X401SpeechComponent,
    FormsComponent,
    SignupComponent,
    LoginComponent,
    HomePageComponent,
    ChemistryComponent,
    ExerciseComponent,
    MakeContactComponent,
    LightComponent,
    MusicComponent,
    NeurogenesisComponent,
    NutritionComponent,
    PathComponent,
    ProfileComponent,
    SleepComponent,
    TipsComponent,
    VisitProfileComponent

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
