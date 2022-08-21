import { GridRowModes, GridToolbarContainer } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';

export default function AddButton(props) {
	const { handleDialog } = props;

	return (
		<GridToolbarContainer>
			<Button color='primary' startIcon={<AddIcon />} onClick={handleDialog}>
				Add a user
			</Button>
		</GridToolbarContainer>
	);
}
