import React, { useState } from 'react';
import { X } from 'lucide-react';
import { 
  ModalOverlay, 
  ModalContainer, 
  ModalHeader, 
  ModalContent, 
  CloseButton,
  ModalFooter,
  Button,
  TextArea
} from '../../styles';

interface EntityModalProps {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  onSubmit: (data: unknown[]) => void;
}

/**
 * Modal component cho phép nhập dữ liệu dạng JSON
 */
const EntityModal: React.FC<EntityModalProps> = ({ 
  isOpen, 
  title, 
  onClose, 
  onSubmit 
}) => {
  const [jsonData, setJsonData] = useState('');
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = () => {
    try {
      const parsed = JSON.parse(jsonData);
      
      // Kiểm tra dữ liệu có phải là mảng không
      if (!Array.isArray(parsed)) {
        setError('Dữ liệu phải là một mảng các đối tượng');
        return;
      }
      
      onSubmit(parsed);
      setJsonData('');
      setError(null);
    } catch {
      setError('Dữ liệu JSON không hợp lệ');
    }
  };

  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalHeader>
          <h3>{title}</h3>
          <CloseButton onClick={onClose}>
            <X size={18} />
          </CloseButton>
        </ModalHeader>
        
        <ModalContent>
          <p>Nhập dữ liệu JSON cho {title.toLowerCase()}:</p>
          <TextArea
            value={jsonData}
            onChange={(e) => setJsonData(e.target.value)}
            placeholder='[{"field1": "value1", "field2": "value2"}, ...]'
            rows={10}
          />
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </ModalContent>
        
        <ModalFooter>
          <Button onClick={onClose} variant="secondary">Hủy</Button>
          <Button onClick={handleSubmit} variant="primary">Lưu</Button>
        </ModalFooter>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default EntityModal; 