import React from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import { useTheme } from "../Context/ThemeContext";

const TableUserData = ({ data }) => {
  const { theme } = useTheme();
  const cellStyle = {
    color: theme.textColor,
    textAlign: "center",
  };

  return (
    <div className="table">
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={cellStyle}>WPM</TableCell>
              <TableCell style={cellStyle}>Accuracy</TableCell>
              <TableCell style={cellStyle}>Characters</TableCell>
              <TableCell style={cellStyle}>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            
            {data.map((i) => (
              <TableRow>
                <TableCell style={cellStyle}>{i.wpm}</TableCell>
                <TableCell style={cellStyle}>{i.accuracy}</TableCell>
                <TableCell style={cellStyle}>{i.characters}</TableCell>
                <TableCell style={cellStyle}>
                  {i.timeStamp.toDate().toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TableUserData;
