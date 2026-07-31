import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

function Layout() {

    return(

        <div style={{display:"flex"}}>

            <Sidebar/>

            <div style={{flex:1}}>

                <Navbar/>

                <Outlet/>

            </div>

        </div>

    );

}

export default Layout;