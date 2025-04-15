import { useState } from "react";
import { Header } from "../Header";
import { Sidebar } from "../Sidebar";
import { LayoutContainer, MainContent, ContentArea } from "./styles";

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <LayoutContainer>
      <Sidebar className={isMobileMenuOpen ? "open" : ""} />
      <MainContent>
        <Header onMenuToggle={handleMenuToggle} />
        <ContentArea>{children}</ContentArea>
      </MainContent>
    </LayoutContainer>
  );
};
