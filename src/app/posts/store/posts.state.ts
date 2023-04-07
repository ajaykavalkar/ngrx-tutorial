export const initialState: PostState = {
    posts: []
    /* sample posts */
    // posts: [
    //     {
    //         id: 1,
    //         title: 'Sample title 1',
    //         description: 'sample des 1'
    //     },
    //     {
    //         id: 2,
    //         title: 'Sample title 2',
    //         description: 'sample des 2'
    //     },
    // ]
}

export interface PostState {
    posts: Post[]
}

export interface Post {
    id?: string;
    title: string;
    description: string;
}