import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import {
  Plugin, Template, TemplateConnector, TemplatePlaceholder,
} from '@devexpress/dx-react-core';
import { DataTypeProvider, EditingState } from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableEditColumn,
} from '@devexpress/dx-react-grid-material-ui';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import MuiGrid from '@mui/material/Grid';
import { RepositoryInjector } from '../../repository/RepositoryInjector';
import { ComponentState } from '../../models/ComponentState';
import { Chip, Input, MenuItem, Select, Typography } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

const BooleanFormatter = ({ value }) => <Chip label={value ? 'Yes' : 'No'} />;

const BooleanEditor = ({ value, onValueChange }) => (
  <Select
    input={<Input />}
    value={value ? 'Yes' : 'No'}
    onChange={event => onValueChange(event.target.value === 'Yes')}
    style={{ width: '100%' }}
  >
    <MenuItem value="Yes">
      Yes
    </MenuItem>
    <MenuItem value="No">
      No
    </MenuItem>
  </Select>
);

const BooleanTypeProvider = props => (
  <DataTypeProvider
    formatterComponent={BooleanFormatter}
    editorComponent={BooleanEditor}
    {...props}
  />
);

/* eslint-disable no-shadow */
const Popup = ({
  row,
  onChange,
  onApplyChanges,
  onCancelChanges,
  open,
}) => (
  <Dialog open={open} onClose={onCancelChanges} aria-labelledby="form-dialog-title">
    <DialogTitle id="form-dialog-title">User Details</DialogTitle>
    <DialogContent>
      <MuiGrid container spacing={3}>
        <MuiGrid item xs={6}>
          <FormGroup>
            <TextField
             
              sx={{ input: { color: 'black' }, 
              '&:hover fieldset': {
                borderColor: 'red',
              }
            }}
              margin="normal"
              name="code"
              label="Code"
              value={row.code || ''}
              onChange={onChange}
            />
            <Typography variant="h6" align="left" color="primary" sx = {{fontSize: 15}}>
                Has Access To App
            </Typography>
             <Select
                
                label="Has Access To App"
                sx={{  color: 'black' }}
                input={<Input />}
                value={row.hasAccessToApp == undefined ? 'No' : (row.hasAccessToApp ? 'Yes' : 'No')}
                onChange={event => onChange({ target: { name: 'hasAccessToApp', value: event.target.value === 'Yes' } })}
                style={{ width: '100%' }}
              >
                <MenuItem sx={{ color: 'black' }}
                value="Yes">
                  Yes
                </MenuItem>
                <MenuItem sx={{ color: 'black' }} value="No">
                  No
                </MenuItem>
            </Select>
            <TextField
             sx={{ input: { color: 'black' } }}
              margin="normal"
              name="password"
              label="Password"
              value={row.password || ''}
              onChange={onChange}
            />
          </FormGroup>
        </MuiGrid>
        <MuiGrid item xs={6}>
          <FormGroup>
            <Typography variant="h6" align="left" color="primary" sx = {{fontSize: 15}}>
                Role
            </Typography>
          <Select
                input={<Input />}
                sx={{  color: 'black' }}
                value={row.role || '1'}
                onChange={event => onChange({ target: { name: 'role', value: event.target.value } })}
                style={{ width: '100%' }}
              >
                <MenuItem sx={{  color: 'black' }} value="1">
                  1
                </MenuItem>
                <MenuItem sx={{  color: 'black' }} value="2">
                  2
                </MenuItem>
                <MenuItem sx={{  color: 'black' }} value="3">
                  3
                </MenuItem>
            </Select>
            
            <LocalizationProvider  dateAdapter={AdapterDayjs}>
              <DatePicker
                sx = {{marginTop: '20px', input: { color: 'black'},  svg: { color : 'black' }}}
                renderInput={props => <TextField  sx={{
                  svg: { color : 'black' },
                  input: { color: 'black'},
                  label: { color : 'black'}
                }} margin="normal" {...props} />}
                label="Data de Registo"
                value={ dayjs(row.createdAt)}
                onChange={value => onChange({
                  target: { name: 'createdAt', value: value.format('DD-MM-YYYY')  },
                })}
                inputFormat="DD-MM-YYYY"
              />
            </LocalizationProvider>
          </FormGroup>
        </MuiGrid>
      </MuiGrid>
    </DialogContent>
    <DialogActions>
      <Button onClick={onCancelChanges} color="secondary">
        Cancel
      </Button>
      <Button onClick={onApplyChanges} color="primary">
        Save
      </Button>
    </DialogActions>
  </Dialog>
);


