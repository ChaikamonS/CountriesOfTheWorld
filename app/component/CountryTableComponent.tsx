import {
  Box,
  Paper,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  TableHead,
} from "@mui/material";
import CountryModel from "../model/CountryModel";
import { useState } from "react";

interface CountryTableComponentProps {
  countryList: Array<CountryModel>;
}

export interface Column {
  key: string;
  label: string;
  minWidth?: number;
  align?: "right" | "left" | "center";
}

const columns: readonly Column[] = [
  { key: "country_name", label: "Country Name", minWidth: 200 },
  {
    key: "capital_city",
    label: "Capital City",
    minWidth: 200,
  },
  {
    key: "country_flag",
    label: "Country Flag",
    align: "center",
  },
];

export default function CountryTableComponent(
  props: CountryTableComponentProps
) {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return props.countryList.length > 0 ? (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 650, width: "100%" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.key}
                  align={column.align}
                  style={{ minWidth: column.minWidth, fontWeight: "bold" }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.countryList
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={row.name?.common}
                >
                  <TableCell key={row.name?.common}>
                    {row.name?.common ?? "-"}
                  </TableCell>
                  <TableCell key={row.name?.common}>
                    {row.capital?.toString() ?? "-"}
                  </TableCell>
                  <TableCell style={{ fontSize: '30px' }} key={row.name?.common} align="center">
                    <img src={row.flags?.png} width={30}></img>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={props.countryList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  ) : (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <div className="emptyPage">Seach not found</div>
    </Paper>
  );
}
