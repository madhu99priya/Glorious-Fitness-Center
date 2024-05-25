
import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home.jsx'
//import {Dashboard} from './pages/admin/admindashboard.jsx'
//import Admindashboard from './pages/admin/admindashboard.jsx'
import Dashboard from './pages/admin/Dashboard.jsx'
import Showmembers from './pages/admin/Showmembers.jsx';
import Showmember from './pages/admin/Showmember.jsx';
import Addmember from './pages/admin/addmember.jsx';
import Editmember from './pages/admin/editmember.jsx';
import UnapprovedMembers from './pages/admin/UnapprovedMembers.jsx'
import RegistrationForm from './Components/RegistrationForm/RegistrationForm.jsx';


function App() {
  
  return (
    
    < Routes >

       < Route path = '/' element = { <Home />} />
       < Route path = 'admindashboard' element = { <Dashboard />}/> 
       < Route path = 'admindashboard/members' element = { <Showmembers/>} />
       < Route path = 'admindashboard/members/show/:id' element = { < Showmember/> } />
       < Route path = 'admindashboard/members/create'  element = { <Addmember />} />
       < Route path = 'admindashboard/members/edit/:id' element= { <Editmember />} />
       < Route path = 'admindashboard/newregistrations' element = { < UnapprovedMembers /> } />
       < Route path = 'registrationform' element = { < RegistrationForm/>} />
       {/* relative links */}
    
    </Routes>
  )
}


export default App
