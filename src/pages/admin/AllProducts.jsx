import React from "react";
import Header from "../../components/Header";
import {withRouter} from "react-router-dom";
import Table from "@mui/material/Table";
import { styled } from "@mui/material/styles";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Button } from "@mui/material";

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
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function AllProducts({history}) {
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <Header />
      <div style={{ marginTop: "90px", width: "90%", margin: "80px auto" }}>
        <h2>Products</h2>
        <TableContainer component={Paper}>
            <div style={{margin:"0 auto",display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                <h2 style={{paddingLeft:"15px"}}>List of Products</h2>
                <Button
                variant="contained"
                startIcon={<AddCircleOutlineIcon />}
              >
                ADD PRODUCT
              </Button>
            </div>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Thumbnail</StyledTableCell>
                <StyledTableCell align="right">Name</StyledTableCell>
                <StyledTableCell align="right">Feature Product</StyledTableCell>
                <StyledTableCell align="right">SKU</StyledTableCell>
                <StyledTableCell align="right">Stock Status</StyledTableCell>
                <StyledTableCell align="right">Regular Price</StyledTableCell>
                <StyledTableCell align="right">Sales Price</StyledTableCell>
                <StyledTableCell align="right">Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* ------------------------   table dumm data  ---------------------------------- */}
              <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  <img
                    src={
                      "https://image.shutterstock.com/image-illustration/mobile-devices-wireless-communication-technology-260nw-136413251.jpg"
                    }
                    alt="asdasdsdad"
                    width="35px"
                    height="35px"
                  />
                </StyledTableCell>
                <StyledTableCell align="right">Plasma LED</StyledTableCell>
                <StyledTableCell align="right"><input type="checkbox" /></StyledTableCell>
                <StyledTableCell align="right">1234</StyledTableCell>
                <StyledTableCell align="right">In Stock</StyledTableCell>
                <StyledTableCell align="right">12000.00</StyledTableCell>
                <StyledTableCell align="right">10000.00</StyledTableCell>
                <StyledTableCell align="right">
                    <EditIcon button style={{ cursor: "pointer" }} onClick={() => history.push(`/admin/update-product/asdsadsa`)} />{" "}
                    <DeleteForeverIcon style={{ cursor: "pointer" }} />{" "}
                  </StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  <img
                    src={
                      "https://image.shutterstock.com/image-illustration/mobile-devices-wireless-communication-technology-260nw-136413251.jpg"
                    }
                    alt="asdasdsdad"
                    width="35px"
                    height="35px"
                  />
                </StyledTableCell>
                <StyledTableCell align="right">Plasma LED</StyledTableCell>
                <StyledTableCell align="right"><input type="checkbox" /></StyledTableCell>
                <StyledTableCell align="right">1234</StyledTableCell>
                <StyledTableCell align="right">In Stock</StyledTableCell>
                <StyledTableCell align="right">12000.00</StyledTableCell>
                <StyledTableCell align="right">10000.00</StyledTableCell>
                <StyledTableCell align="right">
                    <EditIcon button style={{ cursor: "pointer" }} onClick={() => history.push(`/admin/update-product/asdsadsa`)} />{" "}
                    <DeleteForeverIcon style={{ cursor: "pointer" }} />{" "}
                  </StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  <img
                    src={
                      "https://image.shutterstock.com/image-illustration/mobile-devices-wireless-communication-technology-260nw-136413251.jpg"
                    }
                    alt="asdasdsdad"
                    width="35px"
                    height="35px"
                  />
                </StyledTableCell>
                <StyledTableCell align="right">Plasma LED</StyledTableCell>
                <StyledTableCell align="right"><input type="checkbox" /></StyledTableCell>
                <StyledTableCell align="right">1234</StyledTableCell>
                <StyledTableCell align="right">In Stock</StyledTableCell>
                <StyledTableCell align="right">12000.00</StyledTableCell>
                <StyledTableCell align="right">10000.00</StyledTableCell>
                <StyledTableCell align="right">
                    <EditIcon button style={{ cursor: "pointer" }} onClick={() => history.push(`/admin/update-product/asdsadsa`)} />{" "}
                    <DeleteForeverIcon style={{ cursor: "pointer" }} />{" "}
                  </StyledTableCell>
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

export default withRouter(AllProducts);
