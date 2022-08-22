import { DataGrid, GridActionsCellItem, GridRowModes } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { EmailDialog } from '../dialog';
import Toolbar from './toolbar';

export default function Table({ list, setList, handleDialog }) {
	const [rowModesModel, setRowModesModel] = useState({});
	const [open, setOpen] = useState(false);
	const [user, setUser] = useState(null);

	const handleDeleteClick = (id) => async () => {
		const response = await fetch(`http://localhost:8000/users/${id}`, {
			method: 'DELETE',
		});
		setList(list.filter((row) => row.id !== id));
	};

	const handleEditClick = (id) => () => {
		setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
	};

	const handleRowEditStart = (params, event) => {
		event.defaultMuiPrevented = true;
	};

	const handleRowEditStop = (params, event) => {
		event.defaultMuiPrevented = true;
	};

	const handleSaveClick = (id) => () => {
		setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
	};

	const handleCancelClick = (id) => () => {
		setRowModesModel({
			...rowModesModel,
			[id]: { mode: GridRowModes.View, ignoreModifications: true },
		});

		const editedRow = list.find((row) => row.id === id);
		if (editedRow.isNew) {
			setList(list.filter((row) => row.id !== id));
		}
	};

	const handleEmailClick = () => {
		setOpen(true);
	};

	const processRowUpdate = async (newRow) => {
		var myHeaders = new Headers();
		myHeaders.append('Content-Type', 'application/json');
		try {
			var raw = JSON.stringify({
				first_name: newRow.firstName,
				last_name: newRow.firstName,
				email: newRow.email,
				frequency: newRow.frequency,
			});
			const response = await fetch(
				`http://localhost:8000/users/${newRow.id}/`,
				{
					method: 'PATCH',
					headers: myHeaders,
					body: raw,
				}
			);
			const user = await response.json();
			return user;
		} catch (err) {
			return;
		}
	};

	const closeDialog = () => {
		setOpen(false);
	};

	const columns = [
		{ field: 'id', headerName: 'ID', width: 70 },
		{
			field: 'first_name',
			headerName: 'First name',
			width: 130,
			editable: true,
		},
		{ field: 'last_name', headerName: 'Last name', width: 130, editable: true },
		{
			field: 'email',
			headerName: 'Email address',
			sortable: false,
			width: 200,
			editable: true,
		},
		{
			field: 'emails_sent',
			headerName: 'Emails sent',
			width: 100,
		},
		{
			field: 'frequency',
			type: 'singleSelect',
			headerName: 'Frequency',
			width: 160,
			editable: true,
			sortable: false,
			valueOptions: [
				{ label: 'Never', value: 0 },
				{
					label: '3PM everyday',
					value: 1,
				},
				{ label: '3PM every Monday', value: 2 },
			],
			valueFormatter: ({ id: rowId, value, field, api }) => {
				const colDef = api.getColumn(field);
				const option = colDef.valueOptions.find(
					({ value: optionValue }) => value === optionValue
				);

				return option.label;
			},
			//valueGetter: (params) => getFrequency(params.row.frequency),
		},
		{
			field: 'action',
			type: 'actions',
			getActions: ({ id }) => {
				const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

				if (isInEditMode) {
					return [
						<GridActionsCellItem
							icon={<SaveIcon />}
							label='Save'
							onClick={handleSaveClick(id)}
						/>,
						<GridActionsCellItem
							icon={<CancelIcon />}
							label='Cancel'
							className='textPrimary'
							onClick={handleCancelClick(id)}
							color='inherit'
						/>,
					];
				}

				return [
					<GridActionsCellItem
						icon={<EditIcon />}
						label='Edit'
						onClick={handleEditClick(id)}
						color='inherit'
					/>,
					<GridActionsCellItem
						icon={<DeleteIcon />}
						label='Delete'
						onClick={handleDeleteClick(id)}
						color='inherit'
					/>,
				];
			},
		},
	];
	return (
		<>
			<div className='h-[500px] w-3/5'>
				<DataGrid
					columns={columns}
					rows={list}
					rowModesModel={rowModesModel}
					editMode='row'
					onRowEditStart={handleRowEditStart}
					onRowEditStop={handleRowEditStop}
					processRowUpdate={processRowUpdate}
					checkboxSelection
					onSelectionModelChange={(ids) => {
						const selectedIDs = new Set(ids);
						const selectedRowData = list.filter((row) =>
							selectedIDs.has(row.id)
						);
						setUser(selectedRowData);
					}}
					experimentalFeatures={{ newEditingApi: true }}
					components={{
						Toolbar: Toolbar,
					}}
					componentsProps={{
						toolbar: { handleDialog, handleEmailClick },
					}}
				/>
			</div>
			{user && <EmailDialog open={open} onClose={closeDialog} user={user} />}
		</>
	);
}
