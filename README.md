redux-unitary-reducer
===

Implements a reducers aggregator for Redux, where we have only one root reducer
with additional management sugar, and simpler sub-handlers for action types.

Aimed to be faster alternative then redux.combineReducers()

When action comes, only root reducer code and exactly specified sub-handlers (for this action) are called.

The hack: For @@redux/INIT, initial state is returned from predefined variables.


Usage
-----

app/index.js
```js
import { createStore } from 'redux'
import todoApp from './reducers'

let store = createStore(todoApp)


```

app/reducers/index.js

```js
import {addTodo, toggleTodo} from './todos'
import visibilityFilter from './visibilityFilter'

const todoApp = makeReducer({
  ADD_TODO: addTodo,
  TOGGLE_TODO: toggleTodo
  SET_VISIBILITY_FILTER: visibilityFilter
})

export default todoApp
```

app/reducers/todos.js

```js
export const addTodo = (state, action) => {
      return {
        id: action.id,
        text: action.text,
        completed: false
      }
addTodo.init = {};

export const toggleTodo = (state, action) => {
      if (state.id !== action.id) {
        return state
      }

      return Object.assign({}, state, {
        completed: !state.completed
      })
}
toggleTodo.init = {};


```


reducers/visibilityFilter.js

```js
const visibilityFilter = (state, action) => {
    return action.filter
}
visibilityFilter.init = 'SHOW_ALL';

export default visibilityFilter
```
