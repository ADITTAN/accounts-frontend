import React, { useState } from 'react';
import axios from '../utils/axios';

const GenerateReport = () => {
  const [reportType, setReportType] = useState('summary');
  const [dateRange, setDateRange] = useState({ from: '', to: '' });
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!dateRange.from || !dateRange.to) {
      alert('Please select a valid date range.');
      return;
    }

    setLoading(true);
    try {
      const res = await axios.get('/reports/custom', {
        params: {
          type: reportType,
          from: dateRange.from,
          to: dateRange.to,
        },
      });
      setReportData(res.data);
    } catch (err) {
      console.error('Failed to fetch report:', err);
      alert('Error fetching report');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '700px', margin: '40px auto', padding: '30px', border: '1px solid #ddd', borderRadius: '10px', backgroundColor: '#f9f9f9' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Generate Financial Report</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Report Type</label>
          <select
            name="reportType"
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          >
            <option value="summary">Summary</option>
            <option value="detailed">Detailed</option>
            <option value="custom">Custom</option>
          </select>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
          <div style={{ width: '48%' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>From</label>
            <input
              type="date"
              value={dateRange.from}
              onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
              required
              style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
            />
          </div>

          <div style={{ width: '48%' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>To</label>
            <input
              type="date"
              value={dateRange.to}
              onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
              required
              style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
            />
          </div>
        </div>

        <button
          type="submit"
          style={{ backgroundColor: '#007bff', color: '#fff', padding: '10px 15px', border: 'none', borderRadius: '5px', cursor: 'pointer', width: '100%' }}
        >
          {loading ? 'Generating...' : 'Generate Report'}
        </button>
      </form>

      {/* Display Report Results */}
      {reportData && (
        <div style={{ marginTop: '30px' }}>
          <h3 style={{ marginBottom: '10px' }}>Report Results:</h3>
          {reportData.length === 0 ? (
            <p>No transactions found in the selected range.</p>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={thStyle}>Date</th>
                  <th style={thStyle}>Type</th>
                  <th style={thStyle}>Category</th>
                  <th style={thStyle}>Amount</th>
                </tr>
              </thead>
              <tbody>
                {reportData.map((entry) => (
                  <tr key={entry._id}>
                    <td style={tdStyle}>{new Date(entry.date).toLocaleDateString()}</td>
                    <td style={tdStyle}>{entry.type}</td>
                    <td style={tdStyle}>{entry.category || '—'}</td>
                    <td style={tdStyle}>${entry.amount.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

const thStyle = {
  borderBottom: '1px solid #ccc',
  padding: '10px',
  backgroundColor: '#eee',
  textAlign: 'left',
};

const tdStyle = {
  borderBottom: '1px solid #ddd',
  padding: '10px',
};

export default GenerateReport;
