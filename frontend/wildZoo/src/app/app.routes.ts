import { Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { EventsComponent } from '../components/content-web-components/events/events.component';
import { EventDetailsComponent } from '../components/content-web-components/event-details/event-details.component';
import { AnimalsComponent } from '../components/content-web-components/animals/animals.component';
import { PageNotFoundComponent } from '../components/page-not-found/page-not-found.component';
import { AnimalDetailsComponent } from '../components/content-web-components/animal-details/animal-details.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'eventos', component: EventsComponent },
    { path: 'eventos/:id', component: EventDetailsComponent },
    { path: 'animales', component: AnimalsComponent },
    { path: 'animales/clase/:id', component: AnimalsComponent },
    { path: 'animales/:id', component: AnimalDetailsComponent },
    { path: '**', component: PageNotFoundComponent }
];
