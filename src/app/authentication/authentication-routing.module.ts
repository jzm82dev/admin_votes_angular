import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './authentication.component';

const routes: Routes = [
  { path: '', component: AuthenticationComponent,
  children: [
    {
      path: '',
      redirectTo:'login',
      pathMatch:'full'
    },
    {
      path: 'login',
      loadChildren: () =>
        import('./login/login.module').then((m) => m.LoginModule)
    },
    {
      path: 'forgot-password',
      loadChildren: () =>
        import('./forgot-password/forgot-password.module').then(
          (m) => m.ForgotPasswordModule
        ),
    },
    {
      path: 'new-password/:token',
      loadChildren: () =>
        import('./new-password/new-password.module').then(
          (m) => m.NewPasswordModule
        ),
    },
    {
      path: 'register-player',
      loadChildren: () =>
        import('./register/register.module').then((m) => m.RegisterModule),
    },
    {
      path: 'register-club',
      loadChildren: () =>
        import('./register-club/register-club.module').then((m) => m.RegisterClubModule),
    },
    {
      path: 'cookie-policy',
      loadChildren: () =>
        import('../public/cookie-policy/cookie-policy.module').then((m) => m.CookiePolicyModule),
    },
    {
      path: 'privacy-policy',
      loadChildren: () =>
        import('../public/privacy-policy/privacy-policy.module').then((m) => m.PrivacyPolicyModule),
    },
    {
      path: 'terms-and-conditions',
      loadChildren: () =>
        import('../public/terms-and-condition/terms-and-condition.module').then((m) => m.TermsAndConditionModule),
    },
    {
      path: 'change-password2',
      loadChildren: () =>
        import('./change-password2/change-password2.module').then(
          (m) => m.ChangePassword2Module
        ),
    },
    {
      path: 'lock-screen',
      loadChildren: () =>
        import('./lock-screen/lock-screen.module').then(
          (m) => m.LockScreenModule
        ),
    },
    {
      path: 'verify-email/:token',
      loadChildren: () =>
        import('./verify-wait-screen/verify-wait-screen.module').then(
          (m) => m.VerifyWaitScreenModule
        ),
    },
  ],
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthenticationRoutingModule {}
