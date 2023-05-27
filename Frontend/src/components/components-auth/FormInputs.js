import { TextField } from "@mui/material"

const params=(pattern,title)=>({
    margin:'normal',
    required:true,
    fullWidth:true,
    inputProps:{ pattern: pattern,title:title }
})

export const UsernameInput=()=>{
    //eslint-disable-next-line
    //const pattern=`^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$`,
    const pattern='',
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
    return <TextField
        {...params(pattern,title)}
        label="Username"
        name="username"
        autoComplete="username"
    />
}

export const EmailInput=()=>{
    //eslint-disable-next-line
    //const pattern=`[a-z0-9!#$%&'*+/=?^_\`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_\`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?`,
    const pattern='',
        title="Please enter a valid email address"
    return <TextField
        {...params(pattern,title)}
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
    />
}

export const PasswordInput=()=>{
    //const pattern=`^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$`
    const pattern='',
        title='may contain only letters, apostrophe, dash and spaces.'
    return <TextField
        {...params(pattern,title)}
        name="password"
        label="Password"
        type="password"
        autoComplete="current-password"
    />
}