import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ArrowRight, Shield, Zap, Globe, Database } from 'lucide-react';

const Home: React.FC = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: Shield,
      title: 'Secure Authentication',
      description: 'JWT-based authentication with secure password hashing and token management.',
    },
    {
      icon: Zap,
      title: 'Fast Performance',
      description: 'Built with FastAPI and React for lightning-fast response times and smooth UX.',
    },
    {
      icon: Globe,
      title: 'Production Ready',
      description: 'Dockerized with Traefik reverse proxy and automatic HTTPS certificates.',
    },
    {
      icon: Database,
      title: 'Scalable Database',
      description: 'PostgreSQL with proper migrations and optimized queries for growth.',
    },
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <div className="text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold text-gray-900">
            Full-Stack Application
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A production-ready web application built with React, FastAPI, and PostgreSQL. 
            Fully containerized and ready for cloud deployment.
          </p>
        </div>

        <div className="flex justify-center space-x-4">
          {user ? (
            <Link
              to="/dashboard"
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              Go to Dashboard
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          ) : (
            <>
              <Link
                to="/register"
                className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center px-6 py-3 border border-gray-300 hover:border-gray-400 text-gray-700 rounded-lg font-medium transition-colors"
              >
                Login
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
              <feature.icon className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600">
              {feature.description}
            </p>
          </div>
        ))}
      </div>

      {/* Tech Stack Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Technology Stack
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Frontend</h3>
            <ul className="space-y-2 text-gray-600">
              <li>React 18 with TypeScript</li>
              <li>Tailwind CSS</li>
              <li>React Router</li>
              <li>Context API</li>
            </ul>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Backend</h3>
            <ul className="space-y-2 text-gray-600">
              <li>FastAPI with Python</li>
              <li>PostgreSQL Database</li>
              <li>JWT Authentication</li>
              <li>SQLAlchemy ORM</li>
            </ul>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">DevOps</h3>
            <ul className="space-y-2 text-gray-600">
              <li>Docker & Docker Compose</li>
              <li>Traefik Reverse Proxy</li>
              <li>GitHub Actions CI/CD</li>
              <li>Automatic HTTPS</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;