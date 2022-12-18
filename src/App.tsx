import { useDispatch, useSelector } from 'react-redux/es/exports';
import { ChangeEvent, useState } from 'react';

import { addCustomerAction, removeCustomerAction, addManyCustomersAction } from './store/customerReducer';
import { addCashAction, getCashAction } from './store/cashReducer';

import './App.css';

function App() {
  const [nameCustomer, setNameCustomer] = useState<string>('');

  const dispatch = useDispatch();
  const cash = useSelector((state: any) => state.cashReducer.cash);
  const customers = useSelector((state: any) => state.customerReducer.customers);

  const addCash = (): void => {
    dispatch(addCashAction(5));
  };

  const getCash = (): void => {
    dispatch(getCashAction(5));
  };

  const addCustomer = (name: String): void => {
    const customer = {
      name,
      id: Date.now(),
    };

    dispatch(addCustomerAction(customer));
    setNameCustomer('');
  };
  
  const removeCustomer = (id: number): void => {
    dispatch(removeCustomerAction(id));
  };

  const addManyCustomers = (): void => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => {
        const newUsers = users.map((user: any) => {
          user.id = Date.now() + Math.random();
          return user;
        })
        dispatch(addManyCustomersAction(newUsers))
      }).catch(error => console.log(error));
  }

  const updateNameCustomer = (event: ChangeEvent<HTMLInputElement>): void => {
    setNameCustomer(event.target.value);
  };

  return (
    <div className="App">
      <div style={{fontSize: '25px', marginBottom: '20px'}}>
        Cash: {cash}
      </div>
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '40px'}}>
        <button onClick={() => addCash()}>Пополнить счет</button>
        <button onClick={() => getCash()}>Снять со счета</button>
      </div>
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', flexDirection: 'column', marginTop: '50px'}}>
        <form style={{border: '3px solid #3a4c6f', padding: '15px', borderRadius: '10px'}} onSubmit={(event) => {
          event.preventDefault();
          addCustomer(nameCustomer);
        }}>
          <input placeholder='Enter a new client' onChange={updateNameCustomer} value={nameCustomer}/>
          <button type='submit' style={{padding: '0', backgroundColor: 'rgba(0,0,0,0%)', color: '#3a4c6f', fontSize: '25px'}}> {'>'}</button>
        </form>
        <button onClick={() => addManyCustomers()}>Добавить пользователей с сервера</button>
        <ul style={{padding: '0', margin: '0'}}>
          {
            customers.length !== 0 ?
            <>
              <h3 style={{margin: '0'}}>Clients: </h3>
              {
                customers.map((customer: any, index: number) => {
                  return <li key={customer.id} style={{display: 'flex', alignItems: 'center' ,textAlign: 'left' ,listStyle: 'none', padding: '0', margin: '2px 0'}}>
                    {index + 1}. {customer.name}
                    <button onClick={() => removeCustomer(customer.id)} style={{padding: '1px', marginLeft:'10px', fontSize: '15px', borderRadius: '0'}}> {'X'}</button> 
                  </li>
                })
              }
            </> :
            <h3 style={{margin: '0'}}>No clients found</h3>
          }
        </ul>
      </div>
    </div>
  );
}

export default App;