const PopupEditing = React.memo(({ popupComponent: Popup }) => (
  <Plugin>
    <Template name="popupEditing">
      <TemplateConnector>
        {(
          {
            rows,
            getRowId,
            addedRows,
            editingRowIds,
            createRowChange,
            rowChanges,
          },
          {
            changeRow, changeAddedRow, commitChangedRows, commitAddedRows,
            stopEditRows, cancelAddedRows, cancelChangedRows,
          },
        ) => {
          const isNew = addedRows.length > 0;
          let editedRow;
          let rowId;
          if (isNew) {
            rowId = 0;
            editedRow = addedRows[rowId];
          } else {
            [rowId] = editingRowIds;
            const targetRow = rows.filter(row => getRowId(row) === rowId)[0];
            editedRow = { ...targetRow, ...rowChanges[rowId] };
          }

          const processValueChange = ({ target: { name, value } }) => {
            const changeArgs = {
              rowId,
              change: createRowChange(editedRow, value, name),
            };
            if (isNew) {
              changeAddedRow(changeArgs);
            } else {
              changeRow(changeArgs);
            }
          };
          const rowIds = isNew ? [0] : editingRowIds;
          const applyChanges = () => {
            if (isNew) {
              commitAddedRows({ rowIds });
            } else {
              stopEditRows({ rowIds });
              commitChangedRows({ rowIds });
            }
          };
          const cancelChanges = () => {
            if (isNew) {
              cancelAddedRows({ rowIds });
            } else {
              stopEditRows({ rowIds });
              cancelChangedRows({ rowIds });
            }
          };

          const open = editingRowIds.length > 0 || isNew;
          return (
            <Popup
              open={open}
              row={editedRow}
              onChange={processValueChange}
              onApplyChanges={applyChanges}
              onCancelChanges={cancelChanges}
            />
          );
        }}
      </TemplateConnector>
    </Template>
    <Template name="root">
      <TemplatePlaceholder />
      <TemplatePlaceholder name="popupEditing" />
    </Template>
  </Plugin>
));

