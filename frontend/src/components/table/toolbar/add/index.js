import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';

export default function AddButton({ handleDialog }) {
	return (
		<Button color='primary' startIcon={<AddIcon />} onClick={handleDialog}>
			Add a user
		</Button>
	);
}
