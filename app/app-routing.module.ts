import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { AuthenticationGuard } from "./shared/guards/AuthenticationGuard";

const routes: Routes = [
    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "login", loadChildren: "./login/login.module#LoginModule" },
    { path: "register", loadChildren: "./register/register.module#RegisterModule" },
    { path: "home", loadChildren: "./home/home.module#HomeModule", canActivate: [AuthenticationGuard]  },
    { path: "maps", loadChildren: "./maps/maps.module#MapsModule" },
    { path: "add-bathroom", loadChildren: "./add-bathroom/add-bathroom.module#AddBathroomModule" }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
