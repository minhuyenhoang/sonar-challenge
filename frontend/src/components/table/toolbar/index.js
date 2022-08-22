import { GridToolbarContainer } from '@mui/x-data-grid';
import AddButton from './add';
import EmailButton from './email';

export default function Toolbar(props) {
	const { handleDialog, handleEmailClick } = props;

	return (
		<GridToolbarContainer>
			<AddButton handleDialog={handleDialog} />
			<EmailButton handleEmailClick={handleEmailClick} />
		</GridToolbarContainer>
	);
}
