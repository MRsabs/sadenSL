import React from 'react';
import { useHistory } from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';

function ItemList(props) {
  const history = useHistory();
  function handleClick() {
    props.closeButton();
    history.push(props.target);
  }
  return (
    <MenuItem button onClick={handleClick}>
      {props.title}
    </MenuItem>
  );
}

export default ItemList;
