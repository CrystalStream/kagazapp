import { Component } from "@angular/core";
import { Store } from '../utils/store'
import { RouterExtensions } from "nativescript-angular/router";
import { Page } from "tns-core-modules/ui/page"
import { AuthService } from '../shared/services/auth.service'

@Component({
    selector: "Register",
    moduleId: module.id,
    templateUrl: "./register.component.html"
})
export class RegisterComponent {
    input = {
      displayName: '',
      email: '',
      password: ''
    }

    constructor(
        private router: RouterExtensions, 
        private page: Page,
        private authService: AuthService
    ) {
        this.page.actionBarHidden = true;
        this.page.backgroundSpanUnderStatusBar = true;
        this.page.className = "page-login-container";
        this.page.statusBarStyle = "dark";
    }

    register(args) {
        const button = args.object;
        button.isEnabled = false;
        const credentials: ICredentials = {
            displayName: this.input.displayName,
            email: this.input.email,
            password: this.input.password
        }
        console.log(credentials);
        this.authService.register(credentials)
            .subscribe( (data: IAuthResponse) => {
                button.isEnabled = true;
                const user: IUser = {
                    displayName: data.displayName,
                    email: data.email
                }
                Store.getInstance().setUser(user)
                Store.getInstance().setToken(data.idToken)
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
        // this.navigateHome();   
    }

    backToLogin() {
      this.router.navigate(["/login"], {
        clearHistory: true,
        animated: true,
        transition: {
            name: "slideRight",
            duration: 300,
            curve: "ease"
        }
    });
    }

}