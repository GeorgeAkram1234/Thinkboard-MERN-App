import { FileTextIcon } from "lucide-react";

export default function NotesNotFound() {
  return (
    <div className="flex justify-center py-20 px-4">
      <div className="text-center space-y-4">
        <FileTextIcon className="w-12 h-12 text-base-content/30 mx-auto" />
        <h2 className="text-2xl font-bold">No Notes Found</h2>
        <p className="text-base-content/60 max-w-sm">
          You haven't created any notes yet. Start by adding your first note!
        </p>
        
      </div>
    </div>
  );
}
