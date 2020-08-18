import { createAction, props } from '@ngrx/store';
import { TodoEntity } from '../reducers/todos.reducer';

export const todoItemSorted = createAction(
  '[todo] todo item sorted',
  props<{ id: string, previousIndex: number, currentIndex: number }>()
);

let tempId = 0;
export const todoAdded = createAction(
  '[todo] todo item added',
  ({ name, project, dueDate }: { name: string, project: string, dueDate: string }) => ({

    payload: {
      id: 'TEMP' + tempId++,
      name,
      project,
      dueDate
    } as TodoEntity
  })
);
