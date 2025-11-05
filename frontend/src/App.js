import './App.css';
import Nav from './components/Nav'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer'
import SignUp from './components/SignUp'
import PrivateComponent from './components/PrivateComponent'
import Login from './components/Login'
import AddProduct from './components/AddProduct';
import ProductTable from './components/ProductList'
import ProductUpdate from './components/ProductUpdate'
import ProductList from './components/ProductListHome'
import ProductSingle from './components/ProductSingle'
import Profile from './components/Profile'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Nav />
    <Routes>
      <Route element={<PrivateComponent/>}>

      <Route path="/" element={<ProductList/>} />
      <Route path="/products" element={<ProductTable/>} />
      <Route path="/add" element={<AddProduct/>} />
      <Route path="/products/:id" element={<ProductSingle/>} />
      <Route path="/products/edit/:id" element={<ProductUpdate/>} />
      <Route path="/profile" element={<Profile/>} />
      <Route path="/logout" element={<h1>Logout Here </h1>} />
      
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
    </BrowserRouter>
    <Footer /> 
    </div>
  );
}

export default App;
