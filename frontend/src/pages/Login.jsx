import { useState, useEffect } from "react"
import { FaSignInAlt } from "react-icons/fa"
import {useSelector,useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {login, reset} from '../features/Auth/authSlice'

import Spinner from "../components/Spinner"



function Login() {
    const [formData,setFormData] = useState({
     
        email:"",
        password:"",
       
        
        
    })
    const {email,password} = formData
    const navigate =  useNavigate()
    const dispatch = useDispatch()
    const {user, isLoading,isSuccess,isError,message} = useSelector((state)  => state.auth) 
    useEffect(() => {
        if(isError){
            toast.error(message)
        }
        if(isSuccess || user){
            
            navigate('/')
        }
        dispatch(reset())


    }, [user,isError,isSuccess,isLoading,message,navigate,dispatch])
    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
        
    }
   



    

    const onSubmit = (e) => {
        e.preventDefault()
        console.log(formData)
        const userData = {
            email,
            password,
        }
        dispatch(login(userData))


    }
    if(isLoading) {
        return <Spinner />
    }

  return (
    <>
    <section className="heading"> 
    <h1>
        <FaSignInAlt /> Login
    </h1>
    <p>Please Login into Your Account</p>

    </section>
    <section className="from">
        <form onSubmit={onSubmit}>
            
            <div className="form-group">
            <input type="email" className="form-control" id='email' name='email' value={email} placeholder="Please Enter your Email" onChange={onChange} />
            </div>
            <div className="form-group">
            <input type="password" className="form-control" id='password' name='password' value={password} placeholder="Please Enter your New Password" onChange={onChange} />
            </div>
           
            <div className="form-group">
                <button type="submit" className="btn btn-block">Submit</button>
            </div>
        </form>

    </section>
    </>
  )
}

export default Login