import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import '../css/signin.css';
import axios from 'axios';
import { Store } from '../../store';

function Signin() {
  const [email, Setemail] = useState('');
  const [pass, Setpass] = useState('');

  const { state, dispatch: ctxdispatch } = useState(Store);
  const { userInfo } = { state };

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(
        'http://localhost:5000/api/user/signin',
        {
          email,
          pass,
        }
      );
      ctxdispatch({ type: 'USER_SIGNIN', payload: data });
    } catch (error) {
      console.log('error');
    }
  };

  return (
    <div className="Signin">
      <div className="img-container">
        <img src="images/Development.png" alt="" />
      </div>
      <div className=" signin-container">
        <div className="title">Account Login</div>
        <form onSubmit={submitHandler}>
          <label className=" username">
            username
            <input
              className="input"
              type="email"
              value={email}
              onChange={(email) => Setemail(email.target.value)}
            />
          </label>
          <label className=" password">
            password
            <input
              className="input"
              type="password"
              value={pass}
              onChange={(pass) => Setpass(pass.target.value)}
            />
            {/* <i class="fa-solid fa-eye"></i>{' '} */}
          </label>
          <div className="forget-pass">
            <Link>forget password?</Link>
          </div>
          <div className="button">
            <button>Signin</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signin;
