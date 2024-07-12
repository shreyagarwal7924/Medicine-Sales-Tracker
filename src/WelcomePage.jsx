import { Link } from "react-router-dom";
import './WelcomePage.css'

function WelcomePage() {
    return (
        <header>
             <h1> Welcome to the Medicine Sales Tracker! </h1>
             <div className="underline"></div>
             <div className = 'link'><Link  to= "/LoginForm"> <button className= "login"> Login</button></Link> </div>
             <div className = 'link'> <Link to= "/SignUp"> <button className="signup"> Create a new account</button></Link> </div>
        </header>
    );
}

export default WelcomePage;