import Label from '../atoms/Label';
import Input from '../atoms/Input';

export default function FormField({
  label,
  name,
  id,
  type = 'text',
  error,
  touched,
  ...props
}) {

  const hasError = error && touched;
  // Fall back to `name` for the id so the label's htmlFor always matches a real id.
  const inputId = id || name;

  return (
    <div className="mb-4">
      {label && <Label htmlFor={inputId}>{label}</Label>}
      <Input
        id={inputId}
        type={type}
        name={name}
        error={error}
        touched={touched}
        {...props}
      />
      {hasError && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}