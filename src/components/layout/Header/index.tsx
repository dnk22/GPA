import { Moon, Sun, Menu } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import {
  HeaderContainer,
  HeaderTitle,
  ThemeToggle,
  ToggleThumb,
  HeaderLeft,
  MobileMenuButton
} from "./styles";
import { useTheme } from "@/utility/contexts";

interface HeaderProps {
  onMenuToggle?: () => void;
}

export const Header = ({ onMenuToggle }: HeaderProps) => {
  const { themeMode, toggleTheme } = useTheme();
  const [rippleActive, setRippleActive] = useState(false);
  const [ripplePosition, setRipplePosition] = useState({ x: 0, y: 0 });
  const toggleRef = useRef<HTMLDivElement>(null);
  const rippleContainerRef = useRef<HTMLDivElement>(null);
  const targetTheme = themeMode === "dark" ? "light" : "dark";

  const handleToggleTheme = () => {
    const toggleElement = toggleRef.current;
    if (toggleElement) {
      const rect = toggleElement.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      setRipplePosition({ x, y });
      setRippleActive(true);

      setTimeout(() => {
        setRippleActive(false);
      }, 1000);

      setTimeout(() => {
        toggleTheme();
      }, 500);
    }
  };

  useEffect(() => {
    if (!rippleActive || !rippleContainerRef.current) return;

    const rippleContainer = rippleContainerRef.current;
    const ripple = document.createElement("div");
    ripple.className = `theme-ripple ${targetTheme}-ripple`;

    const size = Math.max(window.innerWidth, window.innerHeight) * 2;

    ripple.style.width = `${size}px`;
    ripple.style.height = `${size}px`;
    ripple.style.left = `${ripplePosition.x - size / 2}px`;
    ripple.style.top = `${ripplePosition.y - size / 2}px`;

    rippleContainer.appendChild(ripple);

    const timer = setTimeout(() => {
      if (ripple.parentNode === rippleContainer) {
        rippleContainer.removeChild(ripple);
      }
    }, 1800);

    return () => {
      clearTimeout(timer);
      if (ripple.parentNode === rippleContainer) {
        rippleContainer.removeChild(ripple);
      }
    };
  }, [rippleActive, ripplePosition, targetTheme]);

  return (
    <>
      <HeaderContainer>
        <HeaderLeft>
          <MobileMenuButton onClick={onMenuToggle}>
            <Menu size={24} />
          </MobileMenuButton>
          <HeaderTitle>GPA Management System</HeaderTitle>
        </HeaderLeft>
        <ThemeToggle ref={toggleRef} onClick={handleToggleTheme}>
          <ToggleThumb>
            {themeMode === "dark" ? <Moon size={12} /> : <Sun size={12} />}
          </ToggleThumb>
        </ThemeToggle>
      </HeaderContainer>

      <div className="theme-ripple-container" ref={rippleContainerRef}></div>
    </>
  );
};
