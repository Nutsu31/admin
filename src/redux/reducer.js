import { ACTIONS } from "./actions";

const initialState = {
  users: [],
  admin: {},
  transactions: [],
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_USER":
      return {
        ...state,
        users: [...state.users, action.payload.user],
      };
    case ACTIONS.ADMIN_LOGGED_IN:
      return {
        ...state,
        admin: action.payload,
      };
    case ACTIONS.FETCH_TRANSACTIONS:
      return {
        ...state,
        transactions: [...action.payload],
      };
    case ACTIONS.FILTER_TRANSACTIONS:
      return {
        ...state,
        transactions: action.payload,
      };
    case ACTIONS.LOG_OUT:
      return {
        ...state,
        admin: {},
      };
    // Handle other action types here
    default:
      return state;
  }
};
