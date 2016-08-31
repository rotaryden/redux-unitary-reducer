var REDUX_INIT = "@@redux/INIT";

module.exports = {
  makeReducer: function(handlersMap) {
    return function (state, action) {
      var handler, newState = (typeof state === "undefined") ?
        {} : extend({}, state);


      if (action === REDUX_INIT) { //action for all reducers
        for (var _action in handlersMap) {
          newState[_action] = handlersMap[_action].init;
        }
        return newState;
      }

      handler = handlersMap[action];

      if (typeof handler === "undefined") return newState;

      var result = handler(state[action], action);
      if (typeof result !== "undefined") newState[action]  = result;

      return newState;
    }
  }
};

var extend = typeof Object.assign === 'function' ? Object.assign : function () {
    var destination = arguments[0] || {};
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        if (source) {
            for (var property in source) {
                if (source.hasOwnProperty(property)) {
                    destination[property] = source[property];
                }
            }
        }
    }
    return destination;
};
