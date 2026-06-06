// Reusable backdrop + panel wrapper used by all modals in the app

export default function ModalShell({ onClose, maxWidth = 'max-w-lg', className = '', children }) {
  return (
    <div
      className="fixed inset-0 z-9998 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onMouseDown={onClose}
    >
      <div
        className={`w-full ${maxWidth} bg-surface border border-line rounded-3xl shadow-card-lg max-h-[90vh] flex flex-col overflow-hidden ${className}`}
        onMouseDown={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
