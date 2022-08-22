import Button from '@mui/material/Button';
import EmailIcon from '@mui/icons-material/Email';

export default function EmailButton({ handleEmailClick }) {
	return (
		<Button
			color='primary'
			startIcon={<EmailIcon />}
			onClick={handleEmailClick}>
			Email users(s)
		</Button>
	);
}
