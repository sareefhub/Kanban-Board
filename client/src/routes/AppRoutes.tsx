import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Hello from '../pages/Hello';
import KanbanBoardPage from '../pages/KanbanBoardPage/KanbanBoardPage';

const NotFound: React.FC = () => <h2>404: Page not found</h2>;

const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/hello" element={<Hello />} />
    <Route path="/kanban" element={<KanbanBoardPage />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
