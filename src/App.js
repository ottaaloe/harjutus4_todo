import { useState } from 'react';

import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import './App.css';

/*
{
  text: 'pese hambad',
  isChecked: false,
  id: 0,
  isDeleted: false
}
*/

function App() {
  const [todoIdCounter, setTodoIdCounter] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [todos, setTodos] = useState([
    {
      text: 'pese hambad',
      isChecked: false,
      id: 0
    }
  ]);
  const [currentView, setView] = useState('all');

  const addNewTodo = () => {
    setTodos((currentTodos) => [
      ...currentTodos,
      {
        text: inputValue,
        isChecked: false,
        isDeleted: false,
        id: todos.length
      }
    ]);
    setInputValue('');
    console.log(currentView);
    if (currentView == 'finished')
      setView('unfinished');
    console.log(todos);
  }

  const deleteToDo = (event) => {
    console.log('del', event.currentTarget.id)
    todos.find((obj) => obj['id'] == event.currentTarget.id).isDeleted = true;
    refreshList();
  }

  const checkToDo = (event) => {

    todos.find((obj) => obj['id'] == event.target.id).isChecked = (event.target.checked) ? true : false;
    refreshList();
  }

  const deleteAll = (event) => {
    setTodos([]);
  }

  const markAllDone = (event) => {
    for (let todo of todos) {
      todo['isChecked'] = true;
    }
    refreshList();
  }

  const deleteDone = (event) => {
    for (let todo of todos) {
      if (todo['isChecked'])
        todo.isDeleted = true;
    }
    refreshList();
  }

  const handlesetViewChange = (event) => {
    console.log('view');
    console.log(event.target.value);
    setView(event.target.value);
  };

  const handleInputChange = (event) => {
    console.log('handleInputchange')
    setInputValue(event.target.value);
  }

  const refreshList = () => {
    setTodos((currentTodos) => [
      ...currentTodos
    ]);

  }

  return (
    <div className="App">
      <header className="App-header">
        <h2>todos</h2>
        <Box
          sx={{
            maxWidth: 400,
            width: "100%"
          }}
        >
          <Stack spacing={2} direction="row">
            <TextField
              fullWidth
              label="What needs to be done?"
              variant="standard"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={(ev) => {
                if (ev.key === 'Enter') {
                  addNewTodo();
                  ev.preventDefault();
                }
              }}
            />
            <Button variant="contained" onClick={addNewTodo}>Add</Button>
          </Stack>
          <br />
          <Stack spacing={2} direction="row">
            <FormControl fullWidth variant="filled" >
              <InputLabel id="demo-simple-select-label">View</InputLabel>
              <Select 
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={currentView}
                label="View"
                onChange={handlesetViewChange}
              >
                <MenuItem value={'all'}>All</MenuItem>
                <MenuItem value={'finished'}>Finished</MenuItem>
                <MenuItem value={'unfinished'}>Unfinsihed</MenuItem>
              </Select>
            </FormControl>

            <Button variant="contained" onClick={markAllDone}>Mark All Done</Button>
            <Button variant="contained" onClick={deleteDone}>Delete Done</Button>
            <Button variant="contained" onClick={deleteAll}>Delete All</Button>
          </Stack>
          <br />
          {
            todos.map((todo) => (
              !todo.isDeleted && (currentView == 'all' || (currentView == 'finished' && todo.isChecked) || (currentView == 'unfinished' && !todo.isChecked)) ? (
                <div key={todo.id}>
                  <Checkbox id={todo.id} onClick={checkToDo} checked={todo.isChecked} /> {todo.text} 
                  <IconButton aria-label="delete" id={todo.id} onClick={deleteToDo}>
                    <DeleteIcon />
                  </IconButton>
                </div>
              ) : null
            ))
          }
        </Box>
      </header>
    </div>
  );
}

export default App;