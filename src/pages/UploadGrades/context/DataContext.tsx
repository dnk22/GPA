import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Course } from '@/services/firebase/schemas/course';
import { Student } from '@/services/firebase/schemas/student';
import { Grade } from '@/services/firebase/schemas/grade';
import { ExtractedStudent } from '../components/FileUpload';

// Modal types
export type ModalType = 'course' | 'student' | 'grade' | null;

// Data structure
export interface AppData {
  courses: Course[];
  students: Student[];
  grades: Grade[];
}

// Context state interface
interface DataContextState {
  // Data states
  extractedPdfData: ExtractedStudent | null;
  data: AppData;
  
  // Modal state
  activeModal: ModalType;
  
  // Actions
  setExtractedPdfData: (data: ExtractedStudent | null) => void;
  setData: (data: AppData) => void;
  updateData: (field: keyof AppData, value: Course[] | Student[] | Grade[]) => void;
  handleOpenModal: (type: ModalType) => void;
  handleCloseModal: () => void;
  
  // Helpers
  hasPreviewData: boolean;
}

// Create context
const DataContext = createContext<DataContextState | undefined>(undefined);

// Provider component
interface DataProviderProps {
  children: ReactNode;
}

// Default empty data
const emptyData: AppData = {
  courses: [],
  students: [],
  grades: []
};

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  // State
  const [extractedPdfData, setExtractedPdfData] = useState<ExtractedStudent | null>(null);
  const [data, setData] = useState<AppData>(emptyData);
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  
  // Update một field cụ thể trong data
  const updateData = (field: keyof AppData, value: Course[] | Student[] | Grade[]) => {
    setData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };
  
  // Modal handlers
  const handleOpenModal = (type: ModalType) => {
    setActiveModal(type);
  };
  
  const handleCloseModal = () => {
    setActiveModal(null);
  };
  
  // Calculate if there's any preview data
  const hasPreviewData = extractedPdfData !== null || 
    data.courses.length > 0 || 
    data.students.length > 0 || 
    data.grades.length > 0;
  
  // Context value
  const value = {
    extractedPdfData,
    data,
    activeModal,
    setExtractedPdfData,
    setData,
    updateData,
    handleOpenModal,
    handleCloseModal,
    hasPreviewData
  };
  
  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};

// Custom hook for using the context
export const useDataContext = (): DataContextState => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useDataContext must be used within a DataProvider');
  }
  return context;
}; 