import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './appStructure/Components/MainPages/home-page/home-page.component';
import { FormsComponent } from './appStructure/Components/Forms/forms/forms.component';
import { ChemistryComponent } from './appStructure/Components/MainPages/Chemistry/chemistry.component';
import { ExerciseComponent } from './appStructure/Components/MainPages/Exercise/exercise/exercise.component';
import { LightComponent } from './appStructure/Components/MainPages/Light/light/light.component';
import { MusicComponent } from './appStructure/Components/MainPages/Music/music/music.component';
import { NeurogenesisComponent } from './appStructure/Components/MainPages/Neurogenesis/neurogenesis/neurogenesis.component';
import { NutritionComponent } from './appStructure/Components/MainPages/Nutrition/nutrition/nutrition.component';
import { PathComponent } from './appStructure/Components/MainPages/Path/path/path.component';
import { SleepComponent } from './appStructure/Components/MainPages/Sleep/sleep/sleep.component';
import { TipsComponent } from './appStructure/Components/MainPages/Tips/tips/tips.component';
import { MakeContactComponent } from './appStructure/Components/MainPages/make-contact/make-contact.component';
import { ProfileComponent } from './appStructure/Components/MainPages/profile/profile.component';
import { VisitProfileComponent } from './appStructure/Components/MainPages/visit-profile/visit-profile.component';
import { AuthGuard } from './appStructure/Core/Guard/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/forms', pathMatch: 'full' },
  {
    path: 'forms',
    component: FormsComponent
  },
  { path: 'home', component: HomePageComponent, canActivate: [AuthGuard] },
  { path: 'chemistry', component: ChemistryComponent, canActivate: [AuthGuard] },
  { path: 'exercise', component: ExerciseComponent, canActivate: [AuthGuard] },
  { path: 'connect', component: MakeContactComponent, canActivate: [AuthGuard] },
  { path: 'light', component: LightComponent, canActivate: [AuthGuard] },
  { path: 'music', component: MusicComponent, canActivate: [AuthGuard] },
  { path: 'heal', component: NeurogenesisComponent, canActivate: [AuthGuard] },
  { path: 'food', component: NutritionComponent, canActivate: [AuthGuard] },
  { path: 'path', component: PathComponent, canActivate: [AuthGuard] },
  { path: 'profile/:id', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'sleep', component: SleepComponent, canActivate: [AuthGuard] },
  { path: 'tips', component: TipsComponent, canActivate: [AuthGuard] },
  { path: 'visit-profile/:id', component: VisitProfileComponent, canActivate: [AuthGuard] },

  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
