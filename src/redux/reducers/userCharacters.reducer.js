const userCharactersReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SET_USER_CHARACTERS':
        return action.payload;
      default:
        return state;
    }
  };
  
  export default userCharactersReducer;
  