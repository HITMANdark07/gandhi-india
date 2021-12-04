import React from "react";
import Header from "../../components/Header";
import Table from '@mui/material/Table';
import { styled } from '@mui/material/styles';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

function ManageOrders() {
    React.useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }, [])
    
  return (
      <>
      <Header/>
    <div style={{marginTop:"90px", width:"90%", margin:"80px auto"}}>
        <h2>MANAGE ORDERS</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Order number</StyledTableCell>
              <StyledTableCell align="right">Order Date</StyledTableCell>
              <StyledTableCell align="right">Customer Name</StyledTableCell>
              <StyledTableCell align="right">Order Status</StyledTableCell>
              <StyledTableCell align="right">Agent code</StyledTableCell>
              <StyledTableCell align="right">Agent Name</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* ------------------------   table dumm data  ---------------------------------- */}
            <StyledTableRow>
            <StyledTableCell component="th" scope="row">
                Dummy-data
            </StyledTableCell>
            <StyledTableCell align="right">Dummy-data</StyledTableCell>
            <StyledTableCell align="right">Dummy-data</StyledTableCell>
            <StyledTableCell align="right">Dummy-data</StyledTableCell>
            <StyledTableCell align="right">Dummy-data</StyledTableCell>
            <StyledTableCell align="right">Dummy-data</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
            <StyledTableCell component="th" scope="row">
                Dummy-data
            </StyledTableCell>
            <StyledTableCell align="right">Dummy-data</StyledTableCell>
            <StyledTableCell align="right">Dummy-data</StyledTableCell>
            <StyledTableCell align="right">Dummy-data</StyledTableCell>
            <StyledTableCell align="right">Dummy-data</StyledTableCell>
            <StyledTableCell align="right">Dummy-data</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
            <StyledTableCell component="th" scope="row">
                Dummy-data
            </StyledTableCell>
            <StyledTableCell align="right">Dummy-data</StyledTableCell>
            <StyledTableCell align="right">Dummy-data</StyledTableCell>
            <StyledTableCell align="right">Dummy-data</StyledTableCell>
            <StyledTableCell align="right">Dummy-data</StyledTableCell>
            <StyledTableCell align="right">Dummy-data</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
            <StyledTableCell component="th" scope="row">
                Dummy-data
            </StyledTableCell>
            <StyledTableCell align="right">Dummy-data</StyledTableCell>
            <StyledTableCell align="right">Dummy-data</StyledTableCell>
            <StyledTableCell align="right">Dummy-data</StyledTableCell>
            <StyledTableCell align="right">Dummy-data</StyledTableCell>
            <StyledTableCell align="right">Dummy-data</StyledTableCell>
            </StyledTableRow>
            {/* ------------------------   table dumm data  ---------------------------------- */}
            {/* {rows.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="right">{row.calories}</StyledTableCell>
                <StyledTableCell align="right">{row.fat}</StyledTableCell>
                <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                <StyledTableCell align="right">{row.protein}</StyledTableCell>
              </StyledTableRow>
            ))} */}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
    </>
  );
}

export default ManageOrders;
