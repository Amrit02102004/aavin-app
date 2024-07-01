import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from './Pages/Loginpage'
import HomePage from './Pages/Homepage'
import SignUpPage from './Pages/SignUppage'
import Productpage from './Pages/Productpage'
import CartPage from './Pages/CartPage'
import Navbar from './Components/Common/Navbar'
import AdminPage from './Pages/AdminPage'
import ReceiptPage from './Pages/ReceiptPage'

const App = () => {
  return (
    <>
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/products" element={<Productpage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/receipt" element={<ReceiptPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App