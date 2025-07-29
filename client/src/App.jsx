import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import MonitoredList from './components/monitor/MonitoredList.jsx';
import MonitoredCreate from './components/monitor/MonitoredCreate.jsx';
import MonitoredEdit from './components/monitor/MonitoredEdit.jsx';
import MonitoredView from './components/monitor/MonitoredView.jsx';
import SetupProfile from './components/SetupProfile';

function App() {
  return (
    <Router>
      <div>
        <h1>🌍 Monitored Destinations Dashboard</h1>
        <Routes>
          <Route path="/monitored" element={<MonitoredList />} />
          <Route path="/monitored/create" element={<MonitoredCreate />} />
          <Route path="/monitored/edit/:id" element={<MonitoredEdit />} />
          <Route path="/monitored/view/:id" element={<MonitoredView />} />
          <Route path="/setup-profile" element={<SetupProfile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
