import { Database, PlusCircle, Pencil, ChevronDown, FilePlus } from "lucide-react";
import {
  ActionButtonsContainer,
  MenuContainer,
  MenuButton,
  MenuItem,
} from "../../styles";
import { useDataContext } from "../../context/DataContext";
import { useState, useRef, useEffect } from "react";

/**
 * Component hiển thị menu dạng dropdown cho các tác vụ thêm dữ liệu
 */
const ActionButtons = () => {
  const { handleOpenModal } = useDataContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Đóng menu khi click ngoài menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Xử lý chọn một tùy chọn từ menu
  const handleMenuItemClick = (modalType: "course" | "student" | "grade") => {
    handleOpenModal(modalType);
    setIsMenuOpen(false);
  };

  return (
    <ActionButtonsContainer>
      <MenuContainer ref={menuRef}>
        <MenuButton
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          title="Thêm dữ liệu mới"
        >
          <FilePlus size={18} />
          <span>Thêm dữ liệu thủ công</span>
          <ChevronDown size={16} />
        </MenuButton>

        {isMenuOpen && (
          <div className="menu-dropdown">
            <MenuItem onClick={() => handleMenuItemClick("course")}>
              <Database size={16} />
              <span>Thêm học phần</span>
            </MenuItem>

            <MenuItem onClick={() => handleMenuItemClick("student")}>
              <PlusCircle size={16} />
              <span>Thêm sinh viên</span>
            </MenuItem>

            <MenuItem onClick={() => handleMenuItemClick("grade")}>
              <Pencil size={16} />
              <span>Thêm điểm số</span>
            </MenuItem>
          </div>
        )}
      </MenuContainer>
    </ActionButtonsContainer>
  );
};

export default ActionButtons;
