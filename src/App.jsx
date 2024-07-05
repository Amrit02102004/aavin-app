import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from './Pages/Loginpage'
import HomePage from './Pages/Homepage'
import SignUpPage from './Pages/SignUppage'
import Productpage from './Pages/Productpage'
import CartPage from './Pages/CartPage'
import Navbar from './Components/Common/Navbar'
import AdminPage from './Pages/AdminPage'
import ReceiptPage from './Pages/ReceiptPage'
import ProtectedRoute from './Components/ProtectedRoute' // Import the ProtectedRoute component

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        {/* Protected Routes */}
        <Route path="/home" element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        } />
        <Route path="/products" element={
          <ProtectedRoute>
            <Productpage />
          </ProtectedRoute>
        } />
        <Route path="/cart" element={
          <ProtectedRoute>
            <CartPage />
          </ProtectedRoute>
        } />
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminPage />
          </ProtectedRoute>
        } />
        <Route path="/receipt" element={
          <ProtectedRoute>
            <ReceiptPage />
          </ProtectedRoute>
        } />
        
        {/* Redirect to home for any unmatched routes */}
        <Route path="*" element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  )
}

export default App