const getRowId = row => row.id;
export default () => {
  const [columns] = useState([
    { name: 'code', title: 'Code' },
    { name: 'hasAccessToApp', title: 'Has Access To App' },
    { name: 'role', title: 'Role' },
    { name: 'timeLeftInApp', title: 'Time Left In App' },
  ]);
  const repository = new RepositoryInjector().injectRepository();
  const [componentState, setComponentState] = useState(ComponentState.LOADING);
  const [rows, setRows] = useState([]);
  const [booleanColumns] = useState(['hasAccessToApp']);
  

  const deleteUser = (code) => {
    return repository.deleteUser(code).then((response) => {
        console.log(response);
    }).catch((error) => {
        setComponentState(ComponentState.ERROR);
    });
  }

  const createUser = (code, password, role, createdAt, hasAccessToApp) => {
    return repository.createUser(code, password, role, createdAt, hasAccessToApp).then((response) => {
        
        return true;
    }).catch((error) => {
        console.log(error);
        return false;
    });
  }


  const updateUser = (oldCode, code, password, role,createdAt, hasAccessToApp ) => {
    return repository.editUser(oldCode, code, password, role,createdAt, hasAccessToApp).then((response) => {
        
        return true;
    }).catch((error) => {
        
        return false;
    });
  }


  const fetchInfo = () => {
      return repository.fetchAllUsers().then((response) => {
          setRows(response);
        
          setComponentState(ComponentState.LOADED);
      }).catch((error) => {
          setComponentState(ComponentState.ERROR);
      });
  }

  useEffect(() => {
      console.log("Fetching users");
      fetchInfo();
      // eslint-disable-next-line
    }, []); 

  const commitChanges = async ({ added, changed, deleted }) => {
    let changedRows;
    if (added) {
      const startingAddedId = rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;
      const added_map = added.map(async (row, index) => 
      {
        const code = row.code;
        const password = row.password;
        const role = row.role;
        const createdAt = row.createdAt || dayjs().format('DD-MM-YYYY');
        const hasAccessToApp = row.hasAccessToApp;
        console.log(row);
        if(await createUser(code, password, role, createdAt, hasAccessToApp)){
          console.log("User created");
          return { id: startingAddedId + index, ...row };
        }else{
          //show error message
          alert("Criação não válida do usuário!");
          return null;
        }
        
      });
      changedRows = [
        ...rows,
        
      ];
      changedRows.push(...(await Promise.all(added_map)).filter(row => row !== null));


    }
    if (changed) {
      // call edit user for each changed user
      console.log(changed);
      changedRows = rows.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
      //Iterate over changed object
      for (const [key, value] of Object.entries(changed)) {
        const oldCode = rows.filter(row => row.id === parseInt(key))[0].code;
        const newRow = changedRows.filter(row => row.id === parseInt(key))[0];
        const code = newRow.code;
        const password = newRow.password;
        const role = newRow.role;
        const createdAt = newRow.createdAt;
        console.log(newRow)
        const hasAccessToApp = newRow.hasAccessToApp;
        if(await updateUser(oldCode, code, password, role,createdAt, hasAccessToApp)){
          console.log("User updated");
        }else{
          //show error message
          alert("Edição não válida do usuário!");  
          //rollback changes
          changedRows = changedRows.map(row => (row.id == key ? { ...rows.filter(row => row.id === parseInt(key))[0] } : row));

        }
      }

      
    }
    if (deleted) {
      const deletedSet = new Set(deleted);
      for(let i = 0; i < deleted.length; i++){
        const code = rows.filter(row => row.id === deleted[i])[0].code;
        deleteUser(code);
      }
      changedRows = rows.filter(row => !deletedSet.has(row.id));
    }
    setRows(changedRows);
  };
  
  const headerRowComponent = ({ tableRow, ...restProps }) => {
    return <Table.Row {...restProps} style={{ backgroundColor: "#f28db2" }} />;
  };

  const rowComponent = ({ tableRow, ...restProps }) => {
    return <Table.Row {...restProps} style={{ backgroundColor: "LightBlue" }} />;
  };
  return (
    <>
    <Typography variant="h2" align="center" color="primary" sx={{marginTop: '20px'}}>
        Página de admnistrador
    </Typography>

    <Typography variant="h5" align="left" color="primary" sx={{marginTop: '20px'}}>
        Gestão de utilizadores
    </Typography>
    {
        componentState === ComponentState.LOADING ?
            <Typography color="primary" sx = {{fontWeight: "bold", p:0.5, ml: '10px'}} >
                Carregando utilizadores...
            </Typography>
            :
        componentState === ComponentState.ERROR ?
            <Typography color="error" sx = {{fontWeight: "bold", p:0.5, ml: '10px'}} >
                Erro ao carregar utilizadores
            </Typography>

            :
            rows.length !== 0 ?
            <Paper >
              <Grid
                rows={rows}
                columns={columns}
                getRowId={getRowId}
              >

                <BooleanTypeProvider
                      for={booleanColumns}
                  />
                <EditingState
                  onCommitChanges={commitChanges}
                />
                <Table rowComponent={rowComponent} />
                <TableHeaderRow rowComponent={headerRowComponent} />
                <TableEditColumn
                  showAddCommand
                  showEditCommand
                  showDeleteCommand
                />
                <PopupEditing popupComponent={Popup} />
              </Grid>
            </Paper>
                
            :   
            <Typography color="primary" sx = {{fontWeight: "bold", p:0.5, ml: '10px'}} >
                Não existem utilizadores
            </Typography>

    }
        
</>

  );
};
