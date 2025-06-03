import React, { useRef, useState } from 'react';
import axios from '../utils/axios';
import { useReactToPrint } from 'react-to-print';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const CreateInvoice = () => {
  const [client, setClient] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [invoiceId, setInvoiceId] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  const invoiceRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const invoiceData = { client, amount, description, date, invoiceNumber };

    try {
      if (isEditMode && invoiceId) {
        await axios.put(`/invoices/${invoiceId}`, invoiceData);
        alert('Invoice updated!');
      } else {
        const { data } = await axios.post('/invoices', invoiceData);
        setInvoiceId(data._id);
        alert('Invoice created!');
      }
    } catch (error) {
      console.error(error);
      alert('Error creating/updating invoice');
    }
  };

  const reactToPrintTrigger = useReactToPrint({
    content: () => invoiceRef.current,
    documentTitle: `Invoice-${invoiceNumber}`,
  });
  
  const handlePrint = () => {
    if (!showPreview) {
      setShowPreview(true);
      setTimeout(() => {
        reactToPrintTrigger();
      }, 300); // Wait a bit for DOM to render
    } else {
      reactToPrintTrigger();
    }
  };
  
  
  
  const downloadPDF = async () => {
    const element = invoiceRef.current;
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`Invoice-${invoiceNumber}.pdf`);
  };

  const handleEditToggle = () => {
    if (!invoiceId) return alert('Please save the invoice first.');
    setIsEditMode(true);
    alert('Edit mode enabled.');
  };

  const handlePreview = () => {
    setShowPreview(true);
  };

  const styles = {
    container: {
      maxWidth: '700px',
      margin: '40px auto',
      padding: '30px',
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      boxShadow: '0 0 15px rgba(0,0,0,0.1)',
      fontFamily: 'Segoe UI, sans-serif',
    },
    header: {
      fontSize: '28px',
      fontWeight: '600',
      color: '#333',
      textAlign: 'center',
      marginBottom: '30px',
    },
    formGroup: {
      marginBottom: '20px',
    },
    label: {
      display: 'block',
      fontWeight: '500',
      marginBottom: '6px',
      fontSize: '16px',
      color: '#333',
    },
    input: {
      width: '100%',
      padding: '12px',
      borderRadius: '8px',
      border: '1px solid #ccc',
      fontSize: '15px',
    },
    textarea: {
      width: '100%',
      padding: '12px',
      borderRadius: '8px',
      border: '1px solid #ccc',
      fontSize: '15px',
      resize: 'vertical',
    },
    buttonRow: {
      display: 'flex',
      gap: '12px',
      flexWrap: 'wrap',
      marginTop: '20px',
    },
    button: {
      padding: '12px 20px',
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: '500',
      transition: 'all 0.2s ease',
    },
    previewContainer: {
        marginTop: '40px',
        padding: '30px',
        border: '1px dashed #ccc',
        borderRadius: '12px',
        backgroundColor: '#fdfdfd',
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
        maxWidth: '600px',
        marginLeft: 'auto',
        marginRight: 'auto',
      },
      previewHeader: {
        fontSize: '24px',
        marginBottom: '25px',
        fontWeight: '600',
        textAlign: 'center',
        color: '#333',
      },
      previewItem: {
        marginBottom: '14px',
        fontSize: '16px',
        color: '#444',
        display: 'flex',
        justifyContent: 'space-between',
        borderBottom: '1px solid #eee',
        paddingBottom: '6px',
      },
  
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>{isEditMode ? 'Edit Invoice' : 'Create Invoice'}</h2>
      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Date</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required style={styles.input} />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Invoice Number</label>
          <input type="text" value={invoiceNumber} onChange={(e) => setInvoiceNumber(e.target.value)} required style={styles.input} />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Client Name</label>
          <input type="text" value={client} onChange={(e) => setClient(e.target.value)} required style={styles.input} />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Amount ($)</label>
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required style={styles.input} />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required rows="4" style={styles.textarea} />
        </div>

        <div style={styles.buttonRow}>
          <button type="submit" style={styles.button}>{isEditMode ? 'Update Invoice' : 'Save Invoice'}</button>
          <button type="button" onClick={handlePreview} style={styles.button}>Preview</button>
          <button type="button" onClick={downloadPDF} style={styles.button}>Download PDF</button>
          <button type="button" onClick={handlePrint} style={styles.button}>Print</button>
          <button type="button" onClick={handleEditToggle} style={styles.button}>Edit</button>
        </div>
      </form>

      {/* Preview Section */}
      {showPreview && (
        <div style={styles.previewContainer}>
          <div ref={invoiceRef}>
            <h3 style={styles.previewHeader}>Invoice Preview</h3>
            <p style={styles.previewItem}><strong>Date:</strong> {date}</p>
            <p style={styles.previewItem}><strong>Invoice No:</strong> {invoiceNumber}</p>
            <p style={styles.previewItem}><strong>Client:</strong> {client}</p>
            <p style={styles.previewItem}><strong>Amount:</strong> ${amount}</p>
            <p style={styles.previewItem}><strong>Description:</strong> {description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateInvoice;
