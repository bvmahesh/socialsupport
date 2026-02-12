export default function TextArea(props) {
  return (
    <textarea
      className='w-full border p-3 rounded focus:ring-2 focus:ring-blue-500'
      {...props}
    />
  )
}