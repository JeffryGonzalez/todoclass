import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TodoItem } from '../../models';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState, selectInboxTodoList } from 'src/app/reducers';
import { tap } from 'rxjs/operators';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import * as actions from '../../actions/todo.actions';
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  items$: Observable<TodoItem[]>;
  constructor(
    private dialogRef: MatDialogRef<TodoListComponent>,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.items$ = this.store.pipe(
      select(selectInboxTodoList),
      tap(data => console.log(data))
    );
  }

  drop(evt: CdkDragDrop<any[]>): void {
    console.log(evt);
    if (evt.previousIndex !== evt.currentIndex) {
      this.store.dispatch(actions.todoItemSorted({
        id: evt.item.element.nativeElement.dataset.id,
        previousIndex: evt.previousIndex,
        currentIndex: evt.currentIndex
      }));
    }
  }

  done(): void {
    this.dialogRef.close();
  }
}
