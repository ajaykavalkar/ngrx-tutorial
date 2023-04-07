import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { PostsListComponent } from "./posts-list/posts-list.component";
import { AddComponent } from "./add/add.component";
import { EditComponent } from "./edit/edit.component";
import { StoreModule } from "@ngrx/store";
import { postsReducer } from "./store/posts.reducer";
import { POST_STATE_NAME } from "./store/posts.selectors";
import { EffectsModule } from "@ngrx/effects";
import { PostsEffect } from "./store/posts.effects";
import { PostDetailsComponent } from './post-details/post-details.component';

const routes: Routes = [
    {
        path: '',
        component: PostsListComponent,
        children: [
            {
                path: 'add',
                component: AddComponent
            },
            {
                path: 'edit/:id',
                component: EditComponent
            },
        ]
    }
]
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        StoreModule.forFeature(POST_STATE_NAME, postsReducer),
        EffectsModule.forFeature([PostsEffect])
    ],
    declarations: [
        PostsListComponent,
        AddComponent,
        EditComponent,
        PostDetailsComponent
    ],
    exports: []
})

export class PostsModule { }