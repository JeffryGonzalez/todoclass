
import { ActionReducerMap, createSelector } from '@ngrx/store';
import * as fromProjects from './projects.reducer';
import * as fromTodos from './todos.reducer';
import * as fromModels from '../models';
import * as fromUiHints from './ui-hints.reducer';

export interface AppState {
  projects: fromProjects.ProjectState;
  todos: fromTodos.TodoState;
  uiHints: fromUiHints.UiHintsState;
}

export const reducers: ActionReducerMap<AppState> = {
  projects: fromProjects.reducer,
  todos: fromTodos.reducer,
  uiHints: fromUiHints.reducer
};

// Selectors

// One per "branch" of the state.

const selectProjectBranch = (state: AppState) => state.projects;
const selectTodosBranch = (state: AppState) => state.todos;
const selectUiHintsBranch = (state: AppState) => state.uiHints;


// Any Helpers?

const { selectEntities: selectTodoEntities } = fromTodos.adapter.getSelectors(selectTodosBranch);
const selectInboxTodoSorts = createSelector(selectUiHintsBranch, b => b.inboxSort);
// Selectors for Components



const selectSortedInboxTodos = createSelector(
  selectInboxTodoSorts,
  selectTodoEntities,
  (sort, entities) => sort.map(s => entities[s])
);

export const selectInboxTodoList = createSelector(
  selectSortedInboxTodos,
  (todos) => todos.filter(t => !t.project)
);
