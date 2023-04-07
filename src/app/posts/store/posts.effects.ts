import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { filter, map, mergeMap, of, switchMap } from "rxjs";
import { PostsService } from "src/app/services/posts.service";
import { AppState } from "src/app/store/app.state";
import { addPost, addPostSuccess, deletePost, deletePostSuccess, editPost, editPostSuccess, loadPosts, loadPostsSuccess } from "./posts.actions";
import { Post } from "./posts.state";
import { ROUTER_NAVIGATION, RouterNavigatedAction } from "@ngrx/router-store";

@Injectable()

export class PostsEffect {
    constructor(private actions$: Actions,
        private postService: PostsService,
        private store: Store<AppState>) { }

    loadPosts$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(loadPosts),
                mergeMap((action) => {
                    return this.postService.getPosts().pipe(
                        map(posts => loadPostsSuccess({ posts }))
                    )
                })
            )
        }
    );

    addPost$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(addPost),
                mergeMap(action => {
                    return this.postService.addPost(action.post).pipe(
                        map(data => {
                            let post: Post = { id: data.name, ...action.post }
                            return addPostSuccess({ post })
                        })
                    )
                })
            )
        }
    );

    editPost$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(editPost),
                switchMap(action => {
                    return this.postService.editPost(action.post).pipe(
                        map(data => {
                            return editPostSuccess({ post: action.post })
                        })
                    )
                })
            )
        }
    )

    deletePost$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(deletePost),
                switchMap(action => {
                    return this.postService.deletePost(action.postId).pipe(
                        map(data => {
                            return deletePostSuccess({ postId: action.postId })
                        })
                    )
                })
            )
        }
    )

    getSinglePost$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(ROUTER_NAVIGATION),
                filter((r: RouterNavigatedAction) => {
                    return r.payload.routerState.url.startsWith('/posts/details')
                }),
                map((r: any) => {
                    return r.payload.routerState['params']['id'];
                }),
                switchMap((id) => {
                    return this.postService.getPostById(id).pipe(
                        map((post)=>{
                            let posts =[{ ...post, id }]
                            return loadPostsSuccess({ posts })
                        })
                    )
                })
            )
        }
    )
}