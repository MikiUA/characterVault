import Box from '@mui/material/Box';

const Body = ({ children }) => (
	<Box
		position='absolute'
		top={0}
		left={0}
		sx={{
			width: "100vw",
			height: "100vh",
			minWidth: '20em',
			minHeight: '20em',
			maxWidth: '120em',
			maxHeight: '100em',
		}}

		display='flex'
		flexDirection='column'

		bgcolor='background.default'
		color='primary.main'
		fontSize='medium'
	>
		{children}
	</Box>
);

const MainApp = ({ children }) => (
	<Box sx={{ flexGrow: 1, overflow: 'auto' }}>
		{children}
	</Box>
);

export default {
	Body, MainApp
}