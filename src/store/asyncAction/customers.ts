import { AnyAction, Dispatch } from "redux";
import { addManyCustomersAction } from "../customerReducer";

// #TODO:  Разобраться с тем как реализовать диспатч через thunk
// #       Не понятно как это типизировать. пробелма в том что принимает
// #       в себя только dispath(arg: AnyAction), а у меня возвращается void
// #       и передать в app dispatch, эту функцию нельзя, так как тип не AnyAction!
// #       В апп реализовал в лоб! 

const fetchCustomers = (): Function => {
  return (dispatch: Dispatch<AnyAction>): void | AnyAction => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(json => {
        const users = json.map((user: any) => {
          user.id = Date.now() + Math.random();
          return user;
        });
        dispatch(addManyCustomersAction(users));
      })
  }
}

export {fetchCustomers}