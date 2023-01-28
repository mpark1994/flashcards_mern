import './Header.css'
import { Link } from 'react-router-dom'

export function Header() {
    return (
        <div className="Header">
            <div className="container">
                <div>
                    <a href={"/"}>FlashCards</a>
                </div>

                <div>
                    <a href={"/"}>Decks</a>
                </div>

                <div>
                    <a href={"/"}>Login</a>
                </div>
            </div>
        </div>
    )
}