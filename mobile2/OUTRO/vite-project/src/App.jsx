import React from 'react';
import ThemeSwitcher from './components/ThemeSwitcher';
import ToDoList from './components/ToDoList';
import DeliveryStatus from './components/DeliveryStatus';

const App = () => {
  return <div>
   <ThemeSwitcher/>
    <ToDoList/>
    <DeliveryStatus/>
  </div>
};

export default App;