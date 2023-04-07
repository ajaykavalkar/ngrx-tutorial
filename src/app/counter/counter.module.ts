import { NgModule } from "@angular/core";
import { CoutnerComponent } from "./counter.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { StoreModule } from "@ngrx/store";
import { counterReducer } from "./store/counter.reducer";
import { COUNTER_STATE_NAME } from "./store/counter.selectors";

const routes: Routes = [
    {
        path: '',
        component: CoutnerComponent
    }
]
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes),
        StoreModule.forFeature(COUNTER_STATE_NAME, counterReducer)
    ],
    declarations: [CoutnerComponent],
    exports: []
})

export class CounterModule { }