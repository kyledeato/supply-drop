import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './views/Login/Login';
import Register from './views/Register/Register';
import Home from './views/Home/Home';
import Account from './views/Account/Account';
import View from './views/View/View';
import AllPost from './views/AllPost/AllPost';
import Test from './views/Test';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/register" element={<Register/>}></Route>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/create" element={<Home/>}></Route>
          <Route path="/allposts" element={<AllPost/>}></Route>
          <Route path="/test" element={<Test/>}/>
          

          {/* IF YOU ARE DOING ACCOUNT PLZ CHANGE -> will be /account/id try to make id into the username if you can or not */}
          <Route path="/account" element={<Account/>}></Route>

          {/* IF YOU ARE DOING VIEWS PLZ CHANGE -> will be /view/id or the name of the post or not*/}
          <Route path="/view" element={<View/>}></Route>
          
          
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
