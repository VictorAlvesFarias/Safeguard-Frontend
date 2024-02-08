import './App.css';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import {AuthProvider} from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AuthProvider>
            <ToastContainer/>
              <div className="w-full h-full flex justify-center items-center">
                <Routes>
                  <Route path="login" element={<Login/>} />
                  <Route path="signup" element={<Signup/>} />
                  <Route path={'/*'} element={<Home/>} />
                </Routes>
              </div>
        </AuthProvider>
      </Router>
    </Provider>
    
  );
}

export default App;
