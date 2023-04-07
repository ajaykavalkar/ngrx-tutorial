import { createAction, props } from "@ngrx/store";
import { Post } from './posts.state';

export const ADD_POST_ACTION = '[Posts Page] add post';
export const ADD_POST_SUCCESS = '[Posts Page] add Success';

export const EDIT_POST_ACTION = '[Posts Page] Edit post';
export const EDIT_POST_SUCCESS = '[Posts Page] Edit Success';

export const DELETE_POST_ACTION = '[Posts Page] Delete post';
export const DELETE_POST_SUCCESS = '[Posts Page] Delete post Success';
// export const GET_POST_BY_ID_ACTION = '[Post Page] get post by Id'

export const LOAD_POSTS = "[Post page] Load post";
export const LOAD_POSTS_SUCCESS = "[Post page] Load post success";

export const addPost = createAction(ADD_POST_ACTION, props<{ post: Post }>());
export const addPostSuccess = createAction(ADD_POST_SUCCESS, props<{ post: Post }>());

export const editPost = createAction(EDIT_POST_ACTION, props<{ post: Post }>());
export const editPostSuccess = createAction(EDIT_POST_SUCCESS, props<{ post: Post }>());

export const deletePost = createAction(DELETE_POST_ACTION, props<{ postId: string }>());
export const deletePostSuccess = createAction(DELETE_POST_SUCCESS, props<{ postId: string }>());

// export const getPostById = createAction(GET_POST_BY_ID_ACTION, props<{ id: number }>())

export const loadPosts = createAction(LOAD_POSTS);
export const loadPostsSuccess = createAction(LOAD_POSTS_SUCCESS, props<{ posts: Post[] }>());