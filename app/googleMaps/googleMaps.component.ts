import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { Page } from "tns-core-modules/ui/page"
import { NgZone } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import {registerElement} from "nativescript-angular/element-registry";

const mapsModule = require("nativescript-google-maps-sdk");
// Important - must register MapView plugin in order to use in Angular templates
registerElement("MapView", () => require("nativescript-google-maps-sdk").MapView);

@Component({
    selector: "GoogleMaps",
    moduleId: module.id,
    template: `
    <GridLayout>
        <MapView (mapReady)="onMapReady($event)"></MapView>
    </GridLayout>
    `
})
export class GoogleMapsComponent implements OnInit {
    public loggedUserName: string;
    input: any;

    @ViewChild("MapView") mapView: ElementRef;

    //Map events
    onMapReady(event) {
        var mapView = event.object;

        console.log("Setting a marker...");
        var marker = new mapsModule.Marker();
        marker.position = mapsModule.Position.positionFromLatLng(-33.86, 151.20);
        marker.title = "Sydney";
        marker.snippet = "Australia";
        marker.userData = { index : 1};
        mapView.addMarker(marker);
        console.log("Map Ready");
    };

    constructor(
        private page: Page,
        private router: RouterExtensions,
        private zone: NgZone
    ) {
       
        this.page.actionBarHidden = false;
    }

    ngOnInit(): void {
        
    }
}
