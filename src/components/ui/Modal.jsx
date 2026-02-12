export default function Modal({ open, children }) {
  if (!open) return null
  return (
    <div className='fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center'>
      <div className='bg-white p-6 rounded-xl w-full max-w-lg'>
        {children}
      </div>
    </div>
  )
}