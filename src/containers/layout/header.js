import { Link } from "react-router-dom"

const Header = () => {
    return(
        <header>
            <section className="container">
                <Link to='/'><div className="logo-name">Hacker News</div></Link>
            </section>
        </header>
    )
}

export default Header