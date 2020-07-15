import React from 'react';
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import { ipcRenderer } from 'electron';
import { useHistory } from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';
import { OneStorageContext } from '@contexts/OneStorageContext';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function TopPanel(props) {
  const { dispatch } = React.useContext(OneStorageContext);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [store, setStore] = React.useState('اختار احد المخازن');
  const history = useHistory();

  const handleStorageChagne = (storageId) => {
    ipcRenderer.invoke('inventory/read/one', storageId).then((data) => {
      dispatch({
        type: 'sync',
        payload: data,
      });
    });
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (target, name, inventoryId) => {
    setAnchorEl(null);
    if (name != 'backdropClick') {
      setStore(name);
      history.push(target);
      handleStorageChagne(inventoryId);
    } else {
      setStore(store);
    }
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Button
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
            startIcon={<KeyboardArrowDown />}
            style={{ color: 'white' }}
            size="large"
          >
            {store}
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {props.storages.map(({ dataValues: { id, inventoryName } }) => {
              return (
                <MenuItem
                  key={id}
                  onClick={() =>
                    handleClose(`${props.match.url}/${id}`, inventoryName, id)
                  }
                >
                  {inventoryName}
                </MenuItem>
              );
            })}
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  );
}


TopPanel.propTypes = {
  storages: PropTypes.arrayOf(PropTypes.object),
  match: PropTypes.object
}