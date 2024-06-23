import { useReducer } from 'react'

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
import { v1 } from 'uuid'

import { FilterValuesType } from 'src/models/models'

import { AddItemForm } from './components/addItemForm/AddItemForm'
import { TodoList } from 'src/components/todoList/TodoList'

import { useAppDispatch, useAppSelector } from './hooks/redux'
import {
	addTaskAC,
	changeTaskStatusAC,
	changeTaskTitleAC,
	removeTaskAC,
	tasksReducer
} from './store/tasks-reducer'
import {
	addTodolistAC,
	changeTodolistFilterAC,
	changeTodolistTitleAC,
	removeTodolistAC,
	todolistsReducer
} from './store/todolistsReducer'

import 'src/app.css'

function AppWidthRedux() {
	const dispatch = useAppDispatch()

	const todolist = useAppSelector(state => state.todolists.todolists)

	console.log(todolist)

	const todoListsId1 = v1()
	const todoListsId2 = v1()

	const [todoLists, dispatchTodolists] = useReducer(todolistsReducer, [
		{
			id: todoListsId1,
			title: 'What to learn',
			filter: 'all'
		},
		{
			id: todoListsId2,
			title: 'What to watch',
			filter: 'all'
		}
	])

	const [tasks, dispatchTasks] = useReducer(tasksReducer, {
		[todoListsId1]: [
			{
				id: v1(),
				title: 'css & html',
				isDone: true
			},
			{
				id: v1(),
				title: 'js',
				isDone: true
			},
			{
				id: v1(),
				title: 'react',
				isDone: false
			}
		],
		[todoListsId2]: [
			{
				id: v1(),
				title: 'Berserk',
				isDone: true
			},
			{
				id: v1(),
				title: 'КРД',
				isDone: true
			},
			{
				id: v1(),
				title: 'The last of us',
				isDone: false
			}
		]
	})

	const addNewTodoList = (title: string) => {
		dispatchTodolists(addTodolistAC(title))
		dispatchTasks(addTodolistAC(title))
	}
	const changeTodolistFilter = (
		value: FilterValuesType,
		todoListId: string
	) => {
		dispatchTodolists(changeTodolistFilterAC(value, todoListId))
	}
	const changeTodolistTitle = (newTitle: string, todoListId: string) => {
		dispatchTodolists(changeTodolistTitleAC(newTitle, todoListId))
	}
	const removeTodoList = (todoListId: string) => {
		dispatchTodolists(removeTodolistAC(todoListId))
		dispatchTasks(removeTodolistAC(todoListId))
	}

	const addTask = (title: string, todoListId: string) => {
		dispatchTasks(addTaskAC(title, todoListId))
	}
	const removeTask = (id: string, todoListId: string) => {
		dispatchTasks(removeTaskAC(id, todoListId))
	}
	const changeTaskStatus = (
		taskId: string,
		isDone: boolean,
		todoListId: string
	) => {
		dispatchTasks(changeTaskStatusAC(taskId, isDone, todoListId))
	}
	const changeTaskTitle = (
		newTitle: string,
		taskId: string,
		todoListId: string
	) => {
		dispatchTasks(changeTaskTitleAC(taskId, newTitle, todoListId))
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
					{todoLists.map(item => {
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
										changeFilter={changeTodolistFilter}
										addTask={addTask}
										changeTaskStatus={changeTaskStatus}
										changeTaskTitle={changeTaskTitle}
										filter={item.filter}
										removeTodoList={removeTodoList}
										ChangeTodoTitle={changeTodolistTitle}
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
