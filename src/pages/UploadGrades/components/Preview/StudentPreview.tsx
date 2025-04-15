import { PreviewContainer, PreviewTable } from '../../styles';
import { Student } from '@/services/firebase/schemas/student';

interface StudentPreviewProps {
  data: Student[];
}

const StudentPreview = ({ data }: StudentPreviewProps) => {
  if (!data || data.length === 0) {
    return <div>Không có dữ liệu sinh viên</div>;
  }

  return (
    <PreviewContainer>
      <h4>Danh sách sinh viên</h4>
      <PreviewTable>
        <thead>
          <tr>
            <th>Mã sinh viên</th>
            <th>Họ và tên</th>
            <th>Lớp</th>
          </tr>
        </thead>
        <tbody>
          {data.map((student, index) => (
            <tr key={index}>
              <td>{student.studentId}</td>
              <td>{student.name}</td>
              <td>{student.class}</td>
            </tr>
          ))}
        </tbody>
      </PreviewTable>
    </PreviewContainer>
  );
};

export default StudentPreview; 