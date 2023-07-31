import { Box, TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material";
import React from "react";

interface Data {
  staff: boolean;
  status: boolean;
  phoneNumber: number;
  passBookNumber: string;
  firstName: string;
  branchId: string;
}
type Order = "asc" | "desc";
interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}
interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "firstName",
    numeric: false,
    disablePadding: true,
    label: "Member Name",
  },
  {
    id: "passBookNumber",
    numeric: true,
    disablePadding: false,
    label: "PassBook Id",
  },
  {
    id: "phoneNumber",
    numeric: true,
    disablePadding: false,
    label: "Phone Number",
  },
  {
    id: "status",
    numeric: true,
    disablePadding: false,
    label: "Status",
  },
  {
    id: "staff",
    numeric: true,
    disablePadding: false,
    label: "Staff",
  },
  {
    id: "branchId",
    numeric: true,
    disablePadding: false,
    label: "Branch",
  },
];

const EnhancedTableHead = (props:EnhancedTableProps) => {
    const {
      onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount,
      onRequestSort,
    } = props;
    const createSortHandler =
      (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
      };
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            className="px-6 py-3 ml-8 text-center text-xs font-medium color: rgb(0 0 0) bg-gray-100 uppercase tracking-wider"
            key={headCell.id}
            align="left"
            sortDirection={orderBy === headCell.id ? order : false}
            // sx={{ backgroundColor: "white" }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default EnhancedTableHead;
