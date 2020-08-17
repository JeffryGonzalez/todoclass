import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, Action, on } from '@ngrx/store';
import * as actions from '../actions/todo.actions';
export interface TodoEntity {
  id: string;
  name: string;
  project?: string;
  dueDate?: string;
  completed: boolean;
}

export interface TodoState extends EntityState<TodoEntity> {
  sort: string[];
}

export const adapter = createEntityAdapter<TodoEntity>();

// const initialState = adapter.getInitialState();
const initialState: TodoState = {
  ids: ['1', '2', '3'],
  entities: {
    1: { id: '1', name: 'Change Light Bulbs', project: null, completed: false },
    2: { id: '2', name: 'Clean Garage', completed: true },
    3: { id: '3', name: 'Take Car to Shop', completed: false, dueDate: '2020-08-23' }
  },
  sort: ['1', '2', '3']
};

const reducerFunction = createReducer(
  initialState,
  on(actions.todoItemSorted, (state, action) => {
    const newSort = move(state.sort, action.previousIndex, action.currentIndex);
    return { ...state, sort: newSort };
  })
);

export function reducer(state: TodoState = initialState, action: Action): TodoState {
  return reducerFunction(state, action);
}

function move<T>(arr: T[], oldIndex: number, newIndex: number): T[] {
  arr = [...arr];
  while (oldIndex < 0) {
    oldIndex += arr.length;
  }
  while (newIndex < 0) {
    newIndex += arr.length;
  }
  if (newIndex >= arr.length) {
    let k = newIndex - arr.length;
    while ((k--) + 1) {
      arr.push(undefined);
    }
  }
  arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0]);
  return arr;
}

