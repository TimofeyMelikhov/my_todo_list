import { useState } from 'react'

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

import {
	FilterValuesType,
	ITaskStateType,
	ITodoListType
} from 'src/models/models'

import { AddItemForm } from './components/addItemForm/AddItemForm'
import { TodoList } from 'src/components/todoList/TodoList'

import 'src/app.css'

function App() {
	const todoListsId1 = v1()
	const todoListsId2 = v1()

	const [todoLists, setTodoLists] = useState<ITodoListType[]>([
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

	const [tasks, setTasks] = useState<ITaskStateType>({
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
		const newTodoList: ITodoListType = {
			id: v1(),
			title,
			filter: 'all'
		}

		setTodoLists([newTodoList, ...todoLists])
		setTasks({
			...tasks,
			[newTodoList.id]: []
		})
	}
	const changeFilter = (value: FilterValuesType, todoListId: string) => {
		const todoList = todoLists.find(tl => tl.id === todoListId)
		if (todoList) {
			todoList.filter = value
			setTodoLists([...todoLists])
		}
	}
	const ChangeTodoTitle = (newTitle: string, todoListId: string) => {
		const currentTodo = todoLists.find(tl => tl.id === todoListId)
		if (currentTodo) {
			currentTodo.title = newTitle
			setTodoLists([...todoLists])
		}
	}
	const removeTodoList = (todoListId: string) => {
		const filteredTodoLists = todoLists.filter(tl => tl.id !== todoListId)
		setTodoLists(filteredTodoLists)
		delete tasks[todoListId]
		setTasks({ ...tasks })
	}

	const addTask = (title: string, todoListId: string) => {
		let newTask = {
			id: v1(),
			title: title,
			isDone: false
		}
		const currentTusks = tasks[todoListId]
		tasks[todoListId] = [newTask, ...currentTusks]
		setTasks({ ...tasks })
	}
	const removeTask = (id: string, todoListId: string) => {
		let result = tasks[todoListId].filter(task => task.id !== id)
		tasks[todoListId] = result
		setTasks({ ...tasks })
	}
	const changeTaskStatus = (
		taskId: string,
		isDone: boolean,
		todoListId: string
	) => {
		const currentTusks = tasks[todoListId]
		let task = currentTusks.find(t => t.id === taskId)
		if (task) {
			task.isDone = isDone
			setTasks({ ...tasks })
		}
	}
	const changeTaskTitle = (
		newTitle: string,
		taskId: string,
		todoListId: string
	) => {
		const currentTusks = tasks[todoListId]
		const task = currentTusks.find(t => t.id === taskId)
		if (task) {
			task.title = newTitle
			setTasks({ ...tasks })
		}
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
							<Grid item>
								<Paper style={{ padding: '10px' }}>
									<TodoList
										key={item.id}
										id={item.id}
										title={item.title}
										tasks={tasksForTodoList}
										removeTask={removeTask}
										changeFilter={changeFilter}
										addTask={addTask}
										changeTaskStatus={changeTaskStatus}
										changeTaskTitle={changeTaskTitle}
										filter={item.filter}
										removeTodoList={removeTodoList}
										ChangeTodoTitle={ChangeTodoTitle}
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

export default App
