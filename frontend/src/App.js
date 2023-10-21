import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from  "./pages/Login"
import DashBoard from './pages/DashBoard';



function App() {
  return (
    <BrowserRouter>
    <Routes>
     <Route path="/login" element={<Login/>} /> 
     <Route path='/dashboard' element={<DashBoard/>}/>
     </Routes>
    </BrowserRouter>
  );
}

export default App;
