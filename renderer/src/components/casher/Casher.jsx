import React from 'react';
import { ipcRenderer } from 'electron';
import { Container, Grid, TextField, Button, Divider } from '@material-ui/core';
import SpanningTable from './Other';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const TAX_RATE = 0.07;

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  centerX: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

function taxAmount(TAX_RATE, invoiceSubtotal) {
  return TAX_RATE * invoiceSubtotal;
}

function subtotal(items) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

function priceRow(qty, unit) {
  return qty * unit;
}

function createRow(desc, qty, unit) {
  const price = priceRow(qty, unit);
  return { desc, qty, unit, price };
}

function Casher() {
  const classes = useStyles();
  const [snakbar, setSnakbar] = React.useState(false);
  const [invoiceSubtotal, setInvoiceSubtotal] = React.useState(0);
  const [invoiceTaxes, setInvoiceTaxes] = React.useState(0);
  const [invoiceTotal, setInvoiceTotal] = React.useState(0);

  const [auto, setAuto] = React.useState('اوتوماتيكي');
  const [input, setInput] = React.useState('');
  const [inputNum, setInputNum] = React.useState('');
  const [state, setState] = React.useState([
    // { desc: 'product', qty: 10, unit: 100, price: 1000 },
  ]);
  const onSubmit = async () => {
    const data = await ipcRenderer.invoke('product/read/barcode', input.trim());
    if (data === null) {
      setInput('');
      setInputNum('');
      setSnakbar(true);
      return;
    }
    const newState = [];

    let newRow = true;
    const orderQty = inputNum ? inputNum : 1;
    const row = createRow(data.name, orderQty, data.retailPrice);
    if (state.length === 0) {
      newState.push(row);
    } else {
      state.map(async (value, i) => {
        if (value.desc === data.name) {
          newRow = false;
          value.qty = value.qty + row.qty;
          value.price = value.unit * value.qty;
          newState.push(value);
        } else if (i === state.length - 1 && newRow) {
          newState.push(value);
          newState.push(row);
        } else {
          newState.push(value);
        }
      });
    }

    let subT = subtotal(newState);
    let taxT = taxAmount(TAX_RATE, subT);
    let invT = taxT + subT;

    subT = await ipcRenderer.invoke('nwc', subT);
    invT = await ipcRenderer.invoke('nwc', invT);
    setInvoiceSubtotal(subT);
    setInvoiceTaxes(taxT);
    setInvoiceTotal(invT);
    setState(newState);

    setInput('');
    setInputNum('');
  };

  const handleInsertMode = (e) => {
    const target = e.target.value;
    if (target === 'اوتوماتيكي') {
      setAuto('اوتوماتيكي');
    } else {
      setAuto('يدوي');
    }
  };
  return (
    <Container maxWidth="xl">
      <Grid container spacing={2}>
        <Grid item xs={7}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">
                  وضع الادخال
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={auto}
                  onChange={handleInsertMode}
                >
                  <MenuItem value={'اوتوماتيكي'}>اوتوماتيكي</MenuItem>
                  <MenuItem value={'يدوي'}>يدوي</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={input}
                onChange={(e) => {
                  if (
                    e.target.value.charAt(e.target.value.length - 1) === 'z'
                  ) {
                    onSubmit();
                  } else {
                    setInput(e.target.value);
                  }
                }}
                type="text"
                style={{ width: '100%' }}
                placeholder="ادخل الباركود"
              />
            </Grid>
            {auto != 'اوتوماتيكي' ? (
              <>
                <Grid item xs={12}>
                  <Qty setInputNum={setInputNum} inputNum={inputNum} />
                </Grid>
                <Grid className={classes.centerX} item xs={12}>
                  <Button
                    style={{ width: '75%' }}
                    size="large"
                    variant="contained"
                    color="primary"
                    onClick={onSubmit}
                  >
                    أضف الى القائمة
                  </Button>
                </Grid>
              </>
            ) : null}
            <Grid className={classes.centerX} item xs={6}>
              <Button
                style={{ width: '75%' }}
                size="large"
                variant="contained"
                color="primary"
                onClick={onSubmit}
              >
                حساب الاوردر
              </Button>
            </Grid>
            <Grid className={classes.centerX} item xs={6}>
              <Button
                style={{ width: '75%' }}
                size="large"
                variant="contained"
                color="primary"
                onClick={() => {
                  setInvoiceSubtotal(0);
                  setInvoiceTaxes(0);
                  setInvoiceTotal(0);
                  setState('');

                  setInput('');
                  setInputNum('');
                }}
              >
                الغاء الاوردر
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={5}>
          <SpanningTable
            state={state}
            invoiceSubtotal={invoiceSubtotal}
            invoiceTaxes={invoiceTaxes}
            invoiceTotal={invoiceTotal}
            TAX_RATE={TAX_RATE}
          />
        </Grid>
      </Grid>
      <Snackbar
        open={snakbar}
        autoHideDuration={5000}
        onClose={(event, reason) => {
          if (reason === 'clickaway') {
            return;
          }

          setSnakbar(false);
        }}
      >
        <Alert
          onClose={(event, reason) => {
            if (reason === 'clickaway') {
              return;
            }

            setSnakbar(false);
          }}
          severity="error"
        >
          لا يوجود منتج يطابق هذا الباركود!
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default Casher;

function Qty({ inputNum, setInputNum }) {
  return (
    <Grid item xs={12}>
      <TextField
        value={inputNum}
        onChange={(e) => setInputNum(e.target.value)}
        type="number"
        style={{ width: '100%' }}
        placeholder="الكمية"
      />
    </Grid>
  );
}

function Alert(props) {
  return (
    <MuiAlert
      style={{ width: '300px' }}
      elevation={6}
      variant="filled"
      {...props}
    />
  );
}
