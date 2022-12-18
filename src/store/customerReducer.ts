import { IAction } from "../interface/IAction";

const defaultState = {
  customers: [{name: 'Серёга', id: Date.now()}]
}

const ADD_CUSTOMER = 'ADD_CUSTOMER';
const REMOVE_CUSTOMER = 'REMOVE_CUSTOMER';
const ADD_MANY_CUSTOMERS = 'ADD_MANY_CUSTOMERS';

const customerReducer = (state: any = defaultState, action: IAction) => {
  switch (action.type) {
    case ADD_CUSTOMER:
      return {...state, customers: [...state.customers, action.payload]};

    case ADD_MANY_CUSTOMERS:
      console.log(action.payload);
      
      return {...state, customers: [...state.customers, ...action.payload]};

    case REMOVE_CUSTOMER: 
      return {...state, customers: state.customers.filter((customer: any) => customer.id !== action.payload)};

    default: 
      return state;
  }
}
const addCustomerAction = (payload: any) => ({type: ADD_CUSTOMER, payload});
const removeCustomerAction = (payload: any) => ({type: REMOVE_CUSTOMER, payload});
const addManyCustomersAction = (payload: any) => ({type: ADD_MANY_CUSTOMERS, payload})

export {customerReducer, addCustomerAction, removeCustomerAction, addManyCustomersAction};