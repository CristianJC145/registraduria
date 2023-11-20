import './App.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppRouting from './AppRoutes';

function App() {
  return (
    <>
      <AppRouting />
      <ToastContainer />
    </>
  )
}

export default App
