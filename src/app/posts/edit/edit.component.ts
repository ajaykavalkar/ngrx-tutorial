import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { ActivatedRoute, Router } from '@angular/router';
import { getPostById } from '../store/posts.selectors';
import { editPost } from '../store/posts.actions';
import { Subscription, take } from 'rxjs';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  editPostForm!: FormGroup;
  subscription$!: Subscription;
  constructor(private store: Store<AppState>, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.editPostForm = new FormGroup({
      id: new FormControl(null, Validators.required),
      title: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required)
    })
    this.subscription$ = this.store.select(getPostById).subscribe((data: any) => {
      if (data) {
        this.editPostForm.patchValue({
          id: data.id,
          title: data.title,
          description: data.description
        })
      }
    });
    /* without router-state */
    // this.activatedRoute.paramMap.subscribe((params: any) => {
    //   this.store.select(getPostById(params.params.id)).subscribe((data: any) => {       
    //     this.editPostForm = new FormGroup({
    //       id: new FormControl(data.id, Validators.required),
    //       title: new FormControl(data.title, Validators.required),
    //       description: new FormControl(data.description, Validators.required)
    //     })
    //   })
    // })
  }

  onEditPost() {
    if (this.editPostForm.valid) {
      let post = {
        id: this.editPostForm.value.id,
        title: this.editPostForm.value.title,
        description: this.editPostForm.value.description,
      };
      this.store.dispatch(editPost({ post }));
      this.router.navigateByUrl('/posts')
    }
  }
  ngOnDestroy() {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }
}

