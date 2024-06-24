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
	addTasks,
	addTodolist as addTodolistTasks,
	changeTaskStatus,
	changeTaskTitle,
	removeTasks,
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
	const dispatch = useAppDispatch()

	const todolists = useAppSelector(state => state.todolists.todolists)
	const tasks = useAppSelector(state => state.tasks.tasks)

	const addNewTodoList = (title: string) => {
		dispatch(addTodolist(title))
		dispatch(addTodolistTasks(title))
	}
	const changeTodolistFilterHandler = (
		value: FilterValuesType,
		todoListId: string
	) => {
		dispatch(changeTodolistFilter({ id: todoListId, filter: value }))
	}
	const changeTodolistTitleHandler = (newTitle: string, todoListId: string) => {
		dispatch(changeTodolistTitle({ id: todoListId, title: newTitle }))
	}
	const removeTodoList = (todolistId: string) => {
		dispatch(removeTodolist(todolistId))
		dispatch(removeTodolistTasks({ todolistId }))
	}

	const addTask = (title: string, todolistId: string) => {
		dispatch(addTasks({ taskTitle: title, todolistId }))
	}
	const removeTask = (id: string, todoListId: string) => {
		dispatch(removeTasks({ taskId: id, todoListId }))
	}
	const changeTaskStatusHandler = (
		taskId: string,
		isDone: boolean,
		todolistId: string
	) => {
		dispatch(changeTaskStatus({ taskId, taskStatus: isDone, todolistId }))
	}
	const changeTaskTitleHandler = (
		newTitle: string,
		taskId: string,
		todolistId: string
	) => {
		dispatch(changeTaskTitle({ taskId, taskTitle: newTitle, todolistId }))
	}

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
						let tasksForTodoList = tasks[item.id]

						switch (item.filter) {
							case 'completed':
								tasksForTodoList = tasksForTodoList.filter(
									t => t.isDone === true
								)
								break
							case 'active':
								tasksForTodoList = tasksForTodoList.filter(
									t => t.isDone === false
								)
								break
						}

						return (
							<Grid key={item.id} item>
								<Paper style={{ padding: '10px' }}>
									<TodoList
										key={item.id}
										id={item.id}
										title={item.title}
										tasks={tasksForTodoList}
										removeTask={removeTask}
										changeFilter={changeTodolistFilterHandler}
										addTask={addTask}
										changeTaskStatus={changeTaskStatusHandler}
										changeTaskTitle={changeTaskTitleHandler}
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
