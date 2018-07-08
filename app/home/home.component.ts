import { Component, OnInit } from "@angular/core";
import { Page } from "tns-core-modules/ui/page"
import { EventData } from "data/observable";
import { NgZone } from "@angular/core";
import { StackLayout } from "ui/layouts/stack-layout";
import { Directions } from "nativescript-directions";
import { AuthService } from "~/shared/services/auth.service";
import { RouterExtensions } from "nativescript-angular/router";
import { Store } from '../utils/store'

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

    constructor(
        private page: Page,
        private authService: AuthService,
        private router: RouterExtensions,
        private zone: NgZone
    ) {
        this.page.actionBarHidden = false;
    }

    ngOnInit(): void {
        this.loggedUserName = Store.getInstance().getUSer().displayName
    }

    logout() {
        // this.authService.logout()
        this.navigateToLogin()
    }

    onMenuButtonTap(args: EventData) {
        // Navigate to corresponding page
        const menuButtonParent = (<StackLayout>args.object).parent;

        switch(menuButtonParent.get("data-name")){
            case 'news': { 
                //statements; 
                alert("No se han Registrado Sanitarios reciente mente!");
                break; 
            }
            case 'home': { 
                //statements; 
                this.openMap();
                break; 
            } 
        }
    }

    onProfileButtonTap() {
        // Navigate to profile page here
        alert("Navigate to profile page");
    }

    openMap(){
        directions.navigate({
            from: { // optional, default 'current location'
              lat: 52.215987,
              lng: 5.282764
            },
            to: [{ // if an Array is passed (as in this example), the last item is the destination, the addresses in between are 'waypoints'.
              address: "Hof der Kolommen 34, Amersfoort, Netherlands",
            },
            {
              address: "Aak 98, Wieringerwerf, Netherlands"
            }],
            ios: {
              preferGoogleMaps: true, // If the Google Maps app is installed, use that one instead of Apple Maps, because it supports waypoints. Default true.
              allowGoogleMapsWeb: true // If waypoints are passed in and Google Maps is not installed, you can either open Apple Maps and the first waypoint is used as the to-address (the rest is ignored), or you can open Google Maps on web so all waypoints are shown (set this property to true). Default false.
            }
          }).then(() => {
              console.log("Maps app launched.");
          }, error => {
              console.log(error);
          });
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
}
