import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { autoLogout, checkUserProfileInLocalstorage, loginStart, loginSuccess, signupStart, signupSuccess } from "./auth.actions";
import { catchError, exhaustMap, finalize, map, mergeMap, tap } from "rxjs/operators";
import { AuthService } from "src/app/services/auth.service";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/app.state";
import { setErrorMessage, setLoadingSspinner } from "src/app/store/shared/shared.action";
import { of } from "rxjs";
import { Router } from "@angular/router";
@Injectable()

export class AuthEffects {
    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private store: Store<AppState>,
        private router: Router,
    ) { }

    login$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(loginStart),
            exhaustMap((action) => {
                return this.authService.login(action.email, action.password)
                    .pipe(
                        map(data => {
                            this.store.dispatch(setErrorMessage({ message: '' }))
                            const user = this.authService.formatData(data);
                            this.authService.setUserInLocalStorage(user);
                            return loginSuccess({ user, redirect: true })
                        }),
                        catchError((errorRes) => {
                            // console.log(errorRes);
                            let message = this.authService.getErrorMessage(errorRes.error.error.message)
                            return of(setErrorMessage({ message }));
                        }),
                        finalize(() => {
                            this.store.dispatch(setLoadingSspinner({ status: false }))
                        })
                    )
            }))
    });

    loginRedirect$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(...[loginSuccess, signupSuccess]),
                tap((action: any) => {
                    this.store.dispatch(setLoadingSspinner({ status: false }));
                    action.redirect && this.router.navigateByUrl('/');
                })
            )
        },
        { dispatch: false }
    );

    signup$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(signupStart),
                exhaustMap((action) => {
                    return this.authService.signup(action.email, action.password)
                        .pipe(
                            map(data => {
                                this.store.dispatch(setErrorMessage({ message: '' }));
                                const user = this.authService.formatData(data);
                                this.authService.setUserInLocalStorage(user);
                                return signupSuccess({ user });
                            }),
                            catchError(error => {
                                let message = this.authService.getErrorMessage(error.error.error.message);
                                return of(setErrorMessage({ message }))
                            }),
                            finalize(() => {
                                this.store.dispatch(setLoadingSspinner({ status: false }))
                            })
                        )
                })
            )
        }
    );

    checkUserProfileInLocalstorage$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(checkUserProfileInLocalstorage),
                mergeMap((action) => {
                    const user = this.authService.getUserFromLocalStorage();
                    return of(loginSuccess({ user, redirect: false }))
                })
            )
        }
    );

    autoLogout$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(autoLogout),
                tap((action) => {
                    this.authService.logout();
                })
            )
        }, { dispatch: false }
    )
}