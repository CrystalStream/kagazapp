import { Component } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { Page } from "tns-core-modules/ui/page"
import { AuthService } from '../shared/services/auth.service'
import { Store } from '../utils/store'

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

    login() {
        const credentials: ICredentials = {
            email: this.input.email,
            password: this.input.password
        }
        console.log(credentials);

        this.authService.login(credentials)
            .subscribe( (data: IAuthResponse) => {
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
    

    register() {
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
