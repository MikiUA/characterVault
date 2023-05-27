import { useUserID } from "context-global/userContext";
import { Navigate } from "react-router-dom";

//usage example <Route path='/mycharacters' element={<RestrictedElement element={<MyCharacters/>}/>}/>
export function RestrictedElement({element}){
    const user=useUserID();
    if (!user) return <Navigate to='/auth'></Navigate>;
    return element;
}
export function AuthElement({element}){
    const user=useUserID();
    if (user) return <Navigate to='/'></Navigate>;
    return element;
}