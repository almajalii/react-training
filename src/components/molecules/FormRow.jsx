export default function FormRow({ children, className = '' }) {
  return <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${className}`}>{children}</div>;
}
