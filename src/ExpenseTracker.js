import React, { useState } from 'react';

// Component for adding or editing an expense
const ExpenseForm = ({ onAddExpense, onEditExpense, expenseToEdit }) => {
  const [title, setTitle] = useState(expenseToEdit ? expenseToEdit.title : '');
  const [amount, setAmount] = useState(expenseToEdit ? expenseToEdit.amount : '');
  const [date, setDate] = useState(expenseToEdit ? expenseToEdit.date : '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && amount && date) {
      const expense = { title, amount: parseFloat(amount), date: new Date(date) };
      if (expenseToEdit) {
        onEditExpense(expenseToEdit.id, expense); // Editing existing expense
      } else {
        onAddExpense(expense); // Adding new expense
      }
      setTitle('');
      setAmount('');
      setDate('');
    } else {
      alert('Please fill all fields.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={formStyles}>
      <div style={inputGroupStyles}>
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required style={inputStyles} />
      </div>
      <div style={inputGroupStyles}>
        <label>Amount:</label>
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required style={inputStyles} />
      </div>
      <div style={inputGroupStyles}>
        <label>Date:</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required style={inputStyles} />
      </div>
      <button type="submit" style={buttonStyles}>
        {expenseToEdit ? 'Update Expense' : 'Add Expense'}
      </button>
    </form>
  );
};

// Component to filter expenses by year
const ExpenseFilter = ({ selectedYear, onChangeYear }) => {
  const years = [2023, 2024, 2025, 2026, 2027];

  return (
    <div style={inputGroupStyles}>
      <label>Filter by year:</label>
      <select value={selectedYear} onChange={(e) => onChangeYear(e.target.value)} style={inputStyles}>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
};

// Component to display the list of expenses
const ExpenseList = ({ expenses, onEditExpense, onDeleteExpense }) => {
  if (expenses.length === 0) {
    return <p style={noExpensesStyles}>No expenses found for this year.</p>;
  }

  return (
    <ul style={listStyles}>
      {expenses.map((expense) => (
        <li key={expense.id} style={listItemStyles}>
          {expense.title} - ${expense.amount.toFixed(2)} on {expense.date.toDateString()}
          <button onClick={() => onEditExpense(expense)} style={buttonStyles}>
            Edit
          </button>
          <button onClick={() => onDeleteExpense(expense.id)} style={buttonStyles}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

// Main ExpenseTracker component
const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [expenseToEdit, setExpenseToEdit] = useState(null);

  const addExpense = (expense) => {
    setExpenses([...expenses, { ...expense, id: Date.now() }]);
  };

  const editExpense = (id, updatedExpense) => {
    setExpenses(expenses.map((expense) => (expense.id === id ? { ...expense, ...updatedExpense } : expense)));
    setExpenseToEdit(null); // Reset editing state
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  const filteredExpenses = expenses.filter(
    (expense) => expense.date.getFullYear() === parseInt(selectedYear)
  );

  const totalAmount = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div style={containerStyles}>
      <h1>Expense Tracker</h1>
      <ExpenseForm onAddExpense={addExpense} onEditExpense={editExpense} expenseToEdit={expenseToEdit} />
      <ExpenseFilter selectedYear={selectedYear} onChangeYear={setSelectedYear} />
      <h2>Expenses for {selectedYear}</h2>
      <ExpenseList expenses={filteredExpenses} onEditExpense={setExpenseToEdit} onDeleteExpense={deleteExpense} />
      <h2>Total Amount Spent: ${totalAmount.toFixed(2)}</h2>
    </div>
  );
};

// Styles
const containerStyles = {
  padding: '20px',
  fontFamily: 'Arial, sans-serif',
  maxWidth: '800px',
  margin: '0 auto',
};

const formStyles = {
  marginBottom: '20px',
  backgroundColor: '#f9f9f9',
  padding: '15px',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
};

const inputGroupStyles = {
  marginBottom: '10px',
};

const inputStyles = {
  padding: '8px',
  width: '100%',
  borderRadius: '4px',
  border: '1px solid #ccc',
  boxSizing: 'border-box',
};

const buttonStyles = {
  backgroundColor: '#4CAF50',
  color: 'white',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  marginRight: '10px',
};

const listStyles = {
  listStyleType: 'none',
  padding: 0,
};

const listItemStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  marginBottom: '10px',
};

const noExpensesStyles = {
  color: '#888',
};

export default ExpenseTracker;
