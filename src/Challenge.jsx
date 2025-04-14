//import React, { useState } from "react";

function Challenge() {
  const [expenses, setExpenses] = useState([]);
  const [expense, setExpense] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [search, setSearch] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!expense || !category || !description || !amount || !date) {
      alert("Fill in all fields");
      return;
    }

    const newExpense = {
      id: Date.now(),
      expense: expense.trim(),
      category: category.trim(),
      description: description.trim(),
      amount: Number(amount),
      date,
    };

    setExpenses([newExpense, ...expenses]);
    setExpense("");
    setCategory("");
    setDescription("");
    setAmount("");
    setDate("");
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      setExpenses(expenses.filter((item) => item.id !== id));
    }
  };

  const filteredExpenses = expenses.filter((item) =>
    item.expense.toLowerCase().includes(search.toLowerCase()) ||
    item.category.toLowerCase().includes(search.toLowerCase()) ||
    item.description.toLowerCase().includes(search.toLowerCase()) ||
    item.amount.toString().includes(search) ||
    item.date.includes(search)
  );

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Enter Expense"
          value={expense}
          onChange={(e) => setExpense(e.target.value)}
          className="input"
        />
        <input
          type="text"
          placeholder="Enter Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="input"
        />
        <input
          type="text"
          placeholder="Enter Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="input"
        />
        <input
          type="number"
          placeholder="Enter Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="input"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="input"
        />
        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>

      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="input search"
      />

      <table className="expense-table">
        <thead>
          <tr>
            <th>Expense</th>
            <th>Category</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredExpenses.length > 0 ? (
            filteredExpenses.map((item) => (
              <tr key={item.id}>
                <td>{item.expense}</td>
                <td>{item.category}</td>
                <td>{item.description}</td>
                <td>${item.amount.toFixed(2)}</td>
                <td>{item.date}</td>
                <td>
                  <button onClick={() => handleDelete(item.id)} className="delete-btn">
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="no-data">No expenses found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Challenge;
