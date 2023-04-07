import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from '@ngrx/store';
import { addCustomCounter, changechannelName, decrement, increment, reset } from './store/counter.actions';
import { CounterState } from './store/counter.state';
import { Observable, Subscription, noop } from 'rxjs';
import { getChannel, getCounter } from './store/counter.selectors';
import { AppState } from "../store/app.state";

@Component({
    selector: 'app-counter',
    templateUrl: './counter.component.html',

})
export class CoutnerComponent implements OnInit, OnDestroy {
    counter: number = 0;
    counter$!: Observable<number>;
    channelName$!: Observable<string>;
    counterSubscription!: Subscription;
    counterValue!: number;
    constructor(private store: Store<AppState>){

        
    }
    ngOnInit() {
        this.counterSubscription = this.store.select(getCounter).subscribe((data) => {
          console.log('[this is counter data] ', data);
          
          // this.counter = data.counter;
        });
        this.counterSubscription = this.store.select(getChannel).subscribe((data) => {
          console.log('[this is channel data] ', data);      
          // this.counter = data.counter;
        });
        this.counter$ = this.store.select(getCounter);
        this.channelName$ = this.store.select(getChannel);
        // console.log(this.counter$)
      }
      ngOnDestroy() {
        if (this.counterSubscription) {
          this.counterSubscription.unsubscribe();
        }
      }
      onIncrement() {
        this.store.dispatch(increment())
        // this.counter++;
      }
      onDecrement() {
        this.store.dispatch(decrement())
        // this.counter = this.counter > 0 ? this.counter - 1 : 0;
      }
      onReset() {
        this.store.dispatch(reset())
        // this.counter = 0;
      }
    
      onAdd() {
        console.log(this.counterValue);
        this.store.dispatch(addCustomCounter({ count: this.counterValue }))
      }
    
      changeChannelname(){
        this.store.dispatch(changechannelName({channelName: 'This is new channel you want'}))
      }
}