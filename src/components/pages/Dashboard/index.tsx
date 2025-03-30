import { useState, useEffect } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  createColumnHelper,
  flexRender,
  SortingState,
} from '@tanstack/react-table';
import { Search } from 'lucide-react';
import { Student } from '@/services/firebase/schemas/student';
import { getAllStudents, searchStudents } from '@/services/firebase/models/student';
import { PageContainer, Title, SearchBar, SearchInput, SearchButton, TableContainer, StyledTable, Pagination, PaginationButton } from './styles';

// Column helper với type Student
const columnHelper = createColumnHelper<Student>();

// Columns cho bảng sinh viên
const columns = [
  columnHelper.accessor('studentId', {
    header: 'Mã sinh viên',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('name', {
    header: 'Họ và tên',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('class', {
    header: 'Lớp',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('major', {
    header: 'Ngành',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('gpa', {
    header: 'GPA',
    cell: info => info.getValue() ? info.getValue().toFixed(2) : 'N/A',
  }),
  columnHelper.accessor('updatedAt', {
    header: 'Cập nhật',
    cell: info => {
      const date = info.getValue();
      if (!date) return 'N/A';
      if (typeof date === 'string') {
        return new Date(date).toLocaleDateString('vi-VN');
      }
      // Handle Firestore Timestamp if necessary
      if (date instanceof Date) {
        return date.toLocaleDateString('vi-VN');
      }
      return 'N/A';
    },
  }),
];

export const Dashboard = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);
  const [loading, setLoading] = useState(true);

  // Lấy danh sách sinh viên khi component mount
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await getAllStudents();
        setStudents(data);
      } catch (error) {
        console.error('Error fetching students:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  // Xử lý tìm kiếm
  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      // Nếu không có từ khóa tìm kiếm, lấy tất cả sinh viên
      try {
        const data = await getAllStudents();
        setStudents(data);
      } catch (error) {
        console.error('Error fetching all students:', error);
      }
      return;
    }

    try {
      setLoading(true);
      // Logic đơn giản: tìm theo student ID hoặc tên
      const result = await searchStudents({
        ...(searchTerm.match(/^\d+$/) ? { studentId: searchTerm } : { name: searchTerm })
      });
      setStudents(result);
    } catch (error) {
      console.error('Error searching students:', error);
    } finally {
      setLoading(false);
    }
  };

  // Tạo table instance với react-table
  const table = useReactTable({
    data: students,
    columns,
    state: { 
      sorting
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <PageContainer>
      <Title>Danh sách sinh viên</Title>
      
      <SearchBar>
        <SearchInput 
          type="text" 
          placeholder="Tìm kiếm theo mã sinh viên hoặc tên..." 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <SearchButton onClick={handleSearch}>
          <Search size={20} />
        </SearchButton>
      </SearchBar>
      
      <TableContainer>
        {loading ? (
          <div>Đang tải dữ liệu...</div>
        ) : students.length === 0 ? (
          <div>Không tìm thấy sinh viên nào</div>
        ) : (
          <StyledTable>
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th 
                      key={header.id} 
                      onClick={header.column.getToggleSortingHandler()}
                      style={{ cursor: 'pointer' }}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {{
                        asc: ' 🔼',
                        desc: ' 🔽',
                      }[header.column.getIsSorted() as string] ?? null}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map(row => (
                <tr key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </StyledTable>
        )}
      </TableContainer>
      
      <Pagination>
        <PaginationButton 
          onClick={() => table.previousPage()} 
          disabled={!table.getCanPreviousPage()}
        >
          Trang trước
        </PaginationButton>
        <span>
          Trang {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
        </span>
        <PaginationButton 
          onClick={() => table.nextPage()} 
          disabled={!table.getCanNextPage()}
        >
          Trang sau
        </PaginationButton>
      </Pagination>
    </PageContainer>
  );
}; 