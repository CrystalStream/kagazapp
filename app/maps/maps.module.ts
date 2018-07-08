import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import {registerElement} from "nativescript-angular/element-registry";

import { MapsRoutingModule } from "./maps-routing.module";
import { MapsComponent } from "./maps.component";

// Important - must register MapView plugin in order to use in Angular templates
registerElement("MapView", () => require("nativescript-google-maps-sdk").MapView);

@NgModule({
    imports: [
        NativeScriptCommonModule,
        MapsRoutingModule,
        NativeScriptFormsModule
    ],
    declarations: [
        MapsComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class MapsModule { }
