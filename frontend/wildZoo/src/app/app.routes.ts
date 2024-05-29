import { Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { EventsComponent } from '../components/content-web-components/events/events.component';
import { EventDetailsComponent } from '../components/content-web-components/event-details/event-details.component';
import { AnimalsComponent } from '../components/content-web-components/animals/animals.component';
import { PageNotFoundComponent } from '../components/page-not-found/page-not-found.component';
import { AnimalDetailsComponent } from '../components/content-web-components/animal-details/animal-details.component';
import { PackageDetailsComponent } from '../components/content-web-components/package-details/package-details.component';
import { UserConfigurationComponent } from '../components/user-configuration-all/user-configuration/user-configuration.component';
import { TicketComponent } from '../components/content-web-components/ticket/ticket.component';
import { AboutComponent } from '../components/about/about.component';
import { ContactComponent } from '../components/contact/contact.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'eventos', component: EventsComponent },
    { path: 'eventos/:id', component: EventDetailsComponent },
    { path: 'animales', component: AnimalsComponent },
    { path: 'animales/clase/:id', component: AnimalsComponent },
    { path: 'animales/:id', component: AnimalDetailsComponent },
    { path: 'paquete/:id', component: PackageDetailsComponent },
    { path: 'user/configuracion/:token', component: UserConfigurationComponent },
    { path: 'entradas', component: TicketComponent },
    { path: 'sobre-nosotros', component: AboutComponent},
    { path: 'contacto', component: ContactComponent},
    { path: '**', component: PageNotFoundComponent }
];
