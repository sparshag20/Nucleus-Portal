// import React, { useState } from 'react'
// import axios from 'axios';
// const ExcelData = (props) => {
//     const [data,setData]=useState([]);
//     // const [mail, setMail] = useState("");
//     const getMail = (name) => async () => {
//         // setOpen(!open)
//         try {
//           const config = {
//             headers: {
//               "Content-type": "application/json",
//             },
//           };
    
//           const { data } = await axios.post(
//             "/api/users/getmail",
//             { name },
//             config
//           );
//           // console.log(data);
//         //   setMail(data.email);
//           console.log(name);
//           excel(name,data.email);
//         } catch (error) {
    
//         }
//       }
//       const excel=(name,mail) =>{
//         console.log("admknfassssssssffafafsaaaaaaaaaas");
       
//         setData([[name,mail],...data]);
//         console.log(data);
//       }

//       return (
          
//           <div>
//           {getMail(props.name)}</div>
          
//           

//       )
  
// }

// export default ExcelData
