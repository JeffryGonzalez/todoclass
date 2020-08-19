import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import * as actions from '../actions/todo.actions';
import { switchMap, tap, map } from 'rxjs/operators';
import { TodoEntity } from '../reducers/todos.reducer';
@Injectable()
export class TodosEffects {

  // loadTodos -> go to the api -> (loadTodosSucceeded | loadTodosFailed)

  loadData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.loadTodos),
      switchMap(() => this.client.get<{ data: TodoEntity[] }>(environment.apiUrl + 'todos')
        .pipe(
          map(response => actions.loadTodosSucceeded({ todos: response.data }))
        )
      )
    ), { dispatch: true }
  );


  constructor(private actions$: Actions, private client: HttpClient) { }
}
