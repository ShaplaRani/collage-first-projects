import { useContext, useState} from "react";
import { Link } from "react-router-dom";


import { FaEyeSlash, FaEye } from "react-icons/fa";
import { updateProfile } from "firebase/auth";

import { FaRegEnvelopeOpen } from 'react-icons/fa';

import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";


const Register = () => {
  
    const [showPassword, setShowPassword] = useState(false)
    
    const {createUser,  logout} = useContext(AuthContext);

    const handleRegister = e => {
        e.preventDefault();
        const form = new FormData(e.currentTarget)
        const Fname = form.get('fname');
        const Lname = form.get('lname');
        const name = form.get('name');

        const email = form.get('email');
        const password = form.get ('password');
        const accepted= e.target.terms.checked
        console.log(name, Fname, Lname,email,password,accepted);
       
        if(password.length < 6){
            
            Swal.fire('password should be a least 6 characters or larger')
            return;
        }
        if(!/[A-Z]/.test(password)){
            
            Swal.fire('Your password should have at least one capital letter')
            return;
        }
        if(!/[!@#$%^&*()_+{}[\]:;<>,.?~\\-]/.test(password)){
            
            Swal.fire('Your password should have at least one special character')
            return;
        }
        if(!accepted){
            Swal.fire('Please accept our terms and condition')
            return;
        }
        //create user
        createUser(email,password)
        .then(result =>{
            console.log(result.user);
            //logout 
            logout()
            .then()
            .catch(error => console.error(error))
            // update profile
            updateProfile(result.user,{
              displayName:name,
               
            })
            .then(() => {console.log("profile update")})
            .catch( error => console.error(error))
            Swal.fire('User Created Successfully')
        })
        .catch(error => {
            console.error(error)
            
            Swal.fire({
                title: 'Error!',
                text: 'Do you want to continue',
                icon: 'error',
                confirmButtonText: 'Cool'
              })
        })
    }
    return (
        <div className=" bg-blue-100 py-20 container mx-auto rounded-lg my-20">
             
              <div className="">
                <p className="flex justify-center"> 
                 <FaRegEnvelopeOpen className=" text-2xl font-bold text-blue-700"></FaRegEnvelopeOpen></p>
               <h3 className="text-2xl md:text-3xl mt-3  text-center font-medium md:font-bold
                 text-blue-700 "> Register your account</h3>
             </div>
            <div className="w-4/6 lg:w-3/5 bg-white  rounded-lg shadow-md py-10 m-auto mt-10 ">
               
                <form onSubmit={handleRegister} className="w-4/5 md:w-3/4 lg:w-3/4 mx-auto">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-xl font-semibold text-gray-800 mb-1 ">
                                Your First Name:</span>
                        </label>
                        <input type="text" placeholder="Enter your name" name="fname"
                         className="input input-bordered"
                         required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-xl font-semibold text-gray-800 mb-1 ">
                                Your Last Name:</span>
                        </label>
                        <input type="text" placeholder="Enter your name" name="lname"
                         className="input input-bordered"
                         required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-xl font-semibold text-gray-800 mb-1 ">
                                Your Name:</span>
                        </label>
                        <input type="text" placeholder="Enter your name" name="name"
                         className="input input-bordered"
                         required />
                    </div>
                   
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-xl font-semibold text-gray-800 mt-5 mb-1">Email:</span>
                        </label>
                        <input type="email" placeholder="email" name="email" className="input input-bordered"
                         required />
                    </div>
                    <div className="form-control relative">
                        <label className="label">
                            <span className="label-text text-xl font-semibold text-gray-800 mt-5 mb-1">Password:</span>
                        </label>
                        
                         <input type={showPassword? "text": "password"}
                          placeholder="password" 
                          name="password"
                         className="input input-bordered"
                         required />
                         <span onClick={() => setShowPassword(!showPassword)} 
                         className="absolute right-0 bottom-0 mb-4 mr-4 text-gray-600">
                           {
                            showPassword?<FaEyeSlash></FaEyeSlash>:<FaEye></FaEye>
                           }
                         </span>
                        
                        
                    </div>
                     <div className="mt-5 text-base  font-normal text-gray-600">
                        <input type="checkbox" name="terms" id="terms" />
                        <label className="ml-2 " htmlFor="terms"> <a href="">Accept Term & Conditions</a></label>
                     </div>
                    <div className="form-control mt-6">
                        <button className="btn text-xl font-semibold bg-emerald-400 text-white">Register</button>
                    </div>
                </form>
                <p className=" w-4/5 md:w-3/4 lg:w-3/4 m-auto
                 text-center my-7 text-base font-semibold "> Already have an account ? Please <Link to="/login"
                 className="text-blue-700"> Login</Link></p>
            </div>
        </div>
    );
};

export default Register;
