export default function Button({
  children,
  type = "button",
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      {...props}
      className={`px-5 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-900 transition ${className}`}
    >
      {children}
    </button>
  );
}
