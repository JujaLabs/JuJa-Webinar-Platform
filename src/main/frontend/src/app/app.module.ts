import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AlertModule} from 'ngx-bootstrap';

import {RouterModule, Routes} from '@angular/router';

import {AppComponent} from './app.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule, JsonpModule} from '@angular/http';

import {CommonModule} from '@angular/common';
import {VideoComponent} from './components/video/video.component';
import {ChatComponent} from './components/chat/chat.component';
import {InteractiveComponent} from './components/interactive/interactive.component';
import {SocketService} from "./services/socket/socket.service";

import {StompConfig, StompService} from '@stomp/ng2-stompjs';
// import SockJS from 'sockjs-client';
// import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

const stompConfig: StompConfig = {
  // Which server?
  url: () => {
    return new SockJS('/ws');
  },

  // Headers
  // Typical keys: login, passcode, host
  headers: {
    // login: 'guest',
    // passcode: 'guest'
  },

  // How often to heartbeat?
  // Interval in milliseconds, set to 0 to disable
  heartbeat_in: 0, // Typical value 0 - disabled
  heartbeat_out: 20000, // Typical value 20000 - every 20 seconds

  // Wait in milliseconds before attempting auto reconnect
  // Set to 0 to disable
  // Typical value 5000 (5 seconds)
  reconnect_delay: 5000,

  // Will log diagnostics on console
  debug: true
};


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
    VideoComponent,
    ChatComponent,
    InteractiveComponent,
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
  providers: [
    SocketService,
    StompService,
    {
      provide: StompConfig,
      useValue: stompConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
