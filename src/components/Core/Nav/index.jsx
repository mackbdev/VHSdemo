import DivContainer from '../../Containers/DivContainer'
import LoginButton from '../../Buttons/LoginButton'
import MyBlocksButton from '../../Buttons/MyBlocksButton'
import HomeButton from '../../Buttons/HomeButton'
import Logo from '../../Misc/Logo'

// toggle between views
const Nav = ({ props }) => {

    const { isUserLoggedIn } = { ...props }

    return (
        <DivContainer containerClass={{class:'navcontain'}}>
            <div className="nav">
                <DivContainer containerClass={{class:'leftcontain'}}>
                    <Logo />
                </DivContainer>
                <DivContainer containerClass={{class:'rightnavcontain'}}>
                    <HomeButton props={props} />

                    <LoginButton props={props} />
                    {isUserLoggedIn && <MyBlocksButton props={props} />}

                </DivContainer>
            </div>
        </DivContainer>
    )
};

export default Nav;