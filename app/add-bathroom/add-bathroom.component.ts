import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { Page } from "tns-core-modules/ui/page"
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
            estado: "",
            ciudad: ""
        };
    }

    ngOnInit(): void {}

    saveBathroom(){
        const bathroomAddress: IBathroom = {
            street: this.input.calle,
            number: this.input.numero,
            colony: this.input.colonia,
            pc: this.input.cp,
            state: this.input.estado,
            city: this.input.ciudad
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
