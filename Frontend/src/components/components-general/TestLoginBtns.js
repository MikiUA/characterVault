import { useEffect, useState } from "react";
// import Section from "../components-general/Section";
import { useUserID } from "context-global/userContext";
import { setEditToken } from "functions-api/parameters/tokenManagement";
import { Button } from "@mui/material";

//template users
const userData = {
  allUsers: ["MikiUA", "Mss", "Admin", " - "],
  MikiUA: {
    editToken:"cuk66zqJVMZwIGxCkmY_pxWxoTfLGFXyrXC4X2IlGho"
  },
  Mss: {
    editToken:"l_raAjErmQC6x5KgSXLoKwVhtBiM1ojfc4w1uxonkBU"
  },
  Admin: {
    editToken: "ips5GwwXxQJpQFcpwvxShOakyLKH9YBd76VvfGxw8DI"
  },
  " - ": {
    editToken: null
  }
};

export default function TestLoginBtns({finishTest = function(){}}) {
  const user=useUserID();
  const [currentUsername, setCurrentUsername] = useState(user);

  function changeUser(newUsername){
    if (newUsername===currentUsername) return
    console.log("user changed from ", currentUsername, " to ", newUsername);
    setCurrentUsername(newUsername);
    
    const { editToken} = userData[newUsername];
    setEditToken(editToken);
    window.location.reload();
    finishTest();
  }
  useEffect(()=>{ 
    if (user && user.username) {
    setCurrentUsername(user.username);
  }
    else setCurrentUsername('-')
  },[user])


  return (
      <div style={{padding:'5%'}}>
        <div>
          {userData.allUsers.map((username) => (
            <Button variant="outlined"
              key={"user_" + username}
              onClick={() => changeUser(username)}
            >
              {username}
            </Button>
          ))}
        </div>
        <div>Current user: {currentUsername}</div>
      </div>
  );
}
