import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { GoogleMapsComponent } from "./googleMaps.component";

const routes: Routes = [
    { path: "", component: GoogleMapsComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class GoogleMapsRoutingModule { }
