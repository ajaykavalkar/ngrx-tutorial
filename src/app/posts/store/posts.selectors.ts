import { createFeatureSelector, createSelector } from "@ngrx/store";
import { PostState } from "./posts.state";
import { getCurrentRoute } from "src/app/store/router/router.selector";
import { RouterStateUrl } from "src/app/store/router/custom-serializer";

export const POST_STATE_NAME = 'posts';

const getPostState = createFeatureSelector<PostState>(POST_STATE_NAME);

export const getPosts = createSelector(getPostState, (state) => state.posts);

export const getPostById = createSelector(
    getPosts,
    getCurrentRoute,
    (posts: any, route: RouterStateUrl) => {
        return posts ? posts.find((post: any) => post.id == route.params['id']) : null;
    })

/* without router-state */
// export const getPostById = (props: string) => createSelector(getPostState, (state) => {
//     return state.posts.find((e: any) => e.id == props)
// })