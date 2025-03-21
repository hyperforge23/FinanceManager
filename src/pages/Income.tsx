import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { db } from '../firebase.ts';
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  Timestamp,
} from 'firebase/firestore';

interface IncomeEntry {
  name: string;
  amount: number;
  type: string;
  date: string;
}

const Income = () => {
  const [showModal, setShowModal] = useState(false);
  const [incomeList, setIncomeList] = useState<IncomeEntry[]>([]);
  const [formData, setFormData] = useState<IncomeEntry>({
    name: '',
    amount: 0,
    type: 'salary',
    date: new Date().toISOString().split('T')[0],
  });

  const fetchIncome = async () => {
    try {
      const q = query(collection(db, 'income'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const incomeData: IncomeEntry[] = querySnapshot.docs.map((doc) => ({
        ...(doc.data() as IncomeEntry),
      }));
      setIncomeList(incomeData);
    } catch (error) {
      console.error('Error fetching income:', error);
    }
  };

  useEffect(() => {
    fetchIncome();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'income'), {
        ...formData,
        createdAt: Timestamp.now(),
      });
      setShowModal(false);
      setFormData({
        name: '',
        amount: 0,
        type: 'salary',
        date: new Date().toISOString().split('T')[0],
      });
      fetchIncome();
    } catch (error) {
      console.error('Error adding income:', error);
    }
  };

  // ✅ CSV Export Function
  const exportToCSV = () => {
    if (incomeList.length === 0) return;

    const csvHeader = 'Description,Amount,Type,Date\n';
    const csvRows = incomeList
      .map((income) => `${income.name},${income.amount},${income.type},${income.date}`)
      .join('\n');

    const csvContent = csvHeader + csvRows;
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'income_data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-orbitron font-bold bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
          Income Tracker
        </h1>
        <button
          onClick={() => setShowModal(true)}
          className="button-primary flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Income
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="glass-effect p-8 rounded-xl w-full max-w-md relative">
            <h2 className="text-2xl font-orbitron font-bold mb-6 bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
              Add New Income
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Description
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label htmlFor="amount" className="block text-sm font-medium mb-2">
                  Amount
                </label>
                <input
                  type="number"
                  id="amount"
                  min="0"
                  step="0.01"
                  value={formData.amount}
                  onChange={(e) =>
                    setFormData({ ...formData, amount: parseFloat(e.target.value) })
                  }
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label htmlFor="type" className="block text-sm font-medium mb-2">
                  Type
                </label>
                <select
                  id="type"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="input-field"
                  required
                >
                  <option value="salary">Salary</option>
                  <option value="freelance">Freelance</option>
                  <option value="investment">Investment</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="date" className="block text-sm font-medium mb-2">
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="input-field"
                  required
                />
              </div>
              <div className="flex gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-600 hover:border-gray-400 transition-colors"
                >
                  Cancel
                </button>
                <button type="submit" className="flex-1 button-primary">
                  Add Income
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Income History */}
      <div className="glass-effect p-6 rounded-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Income History</h2>
          <button
            onClick={exportToCSV}
            className="px-4 py-2 rounded-lg border border-gray-600 hover:border-gray-400 transition-colors flex items-center gap-2"
          >
            Export CSV
          </button>
        </div>

        {incomeList.length > 0 ? (
          <ul className="space-y-4">
            {incomeList.map((income, index) => (
              <li
                key={index}
                className="p-4 rounded-lg bg-gray-800 flex justify-between"
              >
                <div>
                  <p className="font-semibold">{income.name}</p>
                  <p className="text-sm text-gray-400">
                    {income.type} | {income.date}
                  </p>
                </div>
                <p className="font-bold text-green-400">
                  ${income.amount.toFixed(2)}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">No income data available.</p>
        )}
      </div>
    </div>
  );
};

export default Income;
