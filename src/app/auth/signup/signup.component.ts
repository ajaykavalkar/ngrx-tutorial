import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { setLoadingSspinner } from 'src/app/store/shared/shared.action';
import { signupStart } from '../store/auth.actions';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signUpForm!: FormGroup;
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, [Validators.required]),
    })
  }
  onSignUpSubmit() {
    console.log(this.signUpForm.value);

    if (this.signUpForm.valid) {
      this.store.dispatch(setLoadingSspinner({ status: true }));
      this.store.dispatch(signupStart({ email: this.signUpForm.value.email, password: this.signUpForm.value.password }));
    }
  }

}
