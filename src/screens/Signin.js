import { Link, useNavigate } from 'react-router-dom';
import React, { useContext, useState } from 'react';
import '../css/signin.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Store } from '../Store';

function Signin() {
  const [email, Setemail] = useState('');
  const [pass, Setpass] = useState('');

  const { state, dispatch: ctxdispatch } = useContext(Store);
  const { userInfo } = { state };

  const navigate = useNavigate();

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      console.log(' call handler');
      const { data } = await axios.post('/api/user/signin', {
        email,
        pass,
      });
      // console.log(' data' + data);
      ctxdispatch({ type: 'USER_SIGNIN', payload: data });
      window.alert('Login Success');
      navigate('/');
    } catch (error) {
      console.log(error);
      window.alert('login failed');
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
