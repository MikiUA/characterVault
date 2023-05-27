import * as React from 'react';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import LinkUI from '@mui/material/Link';
import Grid from '@mui/material/Grid';

import { Link } from 'react-router-dom';
import FormContainer from './FormContainer';
import { EmailInput, PasswordInput, UsernameInput } from './FormInputs';


export default function SignUpPage() {
  const [signup,{isLoading}]=[function(){},{isLoading:false}];
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = {
      name: data.get('username'),
      email: data.get('email'),
      password: data.get('password'),
    }
    console.log(body);
    signup(body);
  };

  return (
    <FormContainer handleSubmit={handleSubmit} title='Sign Up'>
      <EmailInput/>
      <UsernameInput/>
      <PasswordInput/>
      <FormControlLabel
        control={<Checkbox value="allowExtraEmails" color="primary" checked={false} onChange={()=>{alert("No you don't")}}/>}
        label="I want to receive inspiration, marketing promotions and updates via email."
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled={isLoading}
      >
        {isLoading?'Please wait':'Sign Up'}
      </Button>
      <Grid container justifyContent="flex-end">
        <Grid item>
          <Link to='../login'>
          <LinkUI variant="body2">
            Already have an account? Sign in
          </LinkUI>
          </Link>
        </Grid>
      </Grid>
    </FormContainer>
  );
}