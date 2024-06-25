import { ChangeEvent, memo, useState } from 'react'

import { TextField } from '@mui/material'

import { IEditableSpanType } from 'src/models/models'

export const EditableSpan = memo(({ title, onChange }: IEditableSpanType) => {
	console.log('EditableSpan is called')
	const [editMode, setEditMode] = useState<boolean>(false)
	const [newTitle, setNewTitle] = useState<string>('')

	const activateEditMode = () => {
		setEditMode(true)
		setNewTitle(title)
	}
	const activateViewMode = () => {
		setEditMode(false)
		onChange(newTitle)
	}

	const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setNewTitle(e.currentTarget.value)
	}

	return (
		<>
			{editMode ? (
				<TextField
					variant='standard'
					value={newTitle}
					onChange={onChangeTitleHandler}
					onBlur={activateViewMode}
					autoFocus
				/>
			) : (
				<span onDoubleClick={activateEditMode}>{title}</span>
			)}
		</>
	)
})
