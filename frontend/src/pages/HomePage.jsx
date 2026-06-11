import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import RateLimitedUI from "../components/RateLimitedUI"
// import axios from "axios"
import toast from "react-hot-toast"
import { Loading } from "../components/Loading"
import NoteCard from "../components/NoteCard"
import api from "../lib/axios"
import NotesNotFound from "../components/NotesNotFound"

const HomePage = () => {
  const [isRateLimited , setRateLimited] = useState(false)
  const [notes , setNotes] = useState([])
  const [loading , setLoading] = useState(true)


  useEffect( ()=>{
      const getNotes = async ()=> {
    try {
      const response = await api.get('/notes')
      
      console.log(response.data );
      setNotes(response.data)
      setRateLimited(false)

    } catch (error) {
      console.log(error , "error fetching notes");

      if(error.response?.status === 429){
        setRateLimited(true)
      } 
      else {
        toast.error("failed to load notes")
      }
      
    }finally{
        setLoading(false)
      }
  }

      getNotes()
  },[])

  return (
    <div className="min-h-screen">
      <Navbar />
      {isRateLimited && <RateLimitedUI/>}

      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && <div className="mt-32 flex justify-center"><Loading/></div>}
        {notes.length === 0 && !isRateLimited && !loading && <NotesNotFound/>}
        {notes.length > 0 && !isRateLimited && 
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note)=>(
              <NoteCard key={note._id} note={note} setNotes={setNotes}/>
            ))}
          </div>}
      </div>
    </div>
  )
}

export default HomePage