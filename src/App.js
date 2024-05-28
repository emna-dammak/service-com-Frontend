import { Route,BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import AuthPage from "./components/Auth/Auth";
import Service from './service';

const App = () => {
  return (
<Router>
  <Routes>
    <Route path="/" element={<AuthPage/>}></Route>
    <Route path="/comment/:serviceId" element={<Service/>}></Route>
  </Routes>
</Router>
  );

}

export default App;
