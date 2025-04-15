import { useState, useEffect } from "react";
import styled from "styled-components";
import { Student } from "@/services/firebase/schemas/student";
import { Course } from "@/services/firebase/schemas/course";
import { Grade } from "@/services/firebase/schemas/grade";
import StudentPreview from "./StudentPreview";
import CoursePreview from "./CoursePreview";
import GradePreview from "./GradePreview";
import { SaveDataPanel } from "../Actions";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const TabsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  margin-bottom: 1rem;
`;

const Tab = styled.button<{ $active?: boolean }>`
  padding: 0.75rem 1rem;
  background: none;
  border: none;
  border-radius: 0px;
  border-bottom: 2px solid
    ${({ $active, theme }) => ($active ? theme.primary : "transparent")};
  color: ${({ $active, theme }) => ($active ? theme.primary : theme.text)};
  font-weight: ${({ $active }) => ($active ? "600" : "400")};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const TableWrapper = styled.div`
  max-height: 500px;
  overflow-y: auto;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;

  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) =>
      theme.mode === "dark"
        ? "rgba(255, 255, 255, 0.1)"
        : "rgba(0, 0, 0, 0.1)"};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) =>
      theme.mode === "dark"
        ? "rgba(255, 255, 255, 0.2)"
        : "rgba(0, 0, 0, 0.2)"};
    border-radius: 4px;

    &:hover {
      background: ${({ theme }) =>
        theme.mode === "dark"
          ? "rgba(255, 255, 255, 0.3)"
          : "rgba(0, 0, 0, 0.3)"};
    }
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: ${({ theme }) => theme.background};
`;

const Thead = styled.thead`
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: ${({ theme }) =>
    theme.mode === "dark" ? "#1a1a1a" : "#f8f9fa"};

  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    border-bottom: 1px solid ${({ theme }) => theme.border};
  }
`;

const Th = styled.th`
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
`;

const Td = styled.td`
  padding: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  color: ${({ theme }) => theme.text};
`;

const EmptyState = styled.div`
  padding: 2rem;
  text-align: center;
  color: ${({ theme }) => theme.secondary};
`;

interface TabbedPreviewProps {
  students: Student[];
  courses: Course[];
  grades: Grade[];
  hasData: boolean;
}

const TabbedPreview = ({
  students,
  courses,
  grades,
  hasData,
}: TabbedPreviewProps) => {
  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    if (students.length > 0) {
      setActiveTab("students");
    } else if (courses.length > 0) {
      setActiveTab("courses");
    } else if (grades.length > 0) {
      setActiveTab("grades");
    }
  }, [students.length, courses.length, grades.length]);

  if (!hasData) {
    return (
      <EmptyState>
        Chưa có dữ liệu. Vui lòng tải lên tập tin hoặc nhập dữ liệu mới.
      </EmptyState>
    );
  }

  return (
    <Container>
      <TabsContainer>
        <div>
          {students.length > 0 && (
            <Tab
              $active={activeTab === "students"}
              onClick={() => setActiveTab("students")}
            >
              Sinh viên ({students.length})
            </Tab>
          )}
          {courses.length > 0 && (
            <Tab
              $active={activeTab === "courses"}
              onClick={() => setActiveTab("courses")}
            >
              Học phần ({courses.length})
            </Tab>
          )}
          {grades.length > 0 && (
            <Tab
              $active={activeTab === "grades"}
              onClick={() => setActiveTab("grades")}
            >
              Điểm số ({grades.length})
            </Tab>
          )}
        </div>
        <SaveDataPanel />
      </TabsContainer>

      <TableWrapper>
        <Table>
          {activeTab === "students" && <StudentPreview data={students} />}

          {activeTab === "courses" && <CoursePreview data={courses} />}

          {activeTab === "grades" && <GradePreview data={grades} />}
        </Table>
      </TableWrapper>
    </Container>
  );
};

export default TabbedPreview;
