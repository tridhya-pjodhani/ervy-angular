import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PreloaderComponent } from './components/layouts/preloader/preloader.component';
import { FooterComponent } from './components/layouts/footer/footer.component';
import { NavbarThreeComponent } from './components/layouts/navbar-three/navbar-three.component';
import { AboutComponent } from './components/pages/about/about.component';
import { ServicesComponent } from './components/pages/services/services.component';
import { ProjectsComponent } from './components/pages/projects/projects.component';
import { ProjectsDetailsComponent } from './components/pages/projects-details/projects-details.component';
import { TeamComponent } from './components/pages/team/team.component';
import { FaqComponent } from './components/pages/faq/faq.component';
import { LoginComponent } from './components/pages/login/login.component';
import { SignupComponent } from './components/pages/signup/signup.component';
import { ErrorComponent } from './components/pages/error/error.component';
import { ComingSoonComponent } from './components/pages/coming-soon/coming-soon.component';
import { ProductsDetailsComponent } from './components/pages/products-details/products-details.component';
import { BlogComponent } from './components/pages/blog/blog.component';
import { BlogDetailsComponent } from './components/pages/blog-details/blog-details.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Constants } from './API-URL/contants';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor, JwtInterceptor } from './components/helpers';
import { ToastrModule } from 'ngx-toastr';
import { NgSelectModule } from '@ng-select/ng-select';
import { StartupHomeComponent } from './components/pages/startup-home/startup-home.component';
import { ProfileComponent } from './components/pages/profile/profile.component';

@NgModule({
  declarations: [
    StartupHomeComponent,
    AppComponent,
    PreloaderComponent,
    FooterComponent,
    NavbarThreeComponent,
    AboutComponent,
    ServicesComponent,
    ProjectsComponent,
    ProjectsDetailsComponent,
    TeamComponent,
    FaqComponent,
    LoginComponent,
    SignupComponent,
    ErrorComponent,
    ComingSoonComponent,
    ProductsDetailsComponent,
    BlogComponent,
    BlogDetailsComponent,
    ContactComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    NgSelectModule,
    BrowserAnimationsModule
  ],
  providers: [Constants,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
