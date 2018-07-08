import { Component } from "@angular/core";
import { Store } from '../utils/store'
import { RouterExtensions } from "nativescript-angular/router";
import { Page } from "tns-core-modules/ui/page"
import { AuthService } from '../shared/services/auth.service'

@Component({
    selector: "Maps",
    moduleId: module.id,
    templateUrl: "./maps.component.html"
})
export class MapsComponent {

  onMapReady = (event) => {
    console.log("Map Ready");
  };
}