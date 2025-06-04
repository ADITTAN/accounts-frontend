// pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../utils/axios';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [barData, setBarData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);

  const COLORS = ['#4CAF50', '#F44336'];
  const API_URL = 'https://accounts-backend-production.up.railway.app'; // Set static backend URL for Vercel
  
  useEffect(() => {
    axios.get(`${API_URL}/expenses`)
      .then(res => console.log(res.data))
      .catch(err => console.error(err));

    fetchTransactions();

    const interval = setInterval(() => {
      fetchTransactions();
    }, 30000); // every 30s

    return () => clearInterval(interval);
  }, []);

  const fetchTransactions = async () => {
    try {
      const res = await axios.get(`${API_URL}/transactions`);
      setTransactions(res.data);
      processTransactionData(res.data);
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
    }
  };

  const processTransactionData = (data) => {
    const revenue = data.filter(t => t.type === 'Revenue');
    const expenses = data.filter(t => t.type === 'Expense');

    const revenueTotal = revenue.reduce((sum, t) => sum + t.amount, 0);
    const expensesTotal = expenses.reduce((sum, t) => sum + t.amount, 0);

    setTotalRevenue(revenueTotal);
    setTotalExpenses(expensesTotal);

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthlyData = months.map((month, index) => {
      const monthRevenue = revenue
        .filter(t => new Date(t.date).getMonth() === index)
        .reduce((sum, t) => sum + t.amount, 0);
      const monthExpenses = expenses
        .filter(t => new Date(t.date).getMonth() === index)
        .reduce((sum, t) => sum + t.amount, 0);
      return {
        month,
        revenue: monthRevenue,
        expenses: monthExpenses
      };
    });

    setBarData(monthlyData);
    setPieData([
      { name: 'Revenue', value: revenueTotal },
      { name: 'Expenses', value: expensesTotal }
    ]);
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '24px' }}>
        Dashboard Overview
      </h1>

      {/* Overview Cards */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '40px' }}>
        <div style={cardStyle('#e8f5e9')}>
          <h2>Total Revenue</h2>
          <p style={{ fontSize: '24px', color: '#388e3c' }}>${totalRevenue.toLocaleString()}</p>
        </div>
        <div style={cardStyle('#ffebee')}>
          <h2>Total Expenses</h2>
          <p style={{ fontSize: '24px', color: '#d32f2f' }}>${totalExpenses.toLocaleString()}</p>
        </div>
        <div style={cardStyle('#e3f2fd')}>
          <h2>Profit</h2>
          <p style={{ fontSize: '24px', color: '#1976d2' }}>
            ${(totalRevenue - totalExpenses).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Action Cards with Links */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px' }}>
        <Link to="/invoices/create" style={actionCardStyle}>
          <h3>Create Invoice</h3>
          <p>Generate a new invoice for your clients.</p>
        </Link>

        <Link to="/expenses/create" style={actionCardStyle}>
          <h3>Add Expense</h3>
          <p>Log a new business expense.</p>
        </Link>

        <Link to="/reports" style={actionCardStyle}>
          <h3>Generate Report</h3>
          <p>View financial reports and insights.</p>
        </Link>
      </div>

      {/* Charts */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', marginTop: '50px' }}>
        <div style={{ flex: 1, minWidth: '300px' }}>
          <h3 style={{ marginBottom: '12px' }}>Monthly Revenue vs Expenses</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" fill="#4CAF50" />
              <Bar dataKey="expenses" fill="#F44336" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div style={{ flex: 1, minWidth: '300px' }}>
          <h3 style={{ marginBottom: '12px' }}>Revenue vs Expenses</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

const cardStyle = (bg) => ({
  backgroundColor: bg,
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
  flex: 1,
  textAlign: 'center',
});

const actionCardStyle = {
  flex: '1',
  minWidth: '250px',
  backgroundColor: '#f9f9f9',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  textAlign: 'center',
  textDecoration: 'none',
  color: '#333',
  transition: '0.3s',
  cursor: 'pointer',
};

export default Dashboard;

