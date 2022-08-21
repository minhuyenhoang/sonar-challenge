import { useEffect, useState } from 'react';
import { AddDialog } from './components/dialog';
import Table from './components/table';

function App() {
	const [list, setList] = useState([]);
	const [openDialog, setOpenDialog] = useState(false);

	const handleClick = () => {
		setOpenDialog(true);
	};

	const handleClose = () => {
		setOpenDialog(false);
	};

	useEffect(() => {
		async function initUsers() {
			try {
				const response = await fetch('http://localhost:8000/users/');
				const users = await response.json();
				setList(users);
			} catch (err) {
				return setList([]);
			}
		}
		initUsers();
	}, []);

	return (
		<div className='text-center p-10 mx-auto'>
			<div className='w-full'>
				<h1 className='text-4xl pb-10'>Emails Survey</h1>
				<div className='flex w-full justify-center'>
					<Table list={list} setList={setList} handleDialog={handleClick} />
				</div>
				<AddDialog
					open={openDialog}
					onClose={handleClose}
					list={list}
					setList={setList}
				/>
			</div>
		</div>
	);
}

export default App;
