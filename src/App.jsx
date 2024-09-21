import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Home from './app/components/users/Home'
import Login from './app/components/auth/Login'
import Registration from './app/components/auth/Registration'
import Profile from './app/components/users/Profile'
import TopUp from './app/components/users/TopUp'
import HistoryTransactions from './app/components/users/HistoryTransactions'
import Payment from './app/components/users/payment'

function App() {
  return (
    <div className=''>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={(<Home />)} />
          <Route path='/login' element={(<Login />)} />
          <Route path='/registration' element={(<Registration />)} />
          <Route path='/profile' element={(<Profile />)} />
          <Route path='/topup' element={(<TopUp />)} />
          <Route path='/transaction' element={(<HistoryTransactions />)} />
          <Route path='/payment/:layanan' element={(<Payment />)} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
