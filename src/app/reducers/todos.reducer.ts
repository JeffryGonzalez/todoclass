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
  // sort: string[];
}

export const adapter = createEntityAdapter<TodoEntity>();

// const initialState = adapter.getInitialState();
const initialState: TodoState = {
  ids: ['1', '2', '3'],
  entities: {
    1: { id: '1', name: 'Change Light Bulbs', project: 'Work', completed: false },
    2: { id: '2', name: 'Clean Garage', completed: true },
    3: { id: '3', name: 'Take Car to Shop', completed: false, dueDate: '2020-08-23' }
  },
  // sort: ['1', '2', '3']
};

const reducerFunction = createReducer(
  initialState,
  on(actions.todoAdded, (state, action) => adapter.addOne(action.payload, state))
);

export function reducer(state: TodoState = initialState, action: Action): TodoState {
  return reducerFunction(state, action);
}



