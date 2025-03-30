import { useState, useRef } from 'react';
import { Upload, FileText, CheckCircle } from 'lucide-react';
import { useAuth } from '@/utility/contexts/auth';
import { Navigate } from 'react-router-dom';
import { 
  PageContainer, 
  Title, 
  UploadArea,
  UploadButton,
  FileInput,
  ProcessArea,
  ExtractedDataContainer,
  ProcessButton,
  StatusMessage,
  PreviewContainer,
  PreviewHeader,
  PreviewTable
} from './styles';

// Mock data cho việc extract từ PDF
interface ExtractedStudent {
  studentId: string;
  name: string;
  class: string;
  subjects: {
    code: string;
    name: string;
    credits: number;
    grade: number;
  }[];
}

const UploadGrades = () => {
  const { isAuthenticated } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [extractedData, setExtractedData] = useState<ExtractedStudent | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Redirect nếu chưa đăng nhập
  if (!isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setUploadSuccess(false);
      setExtractedData(null);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    
    // Simulate file upload
    setTimeout(() => {
      setIsUploading(false);
      setUploadSuccess(true);
    }, 1500);

    // Trong triển khai thực tế, bạn sẽ upload file lên Firebase Storage
    // const storageRef = ref(storage, `grades/${file.name}`);
    // await uploadBytes(storageRef, file);
    // const downloadURL = await getDownloadURL(storageRef);
  };

  const handleProcessPDF = () => {
    if (!file || !uploadSuccess) return;

    setIsProcessing(true);

    // Giả lập xử lý PDF và trích xuất dữ liệu
    setTimeout(() => {
      // Mock data - trong triển khai thực tế, bạn sẽ sử dụng thư viện xử lý PDF
      const mockData: ExtractedStudent = {
        studentId: "B19DCCN123",
        name: "Nguyễn Văn A",
        class: "D19CQCN01-B",
        subjects: [
          { code: "INT1449", name: "Phát triển ứng dụng Web", credits: 3, grade: 8.5 },
          { code: "INT1448", name: "Phát triển ứng dụng di động", credits: 3, grade: 9.0 },
          { code: "INT1559", name: "Kiến trúc phần mềm", credits: 3, grade: 7.5 },
          { code: "INT1306", name: "Cơ sở dữ liệu", credits: 3, grade: 8.0 },
        ]
      };
      
      setExtractedData(mockData);
      setIsProcessing(false);
    }, 2000);
  };

  const handleSaveToFirestore = async () => {
    if (!extractedData) return;

    // Tính GPA
    const totalCredits = extractedData.subjects.reduce((sum, subject) => sum + subject.credits, 0);
    const totalGradePoints = extractedData.subjects.reduce(
      (sum, subject) => sum + subject.grade * subject.credits, 0
    );
    const gpa = totalGradePoints / totalCredits;

    // Chuyển đổi format dữ liệu
    const formattedGrades = extractedData.subjects.map(subject => ({
      subjectCode: subject.code,
      subjectName: subject.name,
      credits: subject.credits,
      grade: subject.grade
    }));

    // Tạo student data
    const studentData = {
      studentId: extractedData.studentId,
      name: extractedData.name,
      class: extractedData.class,
      major: "Công nghệ thông tin", // Default for demo
      grades: formattedGrades,
      gpa
    };

    // Simulate saving to Firestore
    alert(`Đã lưu dữ liệu sinh viên ${studentData.name} với GPA: ${gpa.toFixed(2)}`);

    // Reset state
    setFile(null);
    setUploadSuccess(false);
    setExtractedData(null);

    // Trong triển khai thực tế
    // try {
    //   // Thêm hoặc cập nhật sinh viên trong Firestore
    //   const existingStudent = await findStudentByStudentId(studentData.studentId);
    //   if (existingStudent) {
    //     await updateStudentGrades(studentData.studentId, formattedGrades, gpa);
    //   } else {
    //     await addStudent(studentData);
    //   }
    // } catch (error) {
    //   console.error('Error saving student data:', error);
    // }
  };

  return (
    <PageContainer>
      <Title>Upload Bảng Điểm</Title>
      
      <UploadArea $isSuccess={uploadSuccess}>
        <FileInput 
          type="file" 
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".pdf"
        />
        {!file ? (
          <UploadButton onClick={handleButtonClick}>
            <Upload size={24} />
            <span>Chọn file PDF bảng điểm</span>
          </UploadButton>
        ) : (
          <div className="file-info">
            <FileText size={24} />
            <span>{file.name}</span>
            {!uploadSuccess && (
              <UploadButton 
                onClick={handleUpload} 
                disabled={isUploading}
              >
                {isUploading ? 'Đang tải...' : 'Tải lên'}
              </UploadButton>
            )}
            {uploadSuccess && (
              <StatusMessage>
                <CheckCircle size={16} />
                <span>Đã tải lên</span>
              </StatusMessage>
            )}
          </div>
        )}
      </UploadArea>
      
      {uploadSuccess && (
        <ProcessArea>
          <ProcessButton 
            onClick={handleProcessPDF} 
            disabled={isProcessing}
          >
            {isProcessing ? 'Đang xử lý...' : 'Xử lý và trích xuất dữ liệu'}
          </ProcessButton>
        </ProcessArea>
      )}
      
      {extractedData && (
        <ExtractedDataContainer>
          <PreviewHeader>
            <h3>Thông tin trích xuất từ PDF</h3>
            <div>
              <p><strong>Mã sinh viên:</strong> {extractedData.studentId}</p>
              <p><strong>Họ tên:</strong> {extractedData.name}</p>
              <p><strong>Lớp:</strong> {extractedData.class}</p>
            </div>
          </PreviewHeader>
          
          <PreviewContainer>
            <h4>Bảng điểm</h4>
            <PreviewTable>
              <thead>
                <tr>
                  <th>Mã môn</th>
                  <th>Tên môn</th>
                  <th>Số tín chỉ</th>
                  <th>Điểm</th>
                </tr>
              </thead>
              <tbody>
                {extractedData.subjects.map((subject, index) => (
                  <tr key={index}>
                    <td>{subject.code}</td>
                    <td>{subject.name}</td>
                    <td>{subject.credits}</td>
                    <td>{subject.grade.toFixed(1)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={2}><strong>Tổng cộng</strong></td>
                  <td>{extractedData.subjects.reduce((sum, s) => sum + s.credits, 0)}</td>
                  <td>
                    <strong>GPA: </strong>
                    {(extractedData.subjects.reduce((sum, s) => sum + s.grade * s.credits, 0) / 
                      extractedData.subjects.reduce((sum, s) => sum + s.credits, 0)).toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            </PreviewTable>
            
            <ProcessButton onClick={handleSaveToFirestore}>
              Lưu vào cơ sở dữ liệu
            </ProcessButton>
          </PreviewContainer>
        </ExtractedDataContainer>
      )}
    </PageContainer>
  );
};

export default UploadGrades; 