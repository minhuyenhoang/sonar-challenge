import { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function getEmails(list) {
	return list.map((user) => user.email);
}

export default function EmailDialog({ open, onClose, user }) {
	const [content, setContent] = useState();
	const [subject, setSubject] = useState();

	const sendEmail = async () => {
		var myHeaders = new Headers();
		myHeaders.append('Content-Type', 'application/json');
		var raw = JSON.stringify({
			recipient: getEmails(user),
			subject: subject,
			content: content,
		});

		try {
			const response = await fetch('http://localhost:8000/email/', {
				method: 'POST',
				body: raw,
				headers: myHeaders,
			});

			const message = response.json();
		} catch (err) {
			return;
		}
	};

	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle>Compose email to selected users</DialogTitle>
			<DialogContent className='space-y-3'>
				<TextField
					id='subject'
					label='Subject'
					placeholder='Subject'
					required
					fullWidth
					onChange={(e) => setSubject(e.target.value)}
				/>
				<TextField
					id='message'
					label='Message'
					placeholder='Message'
					required
					multiline
					fullWidth
					rows={5}
					onChange={(e) => setContent(e.target.value)}
				/>
				<DialogActions>
					<Button onClick={sendEmail}>Send</Button>
					<Button onClick={onClose}>Cancel</Button>
				</DialogActions>
			</DialogContent>
		</Dialog>
	);
}
