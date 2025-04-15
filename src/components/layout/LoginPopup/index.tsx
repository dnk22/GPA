import React, { useState } from 'react';
import { Lock } from 'lucide-react';
import { useAuth } from '@/utility/contexts';
import { APP_CONSTANTS } from '@/utility/constants';
import {
  Overlay,
  PopupContainer,
  Title,
  Form,
  InputGroup,
  Input,
  Button,
  ErrorMessage
} from './styles';

interface LoginPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginPopup: React.FC<LoginPopupProps> = ({ isOpen, onClose }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === APP_CONSTANTS.ADMIN_PASSWORD) {
      const loginSuccess = login(password);
      
      if (loginSuccess) {
        setPassword('');
        setError('');
        onClose();
      } else {
        setError('Lỗi khi đăng nhập. Vui lòng thử lại.');
      }
    } else {
      setError('Mật khẩu không đúng');
    }
  };

  if (!isOpen) return null;

  return (
    <Overlay>
      <PopupContainer onClick={(e: React.MouseEvent) => e.stopPropagation()}>
        <Title>Đăng Nhập</Title>
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Lock size={18} />
            <Input
              type="password"
              placeholder="Nhập mật khẩu..."
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              autoFocus
            />
          </InputGroup>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <Button type="submit">Đăng Nhập</Button>
        </Form>
      </PopupContainer>
    </Overlay>
  );
};