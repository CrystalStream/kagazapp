import { Component } from "@angular/core";
import * as geolocation from "nativescript-geolocation";

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html"
})
export class AppComponent { 

    ngOnInit() {
        geolocation.enableLocationRequest();
    }
}
