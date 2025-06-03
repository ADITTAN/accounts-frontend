import React, { useState } from 'react';
import axios from '../utils/axios';

const AddTransaction = () => {
  const [transactionData, setTransactionData] = useState({
    title: '',
    amount: '',
    category: '',
    date: '',
    notes: '',
    type: 'Expense', // Default
  });

  const [transactionId, setTransactionId] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);

  const handleChange = (e) => {
    setTransactionData({ ...transactionData, [e.target.name]: e.target.value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/transactions', transactionData);
      setTransactionId(res.data._id);
      alert('Transaction added successfully!');
    } catch (error) {
      console.error('Add failed:', error);
      alert('Failed to add transaction');
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!transactionId) return alert('Please add a transaction before updating.');
    try {
      await axios.put(`/transactions/${transactionId}`, transactionData);
      alert('Transaction updated successfully!');
    } catch (error) {
      console.error('Update failed:', error);
      alert('Failed to update transaction');
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    if (!transactionId) return alert('Please add a transaction before deleting.');
    try {
      await axios.delete(`/transactions/${transactionId}`);
      alert('Transaction deleted successfully!');
      setTransactionData({ title: '', amount: '', category: '', date: '', notes: '', type: 'Expense' });
      setTransactionId('');
    } catch (error) {
      console.error('Delete failed:', error);
      alert('Failed to delete transaction');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '30px', border: '1px solid #ddd', borderRadius: '10px', backgroundColor: '#f9f9f9' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>
        {isEditMode ? 'Edit Transaction' : 'Add New Transaction'}
      </h2>
      <form>
        {transactionId && (
          <p style={{ fontSize: '14px', color: '#555' }}>Transaction ID: {transactionId}</p>
        )}

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Title</label>
          <input
            type="text"
            name="title"
            value={transactionData.title}
            onChange={handleChange}
            required
            placeholder="Enter transaction title"
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Amount ($)</label>
          <input
            type="number"
            name="amount"
            value={transactionData.amount}
            onChange={handleChange}
            required
            step="0.01"
            placeholder="0.00"
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Category</label>
          <input
            type="text"
            name="category"
            value={transactionData.category}
            onChange={handleChange}
            required
            placeholder="e.g. Food, Travel"
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Date</label>
          <input
            type="date"
            name="date"
            value={transactionData.date}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Notes</label>
          <textarea
            name="notes"
            value={transactionData.notes}
            onChange={handleChange}
            rows="4"
            placeholder="Any additional details..."
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Type</label>
          <select
            name="type"
            value={transactionData.type}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          >
            <option value="Revenue">Revenue</option>
            <option value="Expense">Expense</option>
          </select>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
          <button
            onClick={handleAdd}
            style={{ flex: 1, backgroundColor: '#007bff', color: '#fff', padding: '12px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
          >
            Add Transaction
          </button>

          <button
            onClick={handleUpdate}
            style={{ flex: 1, backgroundColor: '#ffc107', color: '#333', padding: '12px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
          >
            Update Transaction
          </button>

          <button
            onClick={handleDelete}
            style={{ flex: 1, backgroundColor: '#dc3545', color: '#fff', padding: '12px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
          >
            Delete Transaction
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTransaction;
