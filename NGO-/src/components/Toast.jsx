import React, { useEffect } from "react";
import { CheckCircle, Info, X } from "lucide-react";
const Toast = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-bounce-in">
      <div className={`rounded-xl shadow-lg px-6 py-3 flex items-center gap-3 text-white ${type === 'success' ? 'bg-[#4CAF50]' : 'bg-red-500'}`}>
        {type === 'success' ? <CheckCircle size={20} /> : <Info size={20} />}
        <p className="font-medium">{message}</p>
        <button onClick={onClose} className="ml-2 hover:opacity-80"><X size={16} /></button>
      </div>
    </div>
  );
};
export default Toast;