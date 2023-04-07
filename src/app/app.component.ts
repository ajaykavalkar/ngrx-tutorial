import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './store/app.state';
import { Observable } from 'rxjs';
import { getErrorMessage, getLoading } from './store/shared/shared.selectors';
import { isAuthenticated } from './auth/store/auth.selectors';
import { autoLogout, checkUserProfileInLocalstorage } from './auth/store/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ngrx-counter-example';

  constructor(private store: Store<AppState>) { }
  showLoading$!: Observable<boolean>;
  errorMessage$!: Observable<string>;
  isAuthenticated$!: Observable<boolean>;
  ngOnInit() {
    this.showLoading$ = this.store.select(getLoading);
    this.errorMessage$ = this.store.select(getErrorMessage);
    this.isAuthenticated$ = this.store.select(isAuthenticated);
    this.store.dispatch(checkUserProfileInLocalstorage());
  }
  onLogout(event:Event){
    // event.preventDefault();
    this.store.dispatch(autoLogout());
  }
}
