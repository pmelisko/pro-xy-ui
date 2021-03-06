import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MdSnackBarModule, MdDialogModule } from "@angular/material";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import { DndModule } from 'ng2-dnd';

import { JsonPipe } from './_common/pipes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import './_common/rxjs-extensions'; //load extensions

import { APP_BASE_HREF } from '@angular/common';

import { AppComponent } from './app.component';
import { RequestsComponent } from './views/requests/requests.component';
import { RequestsRowComponent } from './views/requests/request-row.component';
import { StatusComponent } from './views/status/status.component';
import { FindComponent } from './views/find/find.component';
import { ConfigComponent } from './views/config/config.component';
import { DiffDialog } from './views/config/diff.dialog';
import { PluginsDialog } from './views/config/plugins.dialog';
import { LogsComponent } from './views/logs/logs.component';
import { ConnectionComponent } from './views/connection/connection.component';
import { UrlReplaceComponent } from './views/url-replace/url-replace.component';
import { InspectorComponent } from './views/inspector/inspector.component';
import { AutoResponder } from './views/auto-responder/auto-responder.component';
import { DelayComponent } from './views/delay/delay.component';
import { ComposerComponent } from './views/composer/composer.component';


import { SocketService } from './service/socket.service';
import { TrafficService } from './service/traffic.service';
import { ConfigService } from './service/config.service';


@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        MdSnackBarModule,
        MdDialogModule,
        DndModule.forRoot()
        // DataTableModule
    ],
    declarations: [
        AppComponent,
        ConfigComponent,
        RequestsComponent,
        StatusComponent,
        FindComponent,
        UrlReplaceComponent,
        LogsComponent,
        ConnectionComponent,
        InspectorComponent,
        RequestsRowComponent,
        AutoResponder,
        DelayComponent,
        ComposerComponent,
        //pipes:
        JsonPipe,
        //dialogs
        DiffDialog,
        PluginsDialog
    ],
    entryComponents: [
        DiffDialog,
        PluginsDialog
    ],
    bootstrap: [
        AppComponent
    ],
    providers: [
        {
            provide: APP_BASE_HREF,
            useValue: '/'
        },
        SocketService,
        ConfigService,
        TrafficService
        // ErrorHandler
    ]
})
export class AppModule {
}
