import { Component, OnInit } from "@angular/core";
import { Page } from "tns-core-modules/ui/page"
import { EventData } from "data/observable";
import { NgZone } from "@angular/core";
import { StackLayout } from "ui/layouts/stack-layout";
import { Directions } from "nativescript-directions";
import { AuthService } from "~/shared/services/auth.service";
import { RouterExtensions } from "nativescript-angular/router";
import { Store } from '../utils/store'
import * as geolocation from "nativescript-geolocation";
import { Accuracy } from "ui/enums";


// instantiate the plugin
let directions = new Directions();

directions.available().then(avail => {
    console.log(avail ? "Yes" : "No");
});

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {
    public loggedUserName: string;
    input: any;

    constructor(
        private page: Page,
        private authService: AuthService,
        private router: RouterExtensions,
        private zone: NgZone
    ) {
        this.input = {
            "calle": "",
            "numero": "",
            "colonia": "",
            "cp": "",
            "estado": ""
        };
        this.page.actionBarHidden = false;
    }

    ngOnInit(): void {
        this.loggedUserName = Store.getInstance().getUSer().displayName
    }

    logout() {
        this.authService.logout()
        this.navigateToLogin()
    }

    onMenuButtonTap(args: EventData) {
        // Navigate to corresponding page
        const menuButtonParent = (<StackLayout>args.object).parent;

        switch(menuButtonParent.get("data-name")){
            case 'find-bathroom': {
                this.navigateToMaps();
                
                //statements; 
                /*if (geolocation.isEnabled) {
                    geolocation.getCurrentLocation({ desiredAccuracy: Accuracy.high, maximumAge: 5000, timeout: 20000 })
                        .then( data => {
                            console.log(data)
                            this.openMap(data.latitude, data.longitude)
                        })
                        .catch( error => {
                            console.log('Error!!!!',error)
                        })*/
                    // this.openMap()
               /* } else {*/
                    // geolocation.enableLocationRequest()
                    //     .then(() => {
                    //         this.openMap
                    //     })
                /*}*/
                // alert("No se han Registrado Sanitarios reciente mente!");
                break; 
            }
            case 'home': { 
                this.navigateToMaps();
                //statements; 
                // this.openMap();
                break; 
            } 
            case 'renta': {
                this.navigateToAdd();
                break;
            }
        }
    }

    onProfileButtonTap() {
        // Navigate to profile page here
        alert("Navigate to profile page");
    }

    openMap(fromLat, fromLng){
        directions.navigate({
            from: { // optional, default 'current location'
              lat: fromLat,
              lng: fromLng
            },
            to: [ // if an Array is passed (as in this example), the last item is the destination, the addresses in between are 'waypoints'.
                {
                    address: "Venustiano Carranza 1638, Residencial Esmeralda Nte., 28010 Colima, Col.",
                },
                {
                    address: "Av. Constitución, Parque Royal, 28017 Colima, Col.",
                }
            ],
            ios: {
              preferGoogleMaps: true, // If the Google Maps app is installed, use that one instead of Apple Maps, because it supports waypoints. Default true.
              allowGoogleMapsWeb: true // If waypoints are passed in and Google Maps is not installed, you can either open Apple Maps and the first waypoint is used as the to-address (the rest is ignored), or you can open Google Maps on web so all waypoints are shown (set this property to true). Default false.
            }
          }).then(() => {
              console.log("Maps app launched.");
          }, error => {
              console.log(error);
          });
        // this.zone.run(() => {
        //     this.router.navigate(["maps"], {
        //         clearHistory: false,
        //         animated: true,
        //         transition: {
        //             name: "slideLeft",
        //             duration: 350,
        //             curve: "ease"
        //         }
        //     });
        // });

    }

    private navigateToLogin() {
        this.zone.run(() => {
            this.router.navigate(["login"], {
                clearHistory: true,
                animated: true,
                transition: {
                    name: "slideTop",
                    duration: 350,
                    curve: "ease"
                }
            });
        });
    }

    private navigateToAdd() {
        this.zone.run(() => {
            this.router.navigate(["add-bathroom"], {
                clearHistory: true,
                animated: true,
                transition: {
                    name: "slideTop",
                    duration: 350,
                    curve: "ease"
                }
            });
        });
    }

    private navigateToMaps() {
        this.zone.run(() => {
            this.router.navigate(["maps"], {
                clearHistory: false,
                animated: true,
                transition: {
                    name: "slideTop",
                    duration: 350,
                    curve: "ease"
                }
            });
        });
    }
}
