import { PreviewContainer, PreviewTable } from '../../styles';
import { Course } from '@/services/firebase/schemas/course';

interface CoursePreviewProps {
  data: Course[];
}

const CoursePreview = ({ data }: CoursePreviewProps) => {
  if (!data || data.length === 0) {
    return <div>Không có dữ liệu học phần</div>;
  }

  return (
    <PreviewContainer>
      <h4>Danh sách học phần</h4>
      <PreviewTable>
        <thead>
          <tr>
            <th>Mã học phần</th>
            <th>Tên học phần</th>
            <th>Số tín chỉ</th>
            <th>Học kỳ</th>
            <th>Ngày thi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((course, index) => (
            <tr key={index}>
              <td>{course.courseId}</td>
              <td>{course.name}</td>
              <td>{course.credits}</td>
              <td>{course.semester || "N/A"}</td>
              <td>{course.dateExam || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </PreviewTable>
    </PreviewContainer>
  );
};

export default CoursePreview; 