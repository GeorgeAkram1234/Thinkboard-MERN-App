import { Clock } from "lucide-react";

export default function RateLimitedUI() {
  return (
    <div className="flex justify-center py-20 px-4">
      <div className="text-center space-y-4">
        <Clock className="w-12 h-12 text-warning mx-auto" />
        <h2 className="text-2xl font-bold">Rate Limit Reached</h2>
        <p className="text-base-content/60 max-w-sm">
          Too many requests. Please wait a moment and try again.
        </p>
      </div>
    </div>
  );
}
