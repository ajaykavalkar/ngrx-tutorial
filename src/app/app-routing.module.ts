import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CoutnerComponent } from "./counter/counter.component";
import { HomeComponent } from "./home/home.component";
import { PostsListComponent } from "./posts/posts-list/posts-list.component";
import { AddComponent } from "./posts/add/add.component";
import { EditComponent } from "./posts/edit/edit.component";
import { AuthGuard } from "./services/auth.guard";
import { PostDetailsComponent } from "./posts/post-details/post-details.component";

const routes: Routes = [
    {
        path: 'counter',
        // component: CoutnerComponent,
        loadChildren: () => import('./counter/counter.module').then(m => m.CounterModule)
    },
    {
        path: 'posts',
        canActivate: [AuthGuard],
        loadChildren: () => import('./posts/post.module').then(m => m.PostsModule)

    },
    {
        path: 'posts/details/:id',
        component: PostDetailsComponent
    },
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
    },
    {
        path: '',
        component: HomeComponent,

    },

]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: []
})


export class AppRoutingModule { }