import { Component, ElementRef, OnInit } from "@angular/core";
import { Button } from "ui/button";
import { Kinvey, User } from 'kinvey-nativescript-sdk';
import { RouterExtensions } from "nativescript-angular/router";
import { Page } from "tns-core-modules/ui/page"
import { EventData } from "data/observable";
import { StackLayout } from "ui/layouts/stack-layout";
import { BathroomService } from "~/shared/services/bathroom.service";


@Component({
    selector: "add-bathroom",
    moduleId: module.id,
    templateUrl: "./add-bathroom.component.html"
})
export class AddBathroomComponent implements OnInit {
    public loggedUser: string;
    input: any;
    constructor(
        private router: RouterExtensions, 
        private page: Page,
        private bathroomService: BathroomService
    ) {
        this.page.actionBarHidden = false;
        this.input = {
            calle: "",
            numero: "",
            colonia: "",
            cp: "",
            estado: ""
        };
    }

    ngOnInit(): void {
        Kinvey.User.me()
            .then((user: User) => {
                this.loggedUser = user.data['_socialIdentity'].kinveyAuth.id
            });
    }

    saveBathroom(){
        const bathroomAddress: IBathroom = {
            calle: this.input.calle,
            numero: this.input.numero,
            colonia: this.input.colonia,
            cp: this.input.cp,
            estado: this.input.estado
        }
        console.log(bathroomAddress);
        this.bathroomService.register(bathroomAddress)
            .subscribe( (data: any) => {
                console.log("bathroom response: ", data);
                this.router.navigate(["/home"], {
                    clearHistory: true,
                    animated: true,
                    transition: {
                        name: "slideLeft",
                        duration: 300,
                        curve: "ease"
                    }
                });
                console.log('data', data)
            }, (error) => {
                console.log('error', error)
            })
    }
}
