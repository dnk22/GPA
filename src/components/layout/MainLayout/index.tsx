import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { LayoutContainer, MainContent, ContentArea } from './styles';

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <LayoutContainer>
      <Sidebar />
      <MainContent>
        <Header />
        <ContentArea>{children}</ContentArea>
      </MainContent>
    </LayoutContainer>
  );
}; 