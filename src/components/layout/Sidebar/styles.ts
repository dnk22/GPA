import styled from "styled-components";

export const SidebarContainer = styled.div`
  width: 250px;
  height: 100%;
  background-color: ${({ theme }) => theme.sidebar};
  border-right: 1px solid ${({ theme }) => theme.border};
  padding: 1rem;
  transition: all 0.2s ease-in-out;
  display: flex;
  flex-direction: column;
`;

export const MenuTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 1.5rem;
  padding: 0.5rem 1rem;
`;

interface MenuItemProps {
  $active?: boolean;
}

export const MenuItem = styled.div<MenuItemProps>`
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  color: ${({ theme, $active }) => ($active ? theme.primary : theme.text)};
  cursor: pointer;
  border-radius: 0.5rem;
  transition: all 0.2s ease-in-out;
  margin-bottom: 0.5rem;
  position: relative;
  font-weight: ${({ $active }) => ($active ? "500" : "normal")};

  /* Tạo hiệu ứng active cho menu */
  background-color: ${({ theme, $active }) =>
    $active
      ? theme.mode === "dark"
        ? "rgba(255, 255, 255, 0.15)"
        : "rgba(0, 0, 0, 0.08)"
      : "transparent"};

  /* Thêm border-left khi active */
  &::before {
    content: "";
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: ${({ $active }) => ($active ? "4px" : "0")};
    background-color: ${({ theme }) => theme.primary};
    border-radius: 0px 0.5rem 0.5rem 0px;
    transition: width 0.2s ease-in-out;
  }

  &:hover {
    background-color: ${({ theme }) =>
      theme.mode === "dark"
        ? "rgba(255, 255, 255, 0.1)"
        : "rgba(0, 0, 0, 0.05)"};
  }

  svg {
    width: 20px;
    height: 20px;
    margin-right: 0.75rem;
    color: ${({ theme, $active }) => ($active ? theme.primary : theme.text)};
    transition: color 0.2s;
  }

  a {
    display: flex;
    align-items: center;
    color: inherit;
    text-decoration: none;
    width: 100%;
  }
`;

export const SidebarFooter = styled.div`
  margin-top: auto;
  border-top: 1px solid ${({ theme }) => theme.border};
  padding-top: 1rem;
`;
