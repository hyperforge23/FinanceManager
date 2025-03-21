import React, { useState } from 'react';
import { Plus } from 'lucide-react';

interface ExpenseEntry {
  name: string;
  amount: number;
  type: string;
  date: string;
}

const Expense = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<ExpenseEntry>({
    name: '',
    amount: 0,
    type: 'food',
    date: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add Firebase integration
    console.log('Expense entry:', formData);
    setShowModal(false);
    setFormData({
      name: '',
      amount: 0,
      type: 'food',
      date: new Date().toISOString().split('T')[0]
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-orbitron font-bold bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
          Expense Tracker
        </h1>
        <button
          onClick={() => setShowModal(true)}
          className="button-primary flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Expense
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="glass-effect p-8 rounded-xl w-full max-w-md relative">
            <h2 className="text-2xl font-orbitron font-bold mb-6 bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
              Add New Expense
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
                  onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) })}
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
                  <option value="food">Food</option>
                  <option value="transportation">Transportation</option>
                  <option value="utilities">Utilities</option>
                  <option value="entertainment">Entertainment</option>
                  <option value="shopping">Shopping</option>
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
                <button
                  type="submit"
                  className="flex-1 button-primary"
                >
                  Add Expense
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="glass-effect p-6 rounded-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Expense History</h2>
          <button className="px-4 py-2 rounded-lg border border-gray-600 hover:border-gray-400 transition-colors flex items-center gap-2">
            Export CSV
          </button>
        </div>
        <div className="text-gray-400">Expense history will be displayed here</div>
      </div>
    </div>
  );
};

export default Expense;