import { IAction } from "../interface/IAction";

const defaultState = {
  cash: 0,
}

const ADD_CASH = 'ADD_CASH';
const GET_CASH = 'GET_CASH';

const cashReducer = (state: any = defaultState, action: IAction) => {
  switch (action.type) {
    case ADD_CASH:
      return {...state, cash: state.cash + action.payload}
    case GET_CASH:
      return {...state, cash: state.cash - action.payload}
    default:
      return state;
  };
};

const addCashAction = (payload: any) => ({type: ADD_CASH, payload});
const getCashAction = (payload: any) => ({type: GET_CASH, payload}); 

export {cashReducer, addCashAction, getCashAction};