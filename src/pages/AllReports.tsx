import React from 'react'
import { Link } from 'react-router-dom'
import { Container } from '@mui/material'
const AllReports = () => {
  return (
    <Container className='bg-gray-100 mt-10 mb-20 pb-20 rounded-lg drop-shadow-lg'>
   <div className="p-12">
     <form >
       <div className="px-10 grid grid-cols-2 gap-2">
         {/* left */}
         <div className="grid grid-cols-4 gap-2 mr-2">
           <label className="block">
             <span className="font-serif block text-sm text-lg text-slate-700 ">
              Branch:
             </span>
           </label>

           <input
             name="name"
             required
             type="text"
            
             className="mt-2 block w-full px-2 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
         focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 w-96
         disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
         invalid:border-pink-500 invalid:text-pink-600
         focus:invalid:border-pink-500 focus:invalid:ring-pink-500
         col-start-2 col-end-6
       "
           />
           <label className="block">
             <span className="font-serif block text-sm text-lg text-slate-700 ">
             Start Date :
             </span>
           </label>

           <input
             name="originalLoan"
             type="number"
             
             required
             
             className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
         focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
         disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
         invalid:border-pink-500 invalid:text-pink-600
         focus:invalid:border-pink-500 focus:invalid:ring-pink-500
         col-start-2 col-end-6
       "
           />
           <label className="block">
             <span className="font-serif block text-sm text-lg text-slate-700 ">
               End Date :
             </span>
           </label>

           <input
             name="originalLoan"
             type="number"
             
             required
             
             className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
         focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
         disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
         invalid:border-pink-500 invalid:text-pink-600
         focus:invalid:border-pink-500 focus:invalid:ring-pink-500
         col-start-2 col-end-6
       "
           />
           <label className="block">
             <span className="font-serif block text-sm text-lg text-slate-700 ">
               tt:
             </span>
           </label>

           <input
             name="shortName"
             type="text"
             required
           
             className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
         focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
         disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
         invalid:border-pink-500 invalid:text-pink-600
         focus:invalid:border-pink-500 focus:invalid:ring-pink-500
         col-start-2 col-end-6
       "
           />

          
           <label className="block">
             <span className="font-serif block text-sm text-lg text-slate-700 ">
               Detail :
             </span>
           </label>

           <input
             name="originalLoan"
             type="text"
            
             required
             
             className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
         focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
         disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
         invalid:border-pink-500 invalid:text-pink-600
         focus:invalid:border-pink-500 focus:invalid:ring-pink-500
         col-start-2 col-end-6
       "
           />
           <label className="block">
             <span className="font-serif block text-sm text-lg text-slate-700 ">
               Level :
             </span>
           </label>

           <input
             name="originalLoan"
             type="text"
            
             required
             
             className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
         focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
         disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
         invalid:border-pink-500 invalid:text-pink-600
         focus:invalid:border-pink-500 focus:invalid:ring-pink-500
         col-start-2 col-end-6
       "
           />

           <input
             type="submit"
             className="float-right  my-5 bg-[#000] hover:bg-[#ffbb00] hover:text-black text-white font-bold py-2 px-4 border border-blue-700 rounded"
             value="Create"
           />
         </div>

         {/* right */}
         <div className="grid grid-cols-4 gap-2 mr-2"></div>
       </div>
     </form>
   </div>
   </Container>
  )
}

export default AllReports