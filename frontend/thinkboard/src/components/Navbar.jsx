import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-base-300 border-b border-base-content/10">
        <div className="mx-auto max-w-6xl px-4 py-4">
        <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-primary font-mono tracking-tight">Thinkboard</h1>
            <div className="flex items-center gap-4">
                <Link to={'/create'} className="btn btn-primary">
                <Plus className="h-5 w-5"/>
                <span>new note</span>
                </Link>

            </div>
        </div>
        </div>
    </nav>
  )
}
