import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { AddBathroomRoutingModule } from "./add-bathroom-routing.module";
import { AddBathroomComponent } from "./add-bathroom.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        AddBathroomRoutingModule,
        NativeScriptFormsModule
    ],
    declarations: [
        AddBathroomComponent
    ], 
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AddBathroomModule { }