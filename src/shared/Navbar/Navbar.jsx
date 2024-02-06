import { NavLink } from "react-router-dom";


const Navbar = () => {
    return (
        <div className=" flex  mt-10 justify-center container mx-auto">
        <NavLink
        
        to="/register"
       
    >
    <a className="text-lg  md:text-xl font-semibold">Register</a>

    </NavLink>
       </div>
    );
};

export default Navbar;