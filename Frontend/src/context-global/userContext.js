import { createContext, useContext, useEffect, useState } from "react";
import { apigetCheckUser } from "../functions-api/apiUserFunctions";
import { getEditToken, setViewToken } from "functions-api/parameters/tokenManagement";
import Loader from "components/components-general/Loader";

const userContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [STORED_USER, setSTORED_USER] = useState(null);
  const [userIsChecked, setUserIsChecked] = useState(false);

  function updateUser(newUser) {    

    if (!newUser || !newUser.username) return setSTORED_USER (null)
    const {userid,username,email,profile_picture,isAdmin,availible_collections} = newUser;
    setSTORED_USER({
      userid,
      username,
      email,
      profile_picture:profile_picture?profile_picture:null,
      isAdmin:isAdmin?true:false,
      availible_collections:availible_collections?availible_collections:[]
    });
  }

  const checkUser =()=> {
    // let viewToken = getViewToken();
    let editToken = getEditToken();
    // console.log("checking user, user tokens : ", viewToken, editToken);
    if (!editToken ||editToken==='null') {
      setUserIsChecked(true);
      return;
    }
    else apigetCheckUser(editToken)
      .then((response) => {
        const {viewToken,user } = response;  // const { message,viewToken,user } = response;
        updateUser(user)
        if (viewToken) setViewToken(viewToken);
        setUserIsChecked(true);
      }).catch((err) => {
        console.log(err);
        updateUser(null);
        setUserIsChecked(true);
      })
  }

  useEffect(() => {
    checkUser();
    //eslint-disable-next-line
  }, []);

  if (!userIsChecked) return <Loader />;
  return (
    <userContext.Provider value={{ STORED_USER, updateUser }}>
      {children}
    </userContext.Provider>
  );
};

// export const useUpdateUser = () => {
//   window.location.reload();
//   const { updateUser=function(newUser={}){} } = useContext(userContext);
//   return function(newUser={}) {updateUser(newUser)};
//   // return updateUser;
// };

export const useUser = () =>{
  // let user={
  //   userid : '',
  //   username: '',
  //   email:'',
  //   profile_picture:'',
  //   availible_collections:[]
  // }
  const { STORED_USER} = useContext(userContext);
  return STORED_USER;
}

export const useUserID = () => {
  const { STORED_USER } = useContext(userContext);
  let user=STORED_USER?STORED_USER.userid:null;
  return user;
};
