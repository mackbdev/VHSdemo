const Logo = ({ props }) => {

    return (
        
        <div className="logocontain">
            <a href='/' style={{all:'unset', width: '100%', cursor:'pointer'}}>
                <img src="/logo.gif" alt="logo" className="logo" />
         </a>
        </div>
       
    )
};

export default Logo;