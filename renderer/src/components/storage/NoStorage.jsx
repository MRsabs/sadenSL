import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Typography, Grid } from '@material-ui/core';

export default function NoStorage() {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // eslint-disable-next-line no-unused-vars
  const createStorage = () => {
    // TODO
  };

  return (
    <div>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        spacing={5}
      >
        <Grid item>
          <Typography>
            يبدو انك لا تملك اي مخزن ! قم بانشاء مخزن لتضع فيه منتجاتك
          </Typography>
        </Grid>
        <Grid item>
          <Button variant="outlined" color="primary" onClick={handleClickOpen}>
            انشاء مخزن
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">انشاء مخزن</DialogTitle>
            <DialogContent>
              <DialogContentText>
                بأمكانك انشاء عدد لا محدود من المخازن ولنفرق بينهم اعطي لكل مخزن
                اسم
              </DialogContentText>
              <TextField
                dir="rtl"
                autoFocus
                margin="dense"
                id="name"
                label="أسم المخزن"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                الغاء
              </Button>
              <Button onClick={handleClose} color="primary">
                انشاء
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </Grid>
    </div>
  );
}
