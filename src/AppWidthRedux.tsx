import { useCallback } from 'react'

import { Menu } from '@mui/icons-material'
import {
	AppBar,
	Button,
	Container,
	Grid,
	IconButton,
	Paper,
	Toolbar,
	Typography
} from '@mui/material'

import { FilterValuesType } from 'src/models/models'

import { AddItemForm } from './components/addItemForm/AddItemForm'
import { TodoList } from 'src/components/todoList/TodoList'

import { useAppDispatch, useAppSelector } from './hooks/redux'
import {
	addTodolist as addTodolistTasks,
	removeTodolist as removeTodolistTasks
} from './store/slices/tasksSlice'
import {
	addTodolist,
	changeTodolistFilter,
	changeTodolistTitle,
	removeTodolist
} from './store/slices/todolistSlice'

import 'src/app.css'

function AppWidthRedux() {
	console.log('App is called')
	const dispatch = useAppDispatch()
	const todolists = useAppSelector(state => state.todolists.todolists)

	const addNewTodoList = useCallback(
		(title: string) => {
			const action = addTodolist(title)
			dispatch(action)
			dispatch(addTodolistTasks(action.payload.todolistId))
		},
		[dispatch]
	)

	const changeTodolistFilterHandler = useCallback(
		(value: FilterValuesType, todolistId: string) => {
			dispatch(changeTodolistFilter({ id: todolistId, filter: value }))
		},
		[dispatch]
	)

	const changeTodolistTitleHandler = useCallback(
		(newTitle: string, todolistId: string) => {
			dispatch(changeTodolistTitle({ id: todolistId, title: newTitle }))
		},
		[dispatch]
	)

	const removeTodoList = useCallback(
		(todolistId: string) => {
			dispatch(removeTodolist(todolistId))
			dispatch(removeTodolistTasks({ todolistId }))
		},
		[dispatch]
	)

	return (
		<div className='app'>
			<AppBar position='static'>
				<Toolbar>
					<IconButton
						size='large'
						edge='start'
						color='inherit'
						aria-label='menu'
						sx={{ mr: 2 }}
					>
						<Menu />
					</IconButton>
					<Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
						TodoList
					</Typography>
					<Button color='inherit'>Login</Button>
				</Toolbar>
			</AppBar>
			<Container fixed>
				<Grid container style={{ padding: '20px' }}>
					<AddItemForm addItem={addNewTodoList} />
				</Grid>
				<Grid container spacing={5}>
					{todolists.map(item => {
						return (
							<Grid key={item.id} item>
								<Paper style={{ padding: '10px' }}>
									<TodoList
										key={item.id}
										id={item.id}
										title={item.title}
										changeFilter={changeTodolistFilterHandler}
										filter={item.filter}
										removeTodoList={removeTodoList}
										ChangeTodoTitle={changeTodolistTitleHandler}
									/>
								</Paper>
							</Grid>
						)
					})}
				</Grid>
			</Container>
		</div>
	)
}

export default AppWidthRedux
