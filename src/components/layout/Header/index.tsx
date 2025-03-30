import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/utility/contexts";
import {
  HeaderContainer,
  HeaderTitle,
  ThemeToggle,
  ToggleThumb,
} from "./styles";
import { useRef, useState, useEffect } from "react";

export const Header = () => {
  const { themeMode, toggleTheme } = useTheme();
  const [rippleActive, setRippleActive] = useState(false);
  const [ripplePosition, setRipplePosition] = useState({ x: 0, y: 0 });
  const [targetTheme, setTargetTheme] = useState<"light" | "dark">("light");
  const toggleRef = useRef<HTMLDivElement>(null);
  const rippleContainerRef = useRef<HTMLDivElement>(null);

  // Xử lý hiệu ứng ripple khi toggle theme
  const handleToggleTheme = () => {
    const toggleElement = toggleRef.current;
    if (toggleElement) {
      // Xác định theme đích
      const newTargetTheme = themeMode === "dark" ? "light" : "dark";
      setTargetTheme(newTargetTheme);

      // Tính toán vị trí của toggle trong viewport
      const rect = toggleElement.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      // Lưu vị trí của ripple
      setRipplePosition({ x, y });

      // Kích hoạt ripple effect
      setRippleActive(true);

      // Sau khi hiệu ứng hoàn thành, reset trạng thái
      setTimeout(() => {
        setRippleActive(false);
      }, 1000);

      // Thay đổi theme sau một khoảng thời gian ngắn để hiệu ứng ripple bắt đầu
      setTimeout(() => {
        toggleTheme();
      }, 500);
    }
  };

  // Tạo phần tử ripple
  useEffect(() => {
    if (!rippleActive || !rippleContainerRef.current) return;

    const ripple = document.createElement("div");
    // Thêm theme đích vào class name để CSS có thể áp dụng màu đúng
    ripple.className = `theme-ripple ${targetTheme}-ripple`;

    // Tính toán kích thước ban đầu của ripple
    const size = Math.max(window.innerWidth, window.innerHeight) * 2;

    // Thiết lập vị trí và kích thước
    ripple.style.width = `${size}px`;
    ripple.style.height = `${size}px`;
    ripple.style.left = `${ripplePosition.x - size / 2}px`;
    ripple.style.top = `${ripplePosition.y - size / 2}px`;

    // Thêm ripple vào container
    rippleContainerRef.current.appendChild(ripple);

    // Xóa ripple sau khi animation kết thúc
    const timer = setTimeout(() => {
      if (
        rippleContainerRef.current &&
        ripple.parentNode === rippleContainerRef.current
      ) {
        rippleContainerRef.current.removeChild(ripple);
      }
    }, 1800);

    // Cleanup function
    return () => {
      clearTimeout(timer);
      if (
        rippleContainerRef.current &&
        ripple.parentNode === rippleContainerRef.current
      ) {
        rippleContainerRef.current.removeChild(ripple);
      }
    };
  }, [rippleActive, ripplePosition, targetTheme]);

  return (
    <>
      <HeaderContainer>
        <HeaderTitle>GPA Management System</HeaderTitle>
        <ThemeToggle ref={toggleRef} onClick={handleToggleTheme}>
          <ToggleThumb>
            {themeMode === "dark" ? <Moon size={12} /> : <Sun size={12} />}
          </ToggleThumb>
        </ThemeToggle>
      </HeaderContainer>

      {/* Container cho ripple effect */}
      <div className="theme-ripple-container" ref={rippleContainerRef}></div>
    </>
  );
};
