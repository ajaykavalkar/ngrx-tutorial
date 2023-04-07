import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { addPost } from '../store/posts.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  postForm!: FormGroup;
  constructor(private store: Store<AppState>, private router: Router) { }

  ngOnInit(): void {
    this.postForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required)
    })
  }
  onAddPost() {
    if (this.postForm.valid) {
      let post = {
        title: this.postForm.value.title,
        description: this.postForm.value.description,
      };
      this.store.dispatch(addPost({ post }))
      this.router.navigateByUrl('/posts')
    }
  }
}
