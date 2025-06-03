// QuickBooks Clone - MERN Stack Project (Frontend - React)
// We'll start with a basic structure: Authentication, Dashboard, and Navigation
// Then add modules step-by-step: Invoicing, Expenses, Reports, etc.

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import './index.css';
import Footer from './components/Footer';
import CreateInvoice from './pages/CreateInvoice';

import Reports from './pages/Reports';
import AddTransaction from './pages/AddTransaction';


function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path="/invoices/create" element={<PrivateRoute><CreateInvoice /></PrivateRoute>} />
          <Route path="/expenses/create" element={<PrivateRoute><AddTransaction/></PrivateRoute>} />
           <Route path="/reports" element={<PrivateRoute><Reports /></PrivateRoute>} />

        </Routes>
        <Footer/>
      </Router>
    </AuthProvider>
  );
}

export default App;


