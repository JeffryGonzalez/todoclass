import { createReducer, on, Action } from '@ngrx/store';
import * as actions from '../actions/todo.actions';
export interface UiHintsState {
  inboxSort: string[];
}

const initialState: UiHintsState = {
  inboxSort: ['2', '3']
};

const reducerFunction = createReducer(
  initialState,
  on(actions.todoItemSorted, (state, action) => {
    const newSort = move(state.inboxSort, action.previousIndex, action.currentIndex);
    return { ...state, inboxSort: newSort };
  })
);

export function reducer(state: UiHintsState, action: Action): UiHintsState {
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
