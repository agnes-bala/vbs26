import PropTypes from 'prop-types';


import {
  Card,
  Table,
 
  TableRow,
  TableBody,
  TableCell,
  CardHeader,
  TableContainer,
} from '@mui/material';
// utils

import Scrollbar from '../../../../components/Scrollbar';
import {  TableHeadCustom } from '../../../../components/table';

// ----------------------------------------------------------------------

TableList.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  tableData: PropTypes.object.isRequired,
  tableLabels: PropTypes.array.isRequired,
};

export default function TableList({ title, subheader, tableData, tableLabels, ...other }) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} sx={{ mb: 3 }} />

      <Scrollbar>
        <TableContainer sx={{ minWidth: 720 }}>
          <Table>
            <TableHeadCustom headLabel={tableLabels} />

            <TableBody>
              {tableData.map((row) => (
                <AppNewInvoiceRow key={row.ChildName} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>

    </Card>
  );
}

// ----------------------------------------------------------------------

AppNewInvoiceRow.propTypes = {
  row: PropTypes.shape({
    ChildName: PropTypes.string,
    ParentName: PropTypes.string,
    Country: PropTypes.string,
    State: PropTypes.string,
    District: PropTypes.string,
  }),
};

function AppNewInvoiceRow({ row }) {


  return (
    <TableRow>
      <TableCell>{row.ChildName}</TableCell>

      <TableCell>{row.ParentName}</TableCell>

      <TableCell>{row.District}</TableCell>

      <TableCell>{row.State}</TableCell>

      <TableCell>{row.Country}</TableCell>

      

      
    </TableRow>
  );
}
