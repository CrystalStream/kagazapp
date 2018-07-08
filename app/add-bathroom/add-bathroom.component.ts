import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { Page } from "tns-core-modules/ui/page"
import { BathroomService } from "~/shared/services/bathroom.service";

const nstoasts = require("nativescript-toasts");


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
        this.page.actionBarHidden = true;
        this.input = {
            calle: "",
            numero: "",
            colonia: "",
            cp: "",
            estado: "",
            ciudad: "",
            precio: 5
        };
    }

    ngOnInit(): void {}

    saveBathroom(args){
        const button = args.object;
        button.isEnabled = false;
        const options = {
            text: "Se registro correctamente el baño! Espera clientes muy pronto!!!",
            duration : nstoasts.DURATION.LONG,
            position : nstoasts.POSITION.CENTER //optional
        }
        const bathroomAddress: IBathroom = {
            street: this.input.calle,
            number: this.input.numero,
            colony: this.input.colonia,
            pc: this.input.cp,
            state: this.input.estado,
            city: this.input.ciudad,
            price: this.input.precio
        }
        console.log(bathroomAddress);
        this.bathroomService.register(bathroomAddress)
            .subscribe( (data: any) => {
                nstoasts.show(options);
                setTimeout(() => {
                    this.router.navigate(["/home"], {
                        clearHistory: true,
                        animated: true,
                        transition: {
                            name: "slideLeft",
                            duration: 300,
                            curve: "ease"
                        }
                    });
                    button.isEnabled = true;        
                }, 3000);
                console.log('data', data)
            }, (error) => {
                console.log('error', error)
            })
    }
}
