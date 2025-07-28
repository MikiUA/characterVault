import { Routes,Route, Navigate} from 'react-router-dom'
import LoginPage from 'components/components-auth/LoginPage'
import SignUpPage from 'components/components-auth/SignupPage'

export default function AuthPage() {
  // const [sp,setSP]=useSearchParams();
  // const navigate=useNavigate
  // useEffect(()=>{
  //   const action=sp.get('action')
  //   if (sp==='login') navigate ('/login')
  //   if (sp==='signout')
  // },[]);
  return (
    <Routes>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/signup' element={<SignUpPage/>}/>
      <Route path='/*' element={<Navigate to='/signup'/>}/>
    </Routes>
  )
}
