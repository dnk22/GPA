import { useState, useRef, useCallback } from 'react';
import { Upload, FileText, X, Loader, AlertTriangle } from 'lucide-react';
import { useAuth } from '@/utility/contexts';
import { Navigate } from 'react-router-dom';
import { 
  PageContainer, 
  Title, 
  UploadArea,
  UploadButton,
  FileInput,
  FileDetails,
  ButtonGroup,
  ControlButton,
  StatusMessage,
  ValidationMessage,
  PreviewContainer,
  TabsContainer,
  Tab,
  TabContent,
  TableWrapper,
  StyledTable,
  NoDataMessage,
  ProcessButton
} from './styles';

// Define interfaces for the extracted data
interface Grade {
  studentId: string;
  courseId: string;
  value: number;
  semester: string;
}

interface Student {
  id: string;
  name: string;
  class: string;
  major: string;
}

interface Course {
  id: string;
  name: string;
  credits: number;
  department: string;
}

interface ExtractedData {
  grades: Grade[];
  students: Student[];
  courses: Course[];
}

type TabType = 'grades' | 'students' | 'courses';

export const UploadGrades = () => {
  const { isAuthenticated } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [extractedData, setExtractedData] = useState<ExtractedData | null>(null);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<TabType>('students');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = useCallback(() => {
    if (!file) return;

    setIsValidating(true);
    setValidationErrors([]);
    
    // Giả lập việc kiểm tra PDF
    setTimeout(() => {
      // Kiểm tra cấu trúc PDF
      const hasErrors = Math.random() > 0.8; // 20% chance to have errors for demo
      
      if (hasErrors) {
        setValidationErrors([
          'Không thể đọc được dữ liệu từ PDF',
          'PDF không đúng định dạng bảng điểm'
        ]);
        setUploadSuccess(false);
      } else {
        setUploadSuccess(true);
        processFile();
      }
      
      setIsValidating(false);
    }, 1500);
  }, [file]);

  const processFile = useCallback(() => {
    if (!file || !uploadSuccess) return;

    setIsProcessing(true);
    
    // Giả lập việc extract dữ liệu từ PDF
    setTimeout(() => {
      // Mock data - trong triển khai thực tế, bạn sẽ parse PDF
      const mockData: ExtractedData = {
        students: [
          { id: "B19DCCN123", name: "Nguyễn Văn A", class: "D19CQCN01-B", major: "Công nghệ thông tin" },
          { id: "B19DCCN124", name: "Trần Thị B", class: "D19CQCN01-B", major: "Công nghệ thông tin" },
          { id: "B19DCCN125", name: "Lê Văn C", class: "D19CQCN02-B", major: "Công nghệ thông tin" },
        ],
        courses: [
          { id: "INT1449", name: "Phát triển ứng dụng Web", credits: 3, department: "CNTT" },
          { id: "INT1448", name: "Phát triển ứng dụng di động", credits: 3, department: "CNTT" },
          { id: "INT1559", name: "Kiến trúc phần mềm", credits: 3, department: "KTPM" },
          { id: "INT1306", name: "Cơ sở dữ liệu", credits: 3, department: "HTTT" },
        ],
        grades: [
          { studentId: "B19DCCN123", courseId: "INT1449", value: 8.5, semester: "20221" },
          { studentId: "B19DCCN123", courseId: "INT1448", value: 9.0, semester: "20221" },
          { studentId: "B19DCCN123", courseId: "INT1559", value: 7.5, semester: "20222" },
          { studentId: "B19DCCN123", courseId: "INT1306", value: 8.0, semester: "20222" },
          { studentId: "B19DCCN124", courseId: "INT1449", value: 7.0, semester: "20221" },
          { studentId: "B19DCCN124", courseId: "INT1448", value: 8.0, semester: "20221" },
          { studentId: "B19DCCN125", courseId: "INT1559", value: 9.0, semester: "20222" },
          { studentId: "B19DCCN125", courseId: "INT1306", value: 8.5, semester: "20222" },
        ]
      };
      
      setExtractedData(mockData);
      setIsProcessing(false);
    }, 2000);
  }, [file, uploadSuccess]);

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      // Chỉ chấp nhận PDF
      if (selectedFile.type === 'application/pdf' || selectedFile.name.endsWith('.pdf')) {
        setFile(selectedFile);
        setUploadSuccess(false);
        setExtractedData(null);
        setValidationErrors([]);
      } else {
        alert('Vui lòng chọn file PDF');
      }
    }
  }, []);

  const handleButtonClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const resetFile = useCallback(() => {
    setFile(null);
    setUploadSuccess(false);
    setExtractedData(null);
    setValidationErrors([]);
    setIsProcessing(false);
  }, []);

  const handleSaveToDatabase = useCallback(() => {
    if (!extractedData) return;
    alert('Đã lưu dữ liệu vào cơ sở dữ liệu');
    resetFile();
  }, [extractedData, resetFile]);

  const renderTabContent = () => {
    if (!extractedData) return null;

    switch (activeTab) {
      case 'students':
        return (
          <TableWrapper>
            <StyledTable>
              <thead>
                <tr>
                  <th>Mã sinh viên</th>
                  <th>Họ và tên</th>
                  <th>Lớp</th>
                  <th>Ngành</th>
                </tr>
              </thead>
              <tbody>
                {extractedData.students.length > 0 ? (
                  extractedData.students.map((student, index) => (
                    <tr key={index}>
                      <td>{student.id}</td>
                      <td>{student.name}</td>
                      <td>{student.class}</td>
                      <td>{student.major}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4}>
                      <NoDataMessage>Không có dữ liệu sinh viên</NoDataMessage>
                    </td>
                  </tr>
                )}
              </tbody>
            </StyledTable>
          </TableWrapper>
        );
      
      case 'courses':
        return (
          <TableWrapper>
            <StyledTable>
              <thead>
                <tr>
                  <th>Mã môn học</th>
                  <th>Tên môn học</th>
                  <th>Số tín chỉ</th>
                  <th>Khoa</th>
                </tr>
              </thead>
              <tbody>
                {extractedData.courses.length > 0 ? (
                  extractedData.courses.map((course, index) => (
                    <tr key={index}>
                      <td>{course.id}</td>
                      <td>{course.name}</td>
                      <td>{course.credits}</td>
                      <td>{course.department}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4}>
                      <NoDataMessage>Không có dữ liệu môn học</NoDataMessage>
                    </td>
                  </tr>
                )}
              </tbody>
            </StyledTable>
          </TableWrapper>
        );
      
      case 'grades':
        return (
          <TableWrapper>
            <StyledTable>
              <thead>
                <tr>
                  <th>Mã sinh viên</th>
                  <th>Mã môn học</th>
                  <th>Điểm</th>
                  <th>Học kỳ</th>
                </tr>
              </thead>
              <tbody>
                {extractedData.grades.length > 0 ? (
                  extractedData.grades.map((grade, index) => (
                    <tr key={index}>
                      <td>{grade.studentId}</td>
                      <td>{grade.courseId}</td>
                      <td>{grade.value.toFixed(1)}</td>
                      <td>{grade.semester}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4}>
                      <NoDataMessage>Không có dữ liệu điểm</NoDataMessage>
                    </td>
                  </tr>
                )}
              </tbody>
            </StyledTable>
          </TableWrapper>
        );
      
      default:
        return null;
    }
  };

  // Redirect nếu chưa đăng nhập
  if (!isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <PageContainer>
      <Title>Upload Bảng Điểm</Title>
      
      {/* Phần chọn file */}
      <UploadArea $isSuccess={uploadSuccess}>
        <FileInput 
          type="file" 
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".pdf"
        />
        
        {!file ? (
          <UploadButton onClick={handleButtonClick}>
            <Upload size={20} />
            <span>Chọn file PDF bảng điểm</span>
          </UploadButton>
        ) : (
          <FileDetails>
            <div className="file-info">
              <FileText size={20} />
              <span>{file.name}</span>
              <small>({(file.size / 1024).toFixed(1)} KB)</small>
            </div>
            
            <ButtonGroup>
              {!uploadSuccess && !isProcessing && (
                <ControlButton 
                  onClick={validateFile} 
                  disabled={isValidating}
                  color="primary"
                >
                  {isValidating ? (
                    <>
                      <Loader size={16} className="spinner" />
                      <span>Đang kiểm tra...</span>
                    </>
                  ) : (
                    <span>Xử lý PDF</span>
                  )}
                </ControlButton>
              )}
              <ControlButton 
                onClick={resetFile}
                color="danger"
              >
                <X size={16} />
              </ControlButton>
            </ButtonGroup>
          </FileDetails>
        )}
      </UploadArea>
      
      {/* Thông báo lỗi */}
      {validationErrors.length > 0 && (
        <ValidationMessage>
          <AlertTriangle size={16} />
          <div>
            <strong>Lỗi xử lý PDF:</strong>
            <ul>
              {validationErrors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        </ValidationMessage>
      )}
      
      {/* Thông báo xử lý */}
      {isProcessing && (
        <StatusMessage>
          <Loader size={16} className="spinner" />
          <span>Đang trích xuất dữ liệu từ PDF...</span>
        </StatusMessage>
      )}
      
      {/* Phần hiển thị dữ liệu trích xuất */}
      {extractedData && (
        <PreviewContainer>
          <TabsContainer>
            <Tab 
              active={activeTab === 'students'} 
              onClick={() => setActiveTab('students')}
            >
              Sinh viên ({extractedData.students.length})
            </Tab>
            <Tab 
              active={activeTab === 'courses'} 
              onClick={() => setActiveTab('courses')}
            >
              Môn học ({extractedData.courses.length})
            </Tab>
            <Tab 
              active={activeTab === 'grades'} 
              onClick={() => setActiveTab('grades')}
            >
              Điểm số ({extractedData.grades.length})
            </Tab>
          </TabsContainer>
          
          <TabContent>
            {renderTabContent()}
          </TabContent>
          
          <ButtonGroup style={{ marginTop: '1.5rem', justifyContent: 'flex-start' }}>
            <ProcessButton onClick={handleSaveToDatabase}>
              Lưu vào cơ sở dữ liệu
            </ProcessButton>
          </ButtonGroup>
        </PreviewContainer>
      )}
    </PageContainer>
  );
}; 