import React from 'react';
import ReactDOM from 'react-dom';
import { Layout } from 'antd';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import './index.css';

const App = () => (
  <div className="App">
    <Layout>
      <Sidebar />
      <Layout>
        <MainContent />
      </Layout>
    </Layout>
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
