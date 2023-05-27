import React from 'react'
import { useSearchParams } from 'react-router-dom'

const defaultMessages={
  '-1' :'We have encountered an unexpected error in application. You can report the issue if you go to the Contacts page',
  '404':'The resourse you are trying to access is not found',
  '401':'The resourse you are trying to access requires authorisation',
  '403':'You have no access to the resourse you are trying to access',
  '500':'We have encountered an unexpected error on our servers.'
}

export default function ErrorPage() {
  let err=useSearchParams()[0],
    status=err.get('status'),
    message=err.get('message');
    
  if (!status) status='-1';
  if (!message){
    message=defaultMessages[status];
    if (!message) message=defaultMessages['-1'];
  };

  return (
    <div>
        status : {status}<br/>
        message : {message}
    </div>
  )
}
