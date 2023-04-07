import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { Post } from '../store/posts.state';
import { getPosts } from '../store/posts.selectors';
import { deletePost, loadPosts } from '../store/posts.actions';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnInit {
  posts$!: Observable<Post[]>;
  selectedRecord: Post | undefined = undefined;
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.posts$ = this.store.select(getPosts) //.subscribe(posts => console.log(posts))
    this.store.dispatch(loadPosts());
  }
  onDeletePost(id: any) {
    this.store.dispatch(deletePost({ postId: id }))
  }
}
