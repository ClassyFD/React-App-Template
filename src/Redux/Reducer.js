let initialState = {};

export default function reducer(state = initialState, action){
  console.log(action.type);
  switch(action.type) {
    default:
      return Object.assign({}, state);
  }
}
