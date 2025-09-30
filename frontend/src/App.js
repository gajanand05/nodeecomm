import './App.css';
import Nav from './components/Nav'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer'
import SignUp from './components/SignUp'
import PrivateComponent from './components/PrivateComponent'
import Login from './components/Login'
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Nav />
    <Routes>
      <Route element={<PrivateComponent/>}>

      <Route path="/" element={<h1>All Proudct Show</h1>} />
      <Route path="/add" element={<h1>Add Product Content</h1>} />
      <Route path="/update" element={<h1>Update Product Content</h1>} />
      <Route path="/profile" element={<h1>Profile Cotnent</h1>} />
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
