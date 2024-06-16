import { ITodoListProps } from 'src/models/models'

import 'src/components/todoList/todoList.css'

export const TodoList = ({ title, tasks }: ITodoListProps) => {
	return (
		<div className='todoList'>
			<h3>{title}</h3>
			<div>
				<input type='text' />
				<button>+</button>
			</div>

			<ul>
				{tasks?.map(item => {
					return (
						<li key={item.id}>
							<input type='checkbox' checked={item.isDone} />
							<span>{item.title}</span>
						</li>
					)
				})}
			</ul>
			<div>
				<button>All</button>
				<button>Active</button>
				<button>Completed</button>
			</div>
		</div>
	)
}
