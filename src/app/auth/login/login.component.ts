import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { loginStart } from '../store/auth.actions';
import { setLoadingSspinner } from 'src/app/store/shared/shared.action';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, [Validators.required]),
    })
  }
  onLoginSubmit() {
    console.log(this.loginForm.value);

    if (this.loginForm.valid) {
      this.store.dispatch(setLoadingSspinner({ status: true }));
      this.store.dispatch(loginStart({ email: this.loginForm.value.email, password: this.loginForm.value.password }));
    }
  }
}
