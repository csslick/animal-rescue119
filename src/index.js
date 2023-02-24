import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// 연결할 페이지
import Detail from './pages/Detail'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);

