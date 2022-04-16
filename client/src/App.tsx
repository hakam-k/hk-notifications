import React, { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import logo from './logo.svg';
import { Notifications } from './features/notifications/Notifications';
import {registerAsync} from './features/user/userSlice';
import './App.css';
import 'react-notifications-component/dist/theme.css'

import { useAppSelector, useAppDispatch } from './app/hooks';

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const uuid = uuidv4()
    localStorage.setItem("user_id", uuid);
    dispatch(registerAsync(uuid));    
  },[]);

  return (
    <div className="App">
      <Notifications />
    </div>
  );
}

export default App;
