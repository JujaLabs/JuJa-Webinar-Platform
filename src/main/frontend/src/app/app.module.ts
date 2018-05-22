import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import { AlertModule } from 'ngx-bootstrap';

import {RouterModule, Routes} from '@angular/router';

import {AppComponent} from './app.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule, JsonpModule} from '@angular/http';

import { CommonModule } from '@angular/common';



const appRoutes: Routes = [
  // {path: 'links-list', component: LinksListComponent},
  // {path: 'clients-list', component: ClientsListComponent},
  // {path: 'clicks-list', component: ClickEventListComponent},
  // {path: 'analytics', component: AnalyticsComponent},
  // {path: 'marketing-groups', component: MarketingGroupsComponent},
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    JsonpModule,
    HttpModule,
    AlertModule.forRoot(),
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true} // <-- debugging purposes only
    ),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
