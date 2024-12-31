const bossReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SET_BOSSES':
        return action.payload;
      default:
        return state;
    }
  };
  
  export default bossReducer;