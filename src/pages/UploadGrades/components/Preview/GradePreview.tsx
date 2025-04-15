import { PreviewContainer, PreviewTable } from '../../styles';
import { Grade } from '@/services/firebase/schemas/grade';

interface GradePreviewProps {
  data: Grade[];
}

const GradePreview = ({ data }: GradePreviewProps) => {
  if (!data || data.length === 0) {
    return <div>Không có dữ liệu điểm số</div>;
  }

  return (
    <PreviewContainer>
      <h4>Danh sách điểm số</h4>
      <PreviewTable>
        <thead>
          <tr>
            <th>Mã sinh viên</th>
            <th>Mã học phần</th>
            <th>Học kỳ</th>
            <th>Điểm số</th>
            <th>Điểm thành phần</th>
            <th>Ghi chú</th>
          </tr>
        </thead>
        <tbody>
          {data.map((grade, index) => (
            <tr key={index}>
              <td>{grade.studentId}</td>
              <td>{grade.courseId}</td>
              <td>{grade.semester}</td>
              <td>{grade.finalScore.toFixed(1)}</td>
              <td>
                {grade.componentScores ? (
                  <div>
                    <div>CC: {grade.componentScores.attendance}</div>
                    <div>TBKT: {grade.componentScores.midterm}</div>
                    <div>BTTL: {grade.componentScores.assignment}</div>
                    <div>Thi: {grade.componentScores.finalExam}</div>
                  </div>
                ) : (
                  "N/A"
                )}
              </td>
              <td>{grade.notes || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </PreviewTable>
    </PreviewContainer>
  );
};

export default GradePreview; 