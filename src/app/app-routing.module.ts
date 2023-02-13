import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactComponent } from './components/pages/contact/contact.component';
import { BlogDetailsComponent } from './components/pages/blog-details/blog-details.component';
import { BlogComponent } from './components/pages/blog/blog.component';
import { ProductsDetailsComponent } from './components/pages/products-details/products-details.component';
import { ComingSoonComponent } from './components/pages/coming-soon/coming-soon.component';
import { ErrorComponent } from './components/pages/error/error.component';
import { SignupComponent } from './components/pages/signup/signup.component';
import { LoginComponent } from './components/pages/login/login.component';
import { FaqComponent } from './components/pages/faq/faq.component';
import { TeamComponent } from './components/pages/team/team.component';
import { ProjectsComponent } from './components/pages/projects/projects.component';
import { ProjectsDetailsComponent } from './components/pages/projects-details/projects-details.component';
import { ServicesComponent } from './components/pages/services/services.component';
import { AboutComponent } from './components/pages/about/about.component';
import { StartupHomeComponent } from './components/pages/startup-home/startup-home.component';
import { ProfileComponent } from './components/pages/profile/profile.component';

const routes: Routes = [
    {path: '', component: StartupHomeComponent},
    {path: 'about', component: AboutComponent},
    {path: 'services', component: ServicesComponent},
    {path: 'projects', component: ProjectsComponent},
    {path: 'projects-details', component: ProjectsDetailsComponent},
    {path: 'team', component: TeamComponent},
    {path: 'faq', component: FaqComponent},
    {path: 'login', component: LoginComponent},
    {path: 'signup', component: SignupComponent},
    {path: 'error', component: ErrorComponent},
    {path: 'coming-soon', component: ComingSoonComponent},
    {path: 'products-details', component: ProductsDetailsComponent},
    {path: 'blog', component: BlogComponent},
    {path: 'blog-details', component: BlogDetailsComponent},
    {path: 'contact', component: ContactComponent},
    {path: 'profile', component: ProfileComponent},
    {path: '**', component: ErrorComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
    exports: [RouterModule]
})
export class AppRoutingModule {}