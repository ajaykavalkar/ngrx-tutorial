import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { Post } from "../posts/store/posts.state";

@Injectable({ providedIn: 'root' })

export class PostsService {
    constructor(private http: HttpClient) { }

    getPosts(): Observable<Post[]> {
        return this.http.get<Post[]>(`https://vue-completecourse.firebaseio.com/posts.json`)
            .pipe(map((data: any) => {
                let posts: Post[] = [];
                for (let key in data) {
                    posts.push({ id: key, ...data[key] })
                }
                return posts;
            }));
    }

    addPost(post: Post): Observable<{ name: string }> {
        return this.http.post<{ name: string }>(`https://vue-completecourse.firebaseio.com/posts.json`, post);
    }

    editPost(post: any): Observable<any> {
        let postData: any = { [post.id]: { title: post.title, description: post.description } }
        return this.http.patch<any>(`https://vue-completecourse.firebaseio.com/posts.json`, postData);
    }

    deletePost(id: string): Observable<any> {
        return this.http.delete<any>(`https://vue-completecourse.firebaseio.com/posts/${id}.json`);
    }
    getPostById(id: string): Observable<Post> {
        return this.http.get<Post>(`https://vue-completecourse.firebaseio.com/posts/${id}.json`);
    }

}