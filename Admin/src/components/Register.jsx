
import { useState } from 'react'
import {Input} from '../ui'
const Register = () => {
    const [name, setName] = useState('')
    const [rename, setRename] = useState('')
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [pasword, setPasword] = useState('')
  return (
   <div class="bg-gray-100 flex items-center justify-center min-h-screen">

  <div class="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
    <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">Ro'yxatdan o'tish</h2>

    <form class="space-y-4">
      <Input label={'Ism'} state={name} setState={setName}/>
      <Input label={'Familiya'} state={rename} setState={setRename}/>
      <Input label={'Email'} state={email} setState={setEmail}/>
      <Input label={'Username'} state={username} setState={setUsername}/>
      <Input label={'Parol'} state={pasword} setState={setPasword}/>

     

      <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition duration-300">
        Ro'yxatdan o'tish
      </button>
    </form>

    <p class="text-center text-sm text-gray-500 mt-4">
      Akkauntingiz bormi?
      <a href="#" class="text-blue-600 hover:underline">Kirish</a>
    </p>
  </div>

</div>
  )
}

export default Register
