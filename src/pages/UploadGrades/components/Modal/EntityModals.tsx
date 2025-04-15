import EntityModal from './EntityModal';
import { useDataContext } from '../../context/DataContext';
import { Course } from '@/services/firebase/schemas/course';
import { Student } from '@/services/firebase/schemas/student';
import { Grade } from '@/services/firebase/schemas/grade';

/**
 * Component quản lý tất cả modal trong trang
 */
const EntityModals = () => {
  const { 
    activeModal, 
    handleCloseModal, 
    updateData
  } = useDataContext();

  // Handler khi submit dữ liệu từ modal
  const handleCourseSubmit = (data: unknown[]) => {
    updateData('courses', data as Course[]);
    handleCloseModal();
  };

  const handleStudentSubmit = (data: unknown[]) => {
    updateData('students', data as Student[]);
    handleCloseModal();
  };

  const handleGradeSubmit = (data: unknown[]) => {
    updateData('grades', data as Grade[]);
    handleCloseModal();
  };

  return (
    <>
      <EntityModal
        isOpen={activeModal === 'course'}
        title="Thêm học phần"
        onClose={handleCloseModal}
        onSubmit={handleCourseSubmit}
      />

      <EntityModal
        isOpen={activeModal === 'student'}
        title="Thêm sinh viên"
        onClose={handleCloseModal}
        onSubmit={handleStudentSubmit}
      />

      <EntityModal
        isOpen={activeModal === 'grade'}
        title="Thêm điểm số"
        onClose={handleCloseModal}
        onSubmit={handleGradeSubmit}
      />
    </>
  );
};

export default EntityModals; 