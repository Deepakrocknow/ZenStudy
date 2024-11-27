import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Signup from './components/signup';
import PrivateComponent from './components/PrivateComponent';
import Login from './components/Login';
import Addproduct from './components/Addproduct';
import Productlist from './components/Productlist';
import Updatecom from './components/Updatecom';
import Profile from './components/Profile';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Nav/>
         <Routes>

          <Route element = {<PrivateComponent/>}>
            <Route path='/' element={<Productlist/>}/>
            <Route path='/add' element={<Addproduct/>}/>
            <Route path='/update/:id' element={<Updatecom/>}/>
            <Route path='/profile' element={<Profile/>}/>
            </Route>
            
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/login' element={<Login/>}/>
         </Routes> 
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
