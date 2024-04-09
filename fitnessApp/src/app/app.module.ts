import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';

import { MatNativeDateModule } from '@angular/material/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InDephWorkoutMainComponent } from './in-deph-workout-main/in-deph-workout-main.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { TrainerLoginComponent } from './trainer-login/trainer-login.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UsernameRecoveryComponent } from './username-recovery/username-recovery.component';
import { PasswordRecoveryComponent } from './password-recovery/password-recovery.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ComponentPathsComponent } from './component-paths/component-paths.component';
import { RegistrationComponent } from './registration/registration.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { inputComponent } from './input/input.component';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule, MatTabNav } from '@angular/material/tabs';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgFor } from '@angular/common';
import { WorkoutentryComponent } from './workoutentry/workoutentry.component';
import { FoodentryComponent } from './foodentry/foodentry.component';
import { HttpClientModule } from '@angular/common/http';
import { ClientPageComponent } from './client-page/client-page.component';
import { UserHomepageComponent } from './user-homepage/user-homepage.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ClienttrainerInformationPageComponent } from './clienttrainer-information-page/clienttrainer-information-page.component';
import { MentalWellnessTrackerComponent } from './mental-wellness-tracker/mental-wellness-tracker.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AccountTerminationComponent } from './account-termination/account-termination.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ReportPageComponent } from './report-page/report-page.component';
import { WorkoutEntryComponent } from './workout-entry/workout-entry.component';
import { LogOutComponent } from './log-out/log-out.component';
import { PersonalFitnessGoalsComponent } from './personal-fitness-goals/personal-fitness-goals.component';
import { httpInterceptorProviders } from './login.interceptor';
import { GroupFinderComponent } from './group-finder/group-finder.component';
import { ChatPageComponent } from './chat-page/chat-page.component';
import { ChatListComponent } from './chat-list/chat-list.component';
import { SettingsFitnessCalorieComponent } from './settings-fitness-calorie/settings-fitness-calorie.component';
import { SocialPageComponent } from './social-page/social-page.component';
import { FriendFinderComponent } from './friend-finder/friend-finder.component';
import { RouterModule } from '@angular/router';
import { FaqComponent } from './faq/faq.component';
import { SoundAndNotificationsComponent } from './sound-and-notifications/sound-and-notifications.component';
import { SettingsFontSizeComponent } from './settings-font-size/settings-font-size.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { GroupPageComponent } from './group-page/group-page.component';
import { GroupCreationComponent } from './group-creation/group-creation.component';
import { AchievementsComponent } from './achievements/achievements.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { GroupSettingsComponent } from './group-settings/group-settings.component';
import { WorkoutInformationComponent } from './workout-information/workout-information.component';
import { GroupInviteComponent } from './group-invite/group-invite.component';
import { AccountComponent } from './account/account.component';
import { CalorieInformationComponent } from './calorie-information/calorie-information.component';
import { SocialInviteComponent } from './social-invite/social-invite.component';


@NgModule({
  declarations: [
    AppComponent,
    InDephWorkoutMainComponent,
    TrainerLoginComponent,
    UserLoginComponent,
    UsernameRecoveryComponent,
    PasswordRecoveryComponent,
    ChangePasswordComponent,
    ComponentPathsComponent,
    RegistrationComponent,
    inputComponent,
    WorkoutentryComponent,
    FoodentryComponent,
    ClientPageComponent,
    UserHomepageComponent,
    NavbarComponent,
    NotFoundComponent,
    ClienttrainerInformationPageComponent,
    MentalWellnessTrackerComponent,
    AccountTerminationComponent,
    ContactUsComponent,
    ReportPageComponent,
    WorkoutEntryComponent,
    LogOutComponent,
    PersonalFitnessGoalsComponent,
    GroupFinderComponent,
    ChatPageComponent,
    ChatListComponent,
    SettingsFitnessCalorieComponent,
    SocialPageComponent,
    FriendFinderComponent,
    FaqComponent,
    SoundAndNotificationsComponent,
    SettingsFontSizeComponent,
    GroupPageComponent,
    GroupCreationComponent,
    AchievementsComponent,
    ProfilePageComponent,
    GroupSettingsComponent,
    WorkoutInformationComponent,
    GroupInviteComponent,
    AccountComponent,
    CalorieInformationComponent,
    SocialInviteComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    MatTooltipModule,
    MatListModule,
    MatRadioModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatTableModule,
    MatDividerModule,
    NgFor,
    MatCardModule,
    HttpClientModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatDialogModule,
    MatTabsModule,
    MatBottomSheetModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatSlideToggleModule,
    RouterModule,
    MatExpansionModule,
    MatMenuModule,
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
