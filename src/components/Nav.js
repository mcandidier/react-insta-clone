import React from 'react';


function Nav() {
    return (
        <div className="app__header">

            <div className="left">
                <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="instagram logo"/>
            </div>
            <div className="center">
                <form>
                    <input type="search" placeholder="search"></input>
                </form>

            </div>
            <div className="right">
                {/* <h3>Right content</h3> */}
            </div>
        </div>
    )
}

export default Nav;