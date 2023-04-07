import { createAction, props } from "@ngrx/store";
import { User } from "src/app/models/user.model";

export const LOGIN_START = '[Auth page] Login Start';
export const LOGIN_SUCCESS = '[Auth page] Login Success';
export const LOGIN_FAIL = '[Auth page] Login Fail';

export const SIGNUP_START = '[Auth page] Signup Start';
export const SIGNUP_SUCCESS = '[Auth page] Signup Success';

export const CHECK_USER_PROFILE_IN_LOCALSTORAGE = "[Auth Page] Check user profile in localstorage";

export const LOGOUT_ACTION = '[Auth Page] logout';

export const loginStart = createAction(LOGIN_START, props<{ email: string; password: string }>());

export const loginSuccess = createAction(LOGIN_SUCCESS, props<{ user: User | null, redirect?: boolean }>());

export const signupStart = createAction(SIGNUP_START, props<{ email: string; password: string }>());

export const signupSuccess = createAction(SIGNUP_SUCCESS, props<{ user: User }>());

export const checkUserProfileInLocalstorage = createAction(CHECK_USER_PROFILE_IN_LOCALSTORAGE)

export const autoLogout = createAction(LOGOUT_ACTION);