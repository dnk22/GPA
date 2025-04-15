import { useAuth } from "@/utility/contexts/auth";
import { Navigate } from "react-router-dom";
import {
  PageContainer,
  Title,
  LayoutRow,
  LeftColumn,
  RightColumn,
  PreviewSection,
  SectionTitle,
} from "./styles";

import {
  FileUploadTab,
  ActionButtons,
  EntityModals,
  TabbedPreview,
} from "./components";

import { DataProvider, useDataContext } from "./context/DataContext";

const UploadGrades = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <DataProvider>
      <UploadGradesContent />
    </DataProvider>
  );
};

const UploadGradesContent = () => {
  const { data, setData, hasPreviewData } = useDataContext();

  const handlePdfDataExtracted = (extractedData) => {
    setData(extractedData);
  };

  return (
    <PageContainer>
      <Title>Quản lý dữ liệu học phần và điểm số</Title>

      <LayoutRow>
        <LeftColumn>
          <FileUploadTab onDataExtracted={handlePdfDataExtracted} />
        </LeftColumn>
        <RightColumn>
          <ActionButtons />
        </RightColumn>
      </LayoutRow>

      {/* Preview section */}
      <PreviewSection>
        <SectionTitle>Xem trước dữ liệu</SectionTitle>
        <TabbedPreview 
          students={data.students}
          courses={data.courses}
          grades={data.grades}
          hasData={hasPreviewData}
        />
      </PreviewSection>

      {/* Modals */}
      <EntityModals />
    </PageContainer>
  );
};

export default UploadGrades;
