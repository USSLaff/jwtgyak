import React, { useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  const [token, setToken] = React.useState('');
  const [termekek, setTermekek] = React.useState([]);



  useEffect(() => {
    createCards();
  }, [token]);

  async function createCards() {
    if (token) {
      var response = await axios.get('https://jwt.sulla.hu/termekek', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setTermekek(response.data);
    }
  }

  return (
    <div className='container'>
      <form onSubmit={async (e) => {
        e.persist();
        e.preventDefault();

        if (e.target[0].value === '' || e.target[1].value === '') {
          return alert('Username and password are required');
        }

        var response = await axios.post('https://jwt.sulla.hu/login', {
          username: e.target[0].value,
          password: e.target[1].value
        });
        setToken(response.data.token);

      }} className='form mt-5 w-25 '>
        <input type='text' className='form-control' placeholder='Username' />
        <input type='password' className='form-control' placeholder='Password' />
        <button className='btn btn-success mt-3 mb-3'>Bejelentkezés</button>
        <button onClick={() => setToken(null)} className='btn btn-danger mt-3 mb-3'>Kijelentkezés</button>
      </form>

      {
        token ?
          <>
            <ul className='list-group'>
              {
                termekek.map((termek) => {

                  return (
                    <div className="card" key={termek.id} style={{"width": "18rem"}}>
                        <div className="card-body">
                          <h5 className="card-title">{termek.id}-{termek.name}</h5>
                          <p className="card-text">Ár: {termek.price}</p>
                        </div>
                    </div>
                  )

                })
              }
            </ul>
          </>
          : null
      }
    </div>
  );
}

export default App;