import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { AuthResponse } from "../models/auth-response.model";
import { Observable } from "rxjs";
import { User } from "../models/user.model";
import { Store } from "@ngrx/store";
import { AppState } from "../store/app.state";
import { autoLogout } from "../auth/store/auth.actions";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    timeoutInverval: any;
    constructor(private http: HttpClient, private store: Store<AppState>) { }
    login(email: string, password: string): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(
            `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.FIREBASE_API_KEY}`,
            { email, password, returnSecureToken: true }
        );
    }

    signup(email: string, password: string): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(
            `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.FIREBASE_API_KEY}`,
            { email, password, returnSecureToken: true }
        )

    }
    logout() {
        localStorage.removeItem('userProfile');
        if (this.timeoutInverval) {
            clearTimeout(this.timeoutInverval);
            this.timeoutInverval = null;
        }
    }

    formatData(data: AuthResponse) {
        const expirationDate: Date = new Date(new Date().getTime() + (+data.expiresIn) * 1000)
        return new User(data.email, data.idToken, data.localId, expirationDate);
    }
    getErrorMessage(message: string): string {
        switch (message) {
            case 'EMAIL_NOT_FOUND':
                return 'Email not found';
            case 'INVALID_PASSWORD':
                return 'Invalid password';
            case 'INVALID_EMAIL':
                return 'Invalid Email';
            case 'EMAIL_EXISTS':
                return 'Email already exists';
            default:
                return 'Unknown error occurred, pls try again';
        }
    }
    setUserInLocalStorage(user: User) {
        localStorage.setItem('userProfile', JSON.stringify(user));
        this.runTimeoutInterval(user)
    }
    getUserFromLocalStorage(): User | null {
        const userProfile = localStorage.getItem('userProfile');
        if (userProfile) {
            let userData = JSON.parse(userProfile);
            let expirationDate = new Date(userData.expirationDate)
            let user = new User(userData.email, userData.token, userData.localId, expirationDate);
            this.runTimeoutInterval(user);
            return user;
        }
        return null;
    }

    runTimeoutInterval(user: User) {
        let todayDate = new Date().getTime();
        const expirationDate = user.expireDate.getTime();
        const timeInverval = expirationDate - todayDate;
        console.log(todayDate, user.expireDate.getTime(), expirationDate, timeInverval);
        this.timeoutInverval = setTimeout(() => {
            this.store.dispatch(autoLogout());
        }, timeInverval)
    }
}