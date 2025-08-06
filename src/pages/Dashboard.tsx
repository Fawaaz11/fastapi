import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Users, Package, Activity, TrendingUp } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const stats = [
    {
      icon: Users,
      label: 'Total Users',
      value: '1,234',
      change: '+12%',
      changeType: 'increase' as const,
    },
    {
      icon: Package,
      label: 'Items Created',
      value: '856',
      change: '+8%',
      changeType: 'increase' as const,
    },
    {
      icon: Activity,
      label: 'API Requests',
      value: '45.2K',
      change: '+23%',
      changeType: 'increase' as const,
    },
    {
      icon: TrendingUp,
      label: 'Growth Rate',
      value: '14.6%',
      change: '+2.4%',
      changeType: 'increase' as const,
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {user?.full_name || user?.email}!
        </h1>
        <p className="text-gray-600 mt-1">
          Here's what's happening with your application today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg">
                <stat.icon className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span
                className={`text-sm font-medium ${
                  stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {stat.change}
              </span>
              <span className="text-sm text-gray-500 ml-1">from last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {[
              {
                action: 'New user registered',
                time: '2 minutes ago',
                type: 'user',
              },
              {
                action: 'Item "Sample Project" was created',
                time: '15 minutes ago',
                type: 'item',
              },
              {
                action: 'Database backup completed',
                time: '1 hour ago',
                type: 'system',
              },
              {
                action: 'API endpoint performance optimized',
                time: '3 hours ago',
                type: 'system',
              },
            ].map((activity, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div
                  className={`w-2 h-2 rounded-full ${
                    activity.type === 'user'
                      ? 'bg-green-400'
                      : activity.type === 'item'
                      ? 'bg-blue-400'
                      : 'bg-gray-400'
                  }`}
                />
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center justify-center px-4 py-3 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition-colors">
            <Package className="h-5 w-5 mr-2" />
            Create New Item
          </button>
          <button className="flex items-center justify-center px-4 py-3 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg transition-colors">
            <Users className="h-5 w-5 mr-2" />
            Manage Users
          </button>
          <button className="flex items-center justify-center px-4 py-3 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-lg transition-colors">
            <Activity className="h-5 w-5 mr-2" />
            View Analytics
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;