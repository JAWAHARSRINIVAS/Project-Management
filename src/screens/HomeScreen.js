import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function HomeScreen() {
  const navigate = useNavigate();
  const shoot = () => {
    navigate('/productList');
  };
  return (
    <div>
      <button onClick={shoot}>Take the shot!</button>
    </div>
  );
}

export default HomeScreen;
