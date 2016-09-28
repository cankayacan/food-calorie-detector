import { NgModule } from '@angular/core';
import { NativeScriptModule } from 'nativescript-angular/platform';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { NativeScriptHttpModule } from 'nativescript-angular/http';
import { AppComponent } from './app.component';
import { routes, routableComponents } from './app.routes';
import {ClarifaiService} from './services/clarifai.service';
import {NutritionixService} from './services/nutritionix.service';

@NgModule({
    declarations: [
        AppComponent,
        ...routableComponents,
    ],
    bootstrap: [AppComponent],
    imports: [
        NativeScriptModule,
        NativeScriptHttpModule,
        NativeScriptRouterModule,
        NativeScriptRouterModule.forRoot(routes)
    ],
    providers: [
        ClarifaiService,
        NutritionixService
    ]
})
export class AppComponentModule { }
