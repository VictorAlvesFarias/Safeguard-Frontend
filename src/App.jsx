import './App.css';
import Login from './pages/shared/login/login';
import Signup from './pages/shared/signup/signup';
import UserRouter from './routes/user-router';
import { AuthProvider } from './auth/auth-context';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './store';
import { Check } from 'lucide-react';

function App() {

  return (
    <ReduxProvider store={store}>
      <Router>
        <AuthProvider>
          <ToastContainer
            theme="dark"
            hideProgressBar={true}
            icon={({ type, theme }) => {
              switch (type) {
                case 'info':
                  return <Info className="stroke-indigo-400" />;
                case 'error':
                  return <CircleAlert className="stroke-red-500" />;
                case 'success':
                  return <Check className="stroke-white" />;
                case 'warning':
                  return <TriangleAlert className="stroke-yellow-500" />;
                default:
                  return null;
              }
            }}
          />
          <Routes>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="/*" element={<UserRouter />} />
          </Routes>
        </AuthProvider>
      </Router>
    </ReduxProvider>
  );
}

export default App;
