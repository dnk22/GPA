import styled from 'styled-components';

export const PageContainer = styled.div`
  padding: 2rem;
  width: 100%;
`;

export const Title = styled.h1`
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.text};
`;

interface UploadAreaProps {
  $isSuccess?: boolean;
}

export const UploadArea = styled.div<UploadAreaProps>`
  border: 2px dashed ${({ theme, $isSuccess }) => 
    $isSuccess ? theme.success : theme.border};
  border-radius: 8px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
  background-color: ${({ theme, $isSuccess }) => 
    $isSuccess ? `${theme.success}10` : theme.background};
  
  .file-info {
    display: flex;
    align-items: center;
    gap: 1rem;
    width: 100%;
  }
`;

export const FileInput = styled.input`
  display: none;
`;

export const UploadButton = styled.button`
  background-color: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.75rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-weight: 500;
  
  &:disabled {
    background-color: ${({ theme }) => theme.border};
    cursor: not-allowed;
  }
`;

export const ProcessArea = styled.div`
  margin-bottom: 2rem;
`;

export const ProcessButton = styled.button`
  background-color: ${({ theme }) => theme.secondary};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  font-weight: 500;
  
  &:disabled {
    background-color: ${({ theme }) => theme.border};
    cursor: not-allowed;
  }
`;

export const StatusMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.success};
`;

export const ExtractedDataContainer = styled.div`
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  padding: 1.5rem;
  background-color: ${({ theme }) => theme.background};
`;

export const PreviewContainer = styled.div`
  margin-top: 1.5rem;
  
  h4 {
    margin-bottom: 1rem;
  }
`;

export const PreviewHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  
  h3 {
    margin-bottom: 0.5rem;
  }
  
  div {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 0.5rem;
  }
`;

export const PreviewTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1.5rem;
  
  th, td {
    padding: 0.75rem;
    text-align: left;
    border-bottom: 1px solid ${({ theme }) => theme.border};
  }
  
  th {
    background-color: ${({ theme }) => `${theme.primary}15`};
    font-weight: 600;
  }
  
  tr:hover {
    background-color: ${({ theme }) => `${theme.primary}05`};
  }
  
  tfoot tr {
    background-color: ${({ theme }) => `${theme.secondary}10`};
    font-weight: 500;
  }
`; 