import { React, useEffect } from "react";
import { useLocation } from "react-router-dom";


const Main = ({ children }) => {

    return (
        <main role="main">
            
            {children}
        </main>
    )
}

export default Main;