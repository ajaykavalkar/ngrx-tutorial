import { createReducer, on } from "@ngrx/store"
import { Post, PostState, initialState } from "./posts.state"
import { addPost, addPostSuccess, deletePost, deletePostSuccess, editPost, editPostSuccess, loadPostsSuccess } from "./posts.actions"

const _postsReducer = createReducer(
    initialState,
    on(addPostSuccess, (state: any, action) => {
        let post = { ...action.post };
        return {
            ...state,
            posts: [...state.posts, post]
        }
    }),
    on(editPostSuccess, (state: any, action) => {
        let updatePosts = state.posts.map((post: Post) => action.post.id == post.id ? action.post : post)
        return {
            ...state,
            posts: [...updatePosts]
        }
    }),
    on(deletePostSuccess, (state: any, { postId }) => {
        let updatePosts = state.posts.filter((e: any) => e.id !== postId);
        return {
            ...state,
            posts: [...updatePosts]
        }
    }),
    on(loadPostsSuccess, (state, action) => ({ ...state, posts: action.posts }))
)


export function postsReducer(state: any, action: any) {
    return _postsReducer(state, action)
}