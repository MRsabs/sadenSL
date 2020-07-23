import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { ipcRenderer } from 'electron';

export default function Product() {
  const [age, setAge] = React.useState('');
  const [stores, setStores] = React.useState([]);
  const [form, setForm] = React.useState({
    name: '',
    retailPrice: '',
    wholeSalePrice: '',
    quantity: '',
    barcode: '',
  });
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const handleFormChange = (e) => {
    let formData = {};
    for (const formPropertiy in form) {
      if (formPropertiy === e.target.id) {
        formData[e.target.id] = e.target.value;
      } else {
        formData[formPropertiy] = form[formPropertiy];
      }
    }
    setForm(formData);
  };
  React.useEffect(() => {
    ipcRenderer.invoke('inventory/read/all').then((data) => {
      let res = [];
      data.rows.map((val) => res.push(val.dataValues));
      setStores(res);
    });
  }, []);

  return (
    <Container maxWidth="xl">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            id="name"
            label="اسم السلعه"
            value={form.name}
            onChange={handleFormChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="barcode"
            label="الباركود"
            value={form.barcode}
            onChange={handleFormChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="retailPrice"
            label="سعر البيع"
            value={form.retailPrice}
            onChange={handleFormChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="wholeSalePrice"
            label="سعر الشراء"
            value={form.wholeSalePrice}
            onChange={handleFormChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="quantity"
            label="الكمية"
            value={form.quantity}
            onChange={handleFormChange}
          />
        </Grid>
        <Grid item xs={12}>
          <InputLabel id="demo-simple-select-label">اختر المخزن</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            onChange={handleChange}
          >
            {stores.map((val) => {
              return (
                <MenuItem key={val.id} value={val.id}>
                  {val.inventoryName}
                </MenuItem>
              );
            })}
          </Select>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              const data = { ...form, trackerId: age };
              ipcRenderer
                .invoke('product/create', data)
                .then(() => cleanForm())
                .catch(() => console.error('err'));
              function cleanForm() {
                setForm({
                  name: '',
                  retailPrice: '',
                  wholeSalePrice: '',
                  quantity: '',
                  barcode: '',
                });
                setAge('');
              }
            }}
          >
            اضف الى المخزن
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
