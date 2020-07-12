import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function subtotal(items) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

export default function SpanningTable(props) {
  const classes = useStyles();
  const invoiceSubtotal = props.invoiceSubtotal;
  const invoiceTaxes = props.invoiceTaxes;
  const invoiceTotal = props.invoiceTotal;
  const TAX_RATE = props.TAX_RATE;

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={3}>
              التفاصيل
            </TableCell>
            <TableCell align="right">السعر</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>اسم السلعه</TableCell>
            <TableCell align="right">الكمية</TableCell>
            <TableCell align="right">سعر اوحدة</TableCell>
            <TableCell align="right">مجموع السعر</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.state.map((row) => {
            return (
              <TableRow key={row.desc}>
                <TableCell>{row.desc}</TableCell>
                <TableCell align="right">{row.qty}</TableCell>
                <TableCell align="right">{row.unit}</TableCell>
                {/* <TableCell align="right">{ccyFormat(row.price)}</TableCell> */}
                <TableCell align="right">{row.price}</TableCell>
              </TableRow>
            );
          })}

          <TableRow>
            <TableCell rowSpan={3} />
            <TableCell colSpan={2}>المجموع</TableCell>
            <TableCell align="right">{invoiceSubtotal}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>الضريبة</TableCell>
            <TableCell align="right">{`${(TAX_RATE * 100).toFixed(
              0
            )} %`}</TableCell>
            <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>المجموع النهائي</TableCell>
            {/* <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell> */}
            <TableCell align="right">{invoiceTotal}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
