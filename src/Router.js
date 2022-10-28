import Home from 'routes/Home'
import Auth from 'routes/Auth'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from 'components/Navigation';
import Profiles from 'routes/Profiles';

function AppRouter({login,userObj}) {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
    {/* && 로그인이 트루이면 네비게이션실행 */}
    {login && <Navigation userObj={userObj} />}
        <Routes>
            {login ? 
            <>
              <Route path='/' element={<Home userObj={userObj} />} /> 
              <Route path='/profile' element={<Profiles  userObj={userObj}  />} />
            </>
            : 
            <Route path='/' element={<Auth />} />}
        </Routes>
    </BrowserRouter>
  )
}

export default AppRouter;