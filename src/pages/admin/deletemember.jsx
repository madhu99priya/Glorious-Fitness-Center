// import React,{useState} from 'react'
// import axios from 'axios'
// // import Spinner from '../../Components/Spinner.jsx'
// import DeleteMemberPopup from '../../Components/DeleteMemberPopup.jsx'
// import { useParams } from 'react-router-dom'

// const Deletemember = () => {

//   const [showPopup, setShowPopup] = useState(false);
//   const {id} = useParams();

//   const handleDeleteMember = (()=>{
//     axios
//       .delete(`http://localhost:9000/members/${id}`)
//       .then(() => {
//         setShowPopup(false);
//       })
//       .catch((err) => {
//         alert('An error is occured. Please check the console')
//         console.log(err)
//       })
     
//   })

//   const handleCancel = () => {
//     setShowPopup(false);
//   };

//   return (
//     <div>

//       <button onClick={() => setShowPopup(true)} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
//         Delete Member
//       </button>

//       {showPopup && (
//         <DeleteMemberPopup onConfirm={handleDeleteMember} onCancel={handleCancel} />
//       )}
      
//     </div>
//   )
// }

// export default Deletemember




// implemented in showmembers component its self
