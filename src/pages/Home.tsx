import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface Entry {
  name: string;
  amount: number;
  type: string;
  date: string;
}

const Home = () => {
  const { user } = useAuth();
  const [incomeData, setIncomeData] = useState<Entry[]>([]);
  const [expenseData, setExpenseData] = useState<Entry[]>([]);

  const fetchData = async (collectionName: string, setter: React.Dispatch<React.SetStateAction<Entry[]>>) => {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const data: Entry[] = querySnapshot.docs.map((doc) => doc.data() as Entry);
    setter(data);
  };

  useEffect(() => {
    fetchData('income', setIncomeData);
    fetchData('expense', setExpenseData);
  }, []);

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-orbitron font-bold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
        Welcome {user?.email}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Income Line Chart */}
        <div className="glass-effect p-8 rounded-2xl shadow-xl backdrop-blur-md border border-cyan-500">
          <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
            Income Overview
          </h2>
          <div className="h-64">
            {incomeData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={incomeData}>
                  <CartesianGrid stroke="rgba(255, 255, 255, 0.1)" />
                  <XAxis dataKey="name" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip contentStyle={{ background: '#1e293b', borderRadius: '10px', border: 'none' }} />
                  <Line type="monotone" dataKey="amount" stroke="#06b6d4" strokeWidth={3} dot={{ r: 5, stroke: '#0ea5e9', strokeWidth: 2 }} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400">No income data</div>
            )}
          </div>
        </div>

        {/* Expense Line Chart */}
        <div className="glass-effect p-8 rounded-2xl shadow-xl backdrop-blur-md border border-pink-500">
          <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-pink-400 to-red-500 bg-clip-text text-transparent">
            Expense Overview
          </h2>
          <div className="h-64">
            {expenseData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={expenseData}>
                  <CartesianGrid stroke="rgba(255, 255, 255, 0.1)" />
                  <XAxis dataKey="name" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip contentStyle={{ background: '#1e293b', borderRadius: '10px', border: 'none' }} />
                  <Line type="monotone" dataKey="amount" stroke="#f43f5e" strokeWidth={3} dot={{ r: 5, stroke: '#f43f5e', strokeWidth: 2 }} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400">No expense data</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;