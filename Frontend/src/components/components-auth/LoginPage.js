import * as React from 'react';
import Button from '@mui/material/Button';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
import LinkUI from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import FormContainer from './FormContainer';
import { EmailInput, PasswordInput } from './FormInputs';

import { Link } from 'react-router-dom';

export default function LoginPage() {
  const [signin,{isLoading}]=[function(){},{isLoading:false}];

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body={
      email: data.get('email'),
      password: data.get('password'),
    }
    console.log(body);
    signin(body);
  };

  return (
    <FormContainer handleSubmit={handleSubmit} title='Sign In'>
      <EmailInput/>
      <PasswordInput/>
      {/* <FormControlLabel
        control={<Checkbox value="remember" color="primary" />}
        label="Remember me"
        
      /> */}
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled={isLoading}
      >
        {isLoading?'please wait':'Sign In'}
      </Button>

      <Grid container>
        <Grid item xs>
          <LinkUI variant="body2" onClick={()=>{alert('Too bad, we can not recover your password')}}>
            Forgot password?
          </LinkUI>
        </Grid>
        <Grid item>
          <Link to="../signup">
          <LinkUI  variant="body2">
            {"Don't have an account? Sign Up"}
          </LinkUI>
          </Link>
        </Grid>
      </Grid>
    </FormContainer>
  );
}