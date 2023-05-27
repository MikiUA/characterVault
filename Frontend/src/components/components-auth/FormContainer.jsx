import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import LinkUI from '@mui/material/Link';

function CreatedBy(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Website created by '}
      <LinkUI color="inherit" href="https://github.com/MikiUA/">
        MikiUA
      </LinkUI>{' '}
      2023.
    </Typography>
  );
}

export default function FormContainer({handleSubmit,title,children}) {
  return (
    <Container component="main" maxWidth="xs">
    <CssBaseline />
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        {title}
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
        {children}
      </Box>
    </Box>
    <CreatedBy sx={{ mt: 8, mb: 4 }} />
  </Container>
  )
}
