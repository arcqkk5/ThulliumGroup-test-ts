import { Pagination } from "@mui/material";
import "./pagination.scss";

interface PaginationsProps {
  photosPerPage: number;
  total: number;
  paginate(pageNumber: number): void;
}

export const Paginations: React.FC<PaginationsProps> = ({
  photosPerPage,
  total,
  paginate,
}) => {
  const correctPagination = Math.ceil(total / photosPerPage);

  return (
    <Pagination
      count={correctPagination}
      showFirstButton
      showLastButton
      className="group__pagination"
      onChange={(_, page) => paginate(page)}
    />
  );
};
