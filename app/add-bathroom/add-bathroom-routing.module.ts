import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { AddBathroomComponent } from "./add-bathroom.component";

const routes: Routes = [
    { path: "", component: AddBathroomComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class AddBathroomRoutingModule { }
