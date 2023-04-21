import { useState, useEffect } from "react"
import { FaUser } from "react-icons/fa"


function Register() {
    const [formData,setFormData] = useState({
        name:"",
        email:"",
        password:"",
        password2:""
        
    })
    const {name,email,password,password2} = formData

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
        
    }

    

    const onSubmit = (e) => {
        e.preventDefault()
        console.log(formData)

    }

  return (
    <>
    <section className="heading"> 
    <h1>
        <FaUser /> Register
    </h1>
    <p>Please Create an Account</p>

    </section>
    <section className="from">
        <form onSubmit={onSubmit}>
            <div className="form-group">
            <input type="text" className="form-control" id='name' name='name' value={name} placeholder="Please Enter your Name" onChange={onChange} />
            </div>
            <div className="form-group">
            <input type="email" className="form-control" id='email' name='email' value={email} placeholder="Please Enter your Email" onChange={onChange} />
            </div>
            <div className="form-group">
            <input type="password" className="form-control" id='password' name='password' value={password} placeholder="Please Enter your New Password" onChange={onChange} />
            </div>
            <div className="form-group">
            <input type="password" className="form-control" id='password2' name='password2' value={password2} placeholder="Please Confirm Password" onChange={onChange} />
            </div>
            <div className="form-group">
                <button type="submit" className="btn btn-block">Submit</button>
            </div>
        </form>

    </section>
    </>
  )
}

export default Register