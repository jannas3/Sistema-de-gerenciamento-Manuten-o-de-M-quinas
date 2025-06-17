import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import Machines from './components/Machines';
import AppNavbar from './components/AppNavbar';
import SideMenu from './components/SideMenu';
import { Box } from '@mui/material';

export default function App() {
  return (
    <BrowserRouter>
      <Box sx={{ display: 'flex' }}>
        <SideMenu />
        <Box component="main" sx={{ flexGrow: 1 }}>
          <AppNavbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/machines" element={<Machines />} />
          </Routes>
        </Box>
      </Box>
    </BrowserRouter>
  );
}
