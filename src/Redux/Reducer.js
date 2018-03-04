const SET_USER = 'SET_USER',
      UPDATE_USER = 'UPDATE_USER';

let initialState = {
  sessionUser:''
};

export default function reducer(state = initialState, action){
  console.log(action.type);
  switch(action.type) {
    case UPDATE_USER:
      return Object.assign({}, state, {sessionUser:action.val[0]});
    case SET_USER:
      return Object.assign({}, state, {sessionUser:action.val});
    default:
      return Object.assign({}, state);
  }
}
