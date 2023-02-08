import { useContext, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomeScreen from './screens/HomeScreen';
import ProjectList from './screens/ProjectList';
import Signin from './screens/Signin';
import { Store } from './Store';

function App() {
  const { state, dispatch: ctxdispatch } = useContext(Store);
  const { UserInfo } = state;
  // useEffect(() => {
  //   console.log(UserInfo);
  // });
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  return (
    <div className="App">
      <div className="Navbar">
        <div className="Menu">
          <i className="fa-solid fa-bars"></i>
        </div>
        {UserInfo && (
          <div className="User-name">{UserInfo.name.substring(0, 2)}</div>
        )}
      </div>
      <ProjectList />
      {/* <Signin /> */}
      <Routes>
        <Route path="/signin" element={<Signin />}></Route>
        {/* <Route path="/" element={<HomeScreen />}></Route> */}
      </Routes>
    </div>
  );
}

export default App;
