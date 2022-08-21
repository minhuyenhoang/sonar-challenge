import { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { getFrequency } from '../../../lib';

const options = [
	{
		label: 'Never',
		value: 0,
	},
	{
		label: '3PM everyday',
		value: 1,
	},
	{
		label: '3PM every Monday',
		value: 2,
	},
];

export default function EditDialog({ open, onClose, list, setList, data }) {
	const [firstName, setFirstName] = useState();
	const [lastName, setLastName] = useState();
	const [email, setEmail] = useState();
	const [freq, setFreq] = useState();

	console.log(data);

	useEffect(() => {
		setFirstName(data.firstName);
		setLastName(data.lastName);
		setEmail(data.email);
		setFreq(data.freq);
	}, [data]);

	const handleSave = async () => {
		try {
			const data = JSON.stringify({
				first_name: firstName,
				last_name: lastName,
				email: email,
				frequency: freq,
				emails_sent: 0,
			});
			var myHeaders = new Headers();
			myHeaders.append('Content-Type', 'application/json');
			const response = await fetch('http://localhost:8000/users/', {
				method: 'PUT',
				headers: myHeaders,
				body: data,
			});
			const user = await response.json();
			setList([...list, user]);
			onClose();
		} catch (err) {
			return;
		}
	};

	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle>Edit user</DialogTitle>
			<DialogContent className='space-y-3'>
				<TextField
					required
					fullWidth
					id='firstName'
					label='First name'
					defaultValue={data.firstName}
					onChange={(e) => setFirstName(e.target.value)}
				/>
				<TextField
					required
					fullWidth
					id='lastName'
					label='Last name'
					defaultValue={data ? data.lastName : ''}
					onChange={(e) => setLastName(e.target.value)}
				/>
				<TextField
					required
					fullWidth
					id='email'
					label='Email address'
					defaultValue={data ? data.email : ''}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<TextField
					select
					id='frequency'
					label='frequency'
					defaultValue={data ? getFrequency(data.freq) : 0}
					onChange={(e) => setFreq(e.target.value)}>
					{options.map((option) => (
						<MenuItem key={option.value} value={option.value}>
							{option.label}
						</MenuItem>
					))}
				</TextField>
				<DialogActions>
					<Button onClick={handleSave}>Save</Button>
					<Button>Cancel</Button>
				</DialogActions>
			</DialogContent>
		</Dialog>
	);
}
