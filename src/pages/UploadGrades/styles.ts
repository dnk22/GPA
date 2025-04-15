import styled from "styled-components";

export const PageContainer = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
`;

export const Title = styled.h2`
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.text};
`;

// Layout styles
export const LayoutRow = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const LeftColumn = styled.div`
  min-width: 0;
`;

export const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const PreviewSection = styled.div`
  margin-top: 2rem;
`;

export const SectionTitle = styled.h3`
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.text};
  font-size: 1.25rem;
`;

// Tab navigation
export const TabContainer = styled.div`
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  margin-bottom: 1.5rem;
`;

interface TabItemProps {
  $active: boolean;
}

export const TabItem = styled.div<TabItemProps>`
  padding: 0.75rem 1.5rem;
  font-weight: ${({ $active }) => ($active ? "600" : "normal")};
  color: ${({ theme, $active }) => ($active ? theme.primary : theme.text)};
  border-bottom: 2px solid
    ${({ theme, $active }) => ($active ? theme.primary : "transparent")};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

// Action buttons
export const ActionButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ActionButton = styled.button`
  background-color: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: ${({ theme }) => theme.primaryDark || theme.primary};
    opacity: 0.9;
  }
`;

// Menu components
export const MenuContainer = styled.div`
  position: relative;

  .menu-dropdown {
    position: absolute;
    top: calc(100% + 4px);
    right: 0;
    width: 200px;
    background-color: ${({ theme }) => theme.background};
    border: 1px solid ${({ theme }) => theme.border};
    border-radius: 4px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    z-index: 100;
    overflow: hidden;
  }
`;

export const MenuButton = styled.button`
  background-color: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  border-radius: 6px;
  padding: 10px 16px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-weight: 500;
  justify-content: space-between;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.primaryDark || theme.primary};
    transform: translateY(-1px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);
  }

  span {
    flex: 1;
    text-align: left;
    font-size: 14px;
    letter-spacing: 0.3px;
  }
`;

export const MenuItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 10px 16px;
  cursor: pointer;
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  transition: all 0.15s ease;

  &:hover {
    background-color: ${({ theme }) => theme.hover || "#f5f5f5"};
    color: ${({ theme }) => theme.primary};
  }

  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.borderLight || "#f0f0f0"};
  }

  span {
    flex: 1;
  }
`;

// Upload area
interface UploadAreaProps {
  $isSuccess?: boolean;
}

export const UploadArea = styled.div<UploadAreaProps>`
  border: 2px dashed
    ${({ theme, $isSuccess }) => ($isSuccess ? theme.success : theme.border)};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme, $isSuccess }) =>
    $isSuccess ? `${theme.success}10` : theme.background};
  padding: 10px;

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

export const ProcessButton = styled.button`
  background-color: ${({ theme }) => theme.primary};
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

// Preview containers
export const ExtractedDataContainer = styled.div`
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  padding: 1.5rem;
  background-color: ${({ theme }) => theme.background};
  margin-bottom: 1.5rem;
`;

export const PreviewContainer = styled.div`
  margin-bottom: 2rem;

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

  th,
  td {
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

// Modal components
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalContainer = styled.div`
  background-color: ${({ theme }) => `${theme.background}`};
  border-radius: 8px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #e5e7eb;

  h3 {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
  }
`;

export const ModalContent = styled.div`
  padding: 20px;
  overflow-y: auto;
  flex: 1;
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 16px 20px;
  border-top: 1px solid #e5e7eb;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b7280;

  &:hover {
    color: #374151;
  }
`;

export const Button = styled.button<{ variant?: "primary" | "secondary" }>`
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  ${({ variant }) =>
    variant === "primary"
      ? `
        background-color: #2563eb;
        color: white;
        &:hover {
          background-color: #1d4ed8;
        }
      `
      : `
        background-color: #e5e7eb;
        color: #1f2937;
        &:hover {
          background-color: #d1d5db;
        }
      `}
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-family: monospace;
  font-size: 14px;
  resize: vertical;
  min-height: 120px;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
  }
`;
