import React, { useState } from 'react';
import App from './App';

export default () => {
  const [from, setFrom] = useState('');
  const [billTo, setBillTo] = useState('');
  const [shipTo, setShipTo] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [invoiceDate, setInvoiceDate] = useState('');
  const [quantity, setQuantity] = useState('');
  const [description, setDescription] = useState('');
  const [unitPrice, setUnitPrice] = useState('');
  const [amount, setAmount] = useState('');

  return (
    <App
      from={from}
      setFrom={setFrom}
      billTo={billTo}
      setBillTo={setBillTo}
      shipTo={shipTo}
      setShipTo={setShipTo}
      invoiceNumber={invoiceNumber}
      setInvoiceNumber={setInvoiceNumber}
      invoiceDate={invoiceDate}
      setInvoiceDate={setInvoiceDate}
      dueDate={dueDate}
      setDueDate={setDueDate}
      quantity={quantity}
      setQuantity={setQuantity}
      description={description}
      setDescription={setDescription}
      unitPrice={unitPrice}
      setUnitPrice={setUnitPrice}
      amount={amount}
      setAmount={setAmount}
    />
  );
};
