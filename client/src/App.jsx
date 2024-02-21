
import Login from './Login.jsx';
import Register from './Register.jsx';
import Home from './Home.jsx';
import User from './User.jsx';

import {BrowserRouter, Routes, Route} from "react-router-dom";



function App() {
  return (
      <BrowserRouter>
  
        <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route path='/home' element={<Home />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/user' element={<User />}></Route>

        </Routes>
      </BrowserRouter>
  );
}

export default App;