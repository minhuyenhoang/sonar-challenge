import { DataGrid, GridActionsCellItem, GridRowModes } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { EditUser } from '../../lib';
import AddButton from './add';
import { EditDialog } from '../dialog';
import { getFrequency } from '../../lib';

export default function Table({ list, setList, handleDialog }) {
	const [rowModesModel, setRowModesModel] = useState({});
	const [open, setOpen] = useState(false);
	const [editRow, setEditRow] = useState();

	const handleDeleteClick = (id) => () => {
		setList(list.filter((row) => row.id !== id));
	};

	const handleEditClick = (id) => () => {
		/*setEditRow(list.filter((row) => row.id === id)[0]);
		setOpen(true);*/
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
			headerName: 'Frequency',
			width: 160,
			editable: true,
			valueGetter: (params) => getFrequency(params.row.frequency),
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
						className='textPrimary'
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
					experimentalFeatures={{ newEditingApi: true }}
					components={{
						Toolbar: AddButton,
					}}
					componentsProps={{
						toolbar: { handleDialog },
					}}
				/>
			</div>
			{/*<EditDialog
				open={open}
				onClose={closeDialog}
				list={list}
				setList={setList}
				data={editRow}
        />*/}
		</>
	);
}
