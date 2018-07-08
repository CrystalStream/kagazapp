import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { GoogleMapsRoutingModule } from "./googleMaps-routing.module";
import { GoogleMapsComponent } from "./googleMaps.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        GoogleMapsRoutingModule
    ],
    declarations: [
        GoogleMapsComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class GoogleMapsModule { }