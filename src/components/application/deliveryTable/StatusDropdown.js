import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import MenuItem from '@material-ui/core/MenuItem';


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function NativeSelects(props) {
  const classes = useStyles();

  const { data,value,handleChange } = props;
console.log(props)

  return (
    <div>
      <FormControl className={classes.formControl}>
        <NativeSelect
          name="age"
          className={classes.selectEmpty}
          value={value}
          onChange={handleChange}
          style={{color:value==='Delivered'?'green':(value==='Pending'?'rgb(140, 105, 17)':(value==='Cancelled'?'red':'blue'))}}

          inputProps={{ 'aria-label': 'age' }}
        >
        {data.map((item, index) => (
            <option value={item.value}>{item.label}</option>

        ))}
        </NativeSelect>
        </FormControl>
      </div>
  );
}
