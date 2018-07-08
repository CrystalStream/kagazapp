import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
const appSettings = require('application-settings')

@Injectable()
export class AuthenticationGuard implements CanActivate {
    
  constructor(
    private router: RouterExtensions) { }

    canActivate(): boolean {
        if (!appSettings.getString('token')) {
            this.router.navigate(["login"], { clearHistory: true });
        }

        return true;
    }
}
