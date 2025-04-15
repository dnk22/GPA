import { useState } from 'react';
import { Save, Check, AlertCircle } from 'lucide-react';
import { useDataContext } from '../../context/DataContext';
import { styled } from 'styled-components';

const StatusMessage = styled.div<{ $isError?: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 6px;
  background-color: ${({ $isError, theme }) => 
    $isError 
      ? theme.mode === 'dark' ? '#7f1d1d' : '#fee2e2'
    : theme.mode === 'dark' ? '#14532d' : '#dcfce7'};
  color: ${({ $isError, theme }) => 
    $isError
      ? theme.mode === 'dark' ? '#fecaca' : '#b91c1c'
      : theme.mode === 'dark' ? '#86efac' : '#166534'};
`;

const SaveButton = styled.button<{ $isPrimary?: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  
  ${({ $isPrimary, theme }) => 
    $isPrimary 
      ? `
        background-color: ${theme.primary};
        color: white;
        
        &:hover {
          opacity: 0.9;
        }
        
        &:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      ` 
      : `
        background-color: ${theme.mode === 'dark' ? '#374151' : '#e5e7eb'};
        color: ${theme.text};
        
        &:hover {
          background-color: ${theme.mode === 'dark' ? '#4b5563' : '#d1d5db'};
        }
        
        &:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `
  }
`;

const SaveDataPanel = () => {
  const { hasPreviewData } = useDataContext();
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<{ message: string; isError: boolean } | null>(null);
  
  const handleSaveData = async () => {
    if (!hasPreviewData) return;
    
    setIsSaving(true);
    setSaveStatus(null);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSaveStatus({
        message: 'Lưu thành công!',
        isError: false
      });
    } catch (error) {
      console.error('Error saving data:', error);
      setSaveStatus({
        message: 'Lỗi khi lưu. Thử lại.',
        isError: true
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      {saveStatus && (
        <StatusMessage $isError={saveStatus.isError}>
          {saveStatus.isError ? <AlertCircle size={16} /> : <Check size={16} />}
          {saveStatus.message}
        </StatusMessage>
      )}
      
      <SaveButton 
        onClick={handleSaveData} 
        disabled={!hasPreviewData || isSaving}
        $isPrimary
      >
        <Save size={16} />
        {isSaving ? 'Đang lưu...' : 'Lưu'}
      </SaveButton>
    </>
  );
};

export default SaveDataPanel;