import { useCallback, useEffect, useState } from 'react'
import './App.css'

function App() {
  const[password, setPassword] = useState("");
  const[length, setLength] = useState("6");
  const[numberAllowed,setNumberAllowed] = useState(false)
  const[charAllowed, setCharAllowed] = useState(false)
  const[isCopied,setIsCopied] = useState(false)

  const generatePassword = useCallback(() => {
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str += "0123456789"
    if(charAllowed) str+= "!@#$%^&*(){}:<>?[];',./"
    // console.log(str);
    let pass = ""
    for (let index = 1; index <= length; index++) {
      let random = Math.floor(Math.random()*str.length+1)
      // pass += str[random]
      pass += str.charAt(random)
      
    }
    setPassword(pass)
  },[length, numberAllowed, charAllowed])// dependencies for optimisation


  useEffect(()=>{
    if(isCopied) {
      setIsCopied((prev)=>!prev)
    }
    generatePassword();
  },[length,numberAllowed,charAllowed])//dependencies for calling function on any change in any dependency

  const copyToClipBoard = () =>{
    navigator.clipboard.writeText(password)
    if(!isCopied) {
      setIsCopied((prev)=>!prev)
    }  
  }

  return (
    <>
    <h1>Password Generator</h1>
      <div className='w-full max-w-lg mx-auto shadow-md rounded-lg px-4 py-8 my-8 text-orange-500 bg-gray-800'>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input 
          type="text" 
          name="passwordText" 
          id="passwordId" 
          placeholder='password'
          value={password}
          readOnly
          className='py-3 rounded-lg w-full'/>
          <button className='p-3 bg-blue-500 rounded-lg' onClick={copyToClipBoard}>{isCopied ? "copied" : "copy"}</button>
        </div>

        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input 
            type="range"
            min = {6}
            max = {30}
            className='cursor-pointer'
            onChange={(e)=>{
              setLength(e.target.value)
            }}
            />
            <label>Length: {length}</label>
          </div>


          <div className='gap-x-2'>
            <input 
            type="checkbox" 
            id="numberInput" 
            defaultChecked = {charAllowed}
            onChange={()=>{
              setNumberAllowed((prev)=>!prev)
            }}/>
            <label htmlFor="numberInput">Number</label>
          </div>
           
          <div className='gap-x-2'>
            <input 
            type="checkbox" 
            id="charInput" 
            defaultChecked = {charAllowed}
            onChange={()=>{
              setCharAllowed((prev)=>!prev)
            }}/>
            <label htmlFor="charInput">Special Char</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
