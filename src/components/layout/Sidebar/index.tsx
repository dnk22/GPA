import { useState } from 'react';
import { LayoutDashboard, Upload, LogIn, LogOut } from 'lucide-react';
import { SidebarContainer, MenuItem, MenuTitle, SidebarFooter } from './styles';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/utility/contexts';
import { LoginPopup } from '../LoginPopup';

interface SidebarProps {
  className?: string;
}

export const Sidebar = ({ className = '' }: SidebarProps) => {
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const handleLoginClick = () => {
    setShowLoginPopup(true);
  };

  const handleClosePopup = () => {
    setShowLoginPopup(false);
  };

  return (
    <>
      <SidebarContainer className={className}>
        <MenuTitle>GPA Management</MenuTitle>
        
        <MenuItem $active={location.pathname === '/' || location.pathname === '/dashboard'}>
          <Link to="/dashboard">
            <LayoutDashboard />
            <span>Dashboard</span>
          </Link>
        </MenuItem>
        
        {isAuthenticated && (
          <MenuItem $active={location.pathname === '/upload-grades'}>
            <Link to="/upload-grades">
              <Upload />
              <span>Upload Grades</span>
            </Link>
          </MenuItem>
        )}
        
        <SidebarFooter>
          {isAuthenticated ? (
            <MenuItem onClick={logout}>
              <LogOut />
              <span>Logout</span>
            </MenuItem>
          ) : (
            <MenuItem $active={showLoginPopup} onClick={handleLoginClick}>
              <LogIn />
              <span>Login</span>
            </MenuItem>
          )}
        </SidebarFooter>
      </SidebarContainer>
      
      <LoginPopup isOpen={showLoginPopup} onClose={handleClosePopup} />
    </>
  );
};