import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import api from "../lib/axios"
import toast from "react-hot-toast"
import { Loading } from "../components/Loading"
import { ArrowLeft, Trash2Icon } from "lucide-react"

const NoteDetailPage = () => {
    const [note , setNote] = useState(null)
    const [originalNote , setOriginalNote] = useState(null)
    const [loading , setLoading] = useState(true)
    const [saving , setSaving] = useState(false)

    const navigate = useNavigate()

    const {id} = useParams()

    useEffect(()=>{

      const fetchNote = async()=>{
        try {
          const res = await api.get(`/notes/${id}`)
          console.log(res.data);
          
          setNote(res.data)
          setOriginalNote(res.data)
        } catch (error) {
          console.error("failed to get note",error);
          toast.error("failed to fetch note")
          
        }finally{
          setLoading(false)
        }
      }

      fetchNote()
    },[id])

    const handleDelete = async ()=>{
    if (!window.confirm("are you sure you want to delete this note")) return;
    try {
        await api.delete(`/notes/${id}`)
        toast.success("note deleted successfully")
        navigate('/')
    } catch (error) {
        toast.error("failed to delete note")
        console.error(error);
    }
}
      
    
    const handleSave = async()=>{
      if (!note.title.trim() || !note.content.trim()) {
        toast.error("please add title or content")
        return
      }

      if (note.title === originalNote.title && note.content === originalNote.content) {
        toast.error("no changes detected")
        return
      }


      setSaving(true)
      try {
        await api.put(`/notes/${id}` , note)
        toast.success("note updated successfully")
        navigate('/')

      } catch (error) {
        console.error(error);
        toast.error("failed to update note")
        
      }finally{
        setSaving(false)
      }
    }



    if (loading) {
      return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center">
          <Loading/>
        </div>
      )
    }

  return (
    <div className="min-h-screen bg-base-200">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-6">
          <Link to={"/"} className="btn btn-ghost mb-6">
        <ArrowLeft className="size-5"/>
        back to notes
        </Link>
        <button onClick={()=>handleDelete()} className="btn btn-error btn-outline">
          <Trash2Icon className="size-5"/>Delete Note
        </button>
          </div>
                    <div className="card bg-base-100">
            <div className="card-body">
            <div className="form-control mb-4">
        <label className="label">
          <span className="label-text">
            Title
          </span>
        </label>
      <input type="text" 
      placeholder="Note title" 
      className="input input-bordered"
      value={note.title}
      onChange={(e)=> setNote({...note,title:e.target.value})}/>
      </div>
      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text">
            content
          </span>
        </label>
      <textarea type="text" 
      placeholder="write your content here" 
      className="textarea textarea-bordered h-32"
      value={note.content}
      onChange={(e)=> setNote({...note,content:e.target.value})}/>
      </div>
      <div className="card-actions justify-end">
        <button className="btn btn-primary" disabled={saving} onClick={handleSave}>
          {saving ? "Saving..." : "save changes"}
        </button>
      </div>
            </div>
          </div>
          </div>

        </div>
    </div>
  )
}

export default NoteDetailPage