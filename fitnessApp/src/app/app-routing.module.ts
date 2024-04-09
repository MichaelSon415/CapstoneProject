import { ComponentPathsComponent } from './component-paths/component-paths.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InDephWorkoutMainComponent } from './in-deph-workout-main/in-deph-workout-main.component';
import { TrainerLoginComponent } from './trainer-login/trainer-login.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UsernameRecoveryComponent } from './username-recovery/username-recovery.component';
import { PasswordRecoveryComponent } from './password-recovery/password-recovery.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { RegistrationComponent } from './registration/registration.component';
import { inputComponent } from './input/input.component';
import { FoodentryComponent } from './foodentry/foodentry.component';
import { ClientPageComponent } from './client-page/client-page.component';
import { UserHomepageComponent } from './user-homepage/user-homepage.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ClienttrainerInformationPageComponent } from './clienttrainer-information-page/clienttrainer-information-page.component';
import { MentalWellnessTrackerComponent } from './mental-wellness-tracker/mental-wellness-tracker.component';
import { AccountTerminationComponent } from './account-termination/account-termination.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ReportPageComponent } from './report-page/report-page.component';
import { WorkoutentryComponent } from './workoutentry/workoutentry.component';
import { LogOutComponent } from './log-out/log-out.component';
import { PersonalFitnessGoalsComponent } from './personal-fitness-goals/personal-fitness-goals.component';
import { GroupFinderComponent } from './group-finder/group-finder.component';
import { ChatPageComponent } from './chat-page/chat-page.component';
import { ChatListComponent } from './chat-list/chat-list.component';
import { SettingsFitnessCalorieComponent } from './settings-fitness-calorie/settings-fitness-calorie.component';
import { SocialPageComponent } from './social-page/social-page.component';
import { FriendFinderComponent } from './friend-finder/friend-finder.component';
import { FaqComponent } from './faq/faq.component';
import { SoundAndNotificationsComponent } from './sound-and-notifications/sound-and-notifications.component';
import { SettingsFontSizeComponent } from './settings-font-size/settings-font-size.component';
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


const routes: Routes = [
  //Make the '' component the start off/root point for when we 'ng serve' the localhost server
  //{ path: '', component: TrainerLoginComponent },
  {
    path: 'navbar', component: NavbarComponent, children: [

      { path: 'indephworkoutmaincomponent', component: InDephWorkoutMainComponent },
      { path: 'usernamerecovery', component: UsernameRecoveryComponent },
      { path: 'passwordrecovery', component: PasswordRecoveryComponent },
      { path: 'componentpaths', component: ComponentPathsComponent },
      { path: 'changepassword', component: ChangePasswordComponent },
      { path: 'registration', component: RegistrationComponent },
      { path: 'input', component: inputComponent },
      { path: 'faq', component: FaqComponent },
      { path: 'foodentry', component: FoodentryComponent },
      { path: 'foodentry/:calorieId', component: FoodentryComponent },
      { path: 'clientpage', component: ClientPageComponent },
      { path: 'homepage', component: UserHomepageComponent },
      { path: 'userhomepage', component: ClienttrainerInformationPageComponent },
      { path: 'mentalwellnesstracker', component: MentalWellnessTrackerComponent },
      { path: 'accounttermination', component: AccountTerminationComponent },
      { path: 'contactus', component: ContactUsComponent },
      { path: 'reportpage', component: ReportPageComponent },
      { path: 'workoutentry', component: WorkoutentryComponent },
      { path: 'workoutentry/:workoutId', component: WorkoutentryComponent },
      { path: 'logout', component: LogOutComponent },
      { path: 'personalfitnessgoals', component: PersonalFitnessGoalsComponent },
      { path: 'groupfinder', component: GroupFinderComponent },
      { path: 'settingsfitnesscalorie', component: SettingsFitnessCalorieComponent },
      { path: 'socialpage', component: SocialPageComponent },
      { path: 'soundandnotifications', component: SoundAndNotificationsComponent },
      { path: 'fontsize', component: SettingsFontSizeComponent },
      { path: 'grouppage', component: GroupPageComponent },
      { path: 'groupcreate', component: GroupCreationComponent },
      { path: 'message', component: ChatListComponent },
      { path: 'message/:activeIndex', component: ChatPageComponent },
      { path: 'chatlist', component: ChatListComponent },
      { path: 'achievements', component: AchievementsComponent },
      { path: 'friendfinder', component: FriendFinderComponent },
      { path: 'profilepage', component: ProfilePageComponent },
      { path: 'groupsettings', component: GroupSettingsComponent },
      { path: 'workout_info', component: WorkoutInformationComponent },
      { path: 'group_invite', component: GroupInviteComponent },
      { path: 'account', component: AccountComponent },
      { path: 'calorieinformation', component: CalorieInformationComponent },
      { path: 'socialinvite', component: SocialInviteComponent },







      { path: '', component: UserHomepageComponent },
      { path: '**', component: NotFoundComponent },

    ]
  },
  { path: 'trainerlogin', component: TrainerLoginComponent },

  { path: 'indephworkoutmaincomponent', component: InDephWorkoutMainComponent },
  { path: 'usernamerecovery', component: UsernameRecoveryComponent },
  { path: 'passwordrecovery', component: PasswordRecoveryComponent },
  { path: 'componentpaths', component: ComponentPathsComponent },
  { path: 'changepassword', component: ChangePasswordComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'input', component: inputComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'foodentry', component: FoodentryComponent },
  { path: 'clientpage', component: ClientPageComponent },
  { path: 'homepage', component: UserHomepageComponent },
  { path: 'clienttrainerinformationpage', component: ClienttrainerInformationPageComponent },
  { path: 'mentalwellnesstracker', component: MentalWellnessTrackerComponent },
  { path: 'accounttermination', component: AccountTerminationComponent },
  { path: 'contactus', component: ContactUsComponent },
  { path: 'reportpage', component: ReportPageComponent },
  { path: 'workoutentry', component: WorkoutentryComponent },
  { path: 'logout', component: LogOutComponent },
  { path: 'personalfitnessgoals', component: PersonalFitnessGoalsComponent },
  { path: 'groupfinder', component: GroupFinderComponent },
  { path: 'ChatPage', component: ChatPageComponent },
  { path: 'ChatList', component: ChatListComponent },
  { path: 'settingsfitnesscalorie', component: SettingsFitnessCalorieComponent },
  { path: 'socialpage', component: SocialPageComponent },
  { path: 'friendfinder', component: FriendFinderComponent },
  { path: 'userhomepage', component: UserHomepageComponent },
  { path: 'soundandnotifications', component: SoundAndNotificationsComponent },
  { path: 'account', component: AccountComponent },


  { path: '', component: UserLoginComponent },
  { path: 'userlogin', component: UserLoginComponent },















  { path: '**', component: NotFoundComponent },









];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
