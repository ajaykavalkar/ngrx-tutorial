import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { getPostById } from '../store/posts.selectors';
import { Post } from '../store/posts.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {
  postDetails$!: Observable<Post>;
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.postDetails$ = this.store.select(getPostById)
  }

}
