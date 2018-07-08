import { Component } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { Page } from "tns-core-modules/ui/page"
import { AuthService } from '../shared/services/auth.service'
import { Store } from '../utils/store'
import { parseError } from '../utils/parseError'

@Component({
    selector: "Login",
    moduleId: module.id,
    templateUrl: "./login.component.html"
})
export class LoginComponent {
    input = {
        email: '',
        password: ''
    }

    error: IError;

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

    login(args) {
        const button = args.object;
        button.isEnabled = false;
        this.error = null;
        const credentials: ICredentials = {
            email: this.input.email,
            password: this.input.password
        }
        console.log(credentials);

        this.authService.login(credentials)
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
                this.error = parseError(error);
                console.log(this.error)
                button.isEnabled = true;
            })
    }
    

    register(args) {
        console.log('something')
        this.router.navigate(["/register"], {
            clearHistory: true,
            animated: true,
            transition: {
                name: "slideLeft",
                duration: 300,
                curve: "ease"
            }
        });
    }
}
