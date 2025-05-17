

const Input = ({label, state, setState}) => {
  return (
   <div>
        <label class="block text-sm font-medium text-gray-700">{label}</label>
        <input 
        type="text" 
        class="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
        value={state}
        onChange={e => setState(e.target.value)}
        placeholder={label} />
      </div>
  )
}

export default Input