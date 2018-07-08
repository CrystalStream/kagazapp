import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { Page } from "tns-core-modules/ui/page"
import { NgZone } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { registerElement } from "nativescript-angular/element-registry";
import { CoordinatesService } from '../shared/services/coordinates.service';
import { BathroomService } from '../shared/services/bathroom.service';

const mapsModule = require("nativescript-google-maps-sdk");
// Important - must register MapView plugin in order to use in Angular templates
registerElement("MapView", () => require("nativescript-google-maps-sdk").MapView);

@Component({
    selector: "GoogleMaps",
    moduleId: module.id,
    template: `
    <GridLayout>
        <MapView (mapReady)="onMapReady($event)" (markerSelect)="onMarkerSelect($event);"></MapView>
    </GridLayout>
    `
})
export class GoogleMapsComponent implements OnInit {
    public loggedUserName: string;
    input: any;
    lat: any;
    lng: any;
    bathroomAdresses: any[];

    @ViewChild("MapView") mapView: ElementRef;

    //Map events
    onMapReady(event) {

        this.bathroomService.getAll()
            .subscribe(
                data => {
                    console.log("Bathroom addresses: ", data);
                    const keys = Object.keys(data);
                    console.log("Keys: ", keys);

                    keys.forEach(element => {
                        console.log("Direction: ",data[element].address);
                        this.coordinateService.getCoordenates(encodeURI(data[element].address))
                            .subscribe((data: any) => {

                                if (data.results[0]) {
                                    this.lat = data.results[0].geometry.location.lat;
                                    this.lng = data.results[0].geometry.location.lng;
                                    console.log('Address', data.results[0].geometry.location);
                                    console.log("Setting a marker...");
                                    var marker = new mapsModule.Marker();
                                    // marker.position = mapsModule.Position.positionFromLatLng(19.267488, -103.717162, 19);
                                    marker.position = mapsModule.Position.positionFromLatLng(this.lat, this.lng);
                                    marker.title = "Sanitario";
                                    marker.snippet = "$5";
                                    marker.userData = { index: 1 };
                                    mapView.addMarker(marker);
                                    console.log("Map Ready data[element]"+data[element]);
                                }

                            }, (error) => {
                                console.log('error', error)
                            })
                    });


                },
                error => {

                }
            )

        const address: IAddress = {
            address: "Vigia,%20Centro,%2049000%20Cd%20Guzman,%20Jalisco"
        }

        /** Getting addres using address services */


        var mapView = event.object;

        mapView.settings.myLocationButtonEnabled = true;
    };

    constructor(
        private page: Page,
        private router: RouterExtensions,
        private zone: NgZone,
        private coordinateService: CoordinatesService,
        private bathroomService: BathroomService
    ) {

        this.page.actionBarHidden = false;
    }

    onMarkerSelect(args) {
        alert("Clicked on " + args.marker.title);
        console.log("Clicked on " + args.marker.title);
    }

    ngOnInit(): void {

    }
}
