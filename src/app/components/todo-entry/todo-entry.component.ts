import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Observable } from 'rxjs';
import { Project } from 'src/app/models';
import { Store, select } from '@ngrx/store';
import { AppState, selectAllProjectsList } from 'src/app/reducers';

@Component({
  selector: 'app-todo-entry',
  templateUrl: './todo-entry.component.html',
  styleUrls: ['./todo-entry.component.scss']
})
export class TodoEntryComponent implements OnInit {
  projects$: Observable<Project[]>;
  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private bottomSheetRef: MatBottomSheetRef<TodoEntryComponent>,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.projects$ = this.store.pipe(
      select(selectAllProjectsList)
    );
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(200)]],
      project: [],
      dueDate: []
    });
  }

  submit(): void {
    console.log(this.form.value);
    // Dispatch an action.. TODO
    this.form.reset();
    this.bottomSheetRef.dismiss();
  }

  cancel(): void {
    this.bottomSheetRef.dismiss();
  }
}
