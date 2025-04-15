import { useState, useRef } from "react";
import { Upload, FileText } from "lucide-react";
import {
  UploadArea,
  FileInput,
  UploadButton,
  ProcessButton,
} from "../../styles";
import { Course } from "@/services/firebase/schemas/course";
import { Student } from "@/services/firebase/schemas/student";
import { Grade } from "@/services/firebase/schemas/grade";
import { AppData } from "../../context/DataContext";
import { Timestamp } from "firebase/firestore";

// Dữ liệu trích xuất từ PDF
export interface ExtractedStudent {
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

interface FileUploadTabProps {
  onDataExtracted: (data: AppData) => void;
}

const FileUploadTab = ({ onDataExtracted }: FileUploadTabProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setUploadSuccess(false);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleProcessPDF = () => {
    if (!file) return;

    setIsProcessing(true);

    // Giả lập xử lý PDF và trích xuất dữ liệu
    setTimeout(() => {
      // Dữ liệu giả lập PDF
      const extractedData: ExtractedStudent = {
        studentId: "B19DCCN123",
        name: "Nguyễn Văn A",
        class: "D19CQCN01-B",
        subjects: [
          {
            code: "INT1449",
            name: "Phát triển ứng dụng Web",
            credits: 3,
            grade: 8.5,
          },
          {
            code: "INT1448",
            name: "Phát triển ứng dụng di động",
            credits: 3,
            grade: 9.0,
          },
          {
            code: "INT1559",
            name: "Kiến trúc phần mềm",
            credits: 3,
            grade: 7.5,
          },
          { code: "INT1306", name: "Cơ sở dữ liệu", credits: 3, grade: 8.0 },
        ],
      };

      // Chuyển đổi dữ liệu trích xuất thành định dạng AppData
      const courses: Course[] = extractedData.subjects.map((subject) => ({
        courseId: subject.code,
        name: subject.name,
        credits: subject.credits,
      }));

      const student: Student = {
        id: Date.now().toString(), // Tạo ID tạm thời
        studentId: extractedData.studentId,
        name: extractedData.name,
        class: extractedData.class,
        grades: extractedData.subjects.map((subject) => ({
          subjectCode: subject.code,
          subjectName: subject.name,
          credits: subject.credits,
          finalScore: subject.grade,
        })),
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      };

      const grades: Grade[] = extractedData.subjects.map((subject) => ({
        studentId: extractedData.studentId,
        courseId: subject.code,
        finalScore: subject.grade,
        semester: "20231", // Default semester
        notes: "",
        componentScores: {
          attendance: 0,
          midterm: 0,
          assignment: 0,
          finalExam: subject.grade.toString(),
        },
      }));

      // Tạo dữ liệu hợp nhất
      const appData: AppData = {
        courses,
        students: [student],
        grades,
      };

      onDataExtracted(appData);
      setIsProcessing(false);
      setUploadSuccess(true);
    }, 2000);
  };

  return (
    <UploadArea $isSuccess={uploadSuccess}>
      {!file ? (
        <UploadButton onClick={handleButtonClick}>
          <Upload size={24} />
          <span>Chọn file PDF bảng điểm</span>
        </UploadButton>
      ) : (
        <div className="file-info">
          <FileText size={24} />
          <span>{file.name}</span>
          <ProcessButton onClick={handleProcessPDF} disabled={isProcessing}>
            {isProcessing ? "Đang xử lý..." : "Xử lý và trích xuất dữ liệu"}
          </ProcessButton>
        </div>
      )}
      <FileInput
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".pdf"
      />
    </UploadArea>
  );
};

export default FileUploadTab;
