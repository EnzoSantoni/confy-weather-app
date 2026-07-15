import { NavLink } from "react-router-dom"

export default function Sidebar() {

    return (
        <nav className="sidebar">
            <div className="sidebar-brand">W</div>
            <NavLink to={"/"} className={({isActive}) => isActive ? "sidebar-item active" : "sidebar-item"} end>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                    <circle cx="12" cy="12" r="4"></circle>
                    <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M18.4 5.6L17 7M7 17l-1.4 1.4"></path>
                </svg>
                <span>Clima</span>
            </NavLink>
            <NavLink to={"/compare"} className={({isActive}) => isActive ? "sidebar-item active" : "sidebar-item"}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 4l3 3-3 3M20 7H7M7 14l-3 3 3 3M4 17h13"></path>
                </svg>
                <span>Comparar</span>
            </NavLink>
            <NavLink to={"/game"} className={({isActive}) => isActive ? "sidebar-item active" : "sidebar-item"}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
                    <rect x="4" y="4" width="16" height="16" rx="3.5"></rect>
                    <circle cx="9" cy="9" r="1.2" fill="currentColor" stroke="none"></circle>
                    <circle cx="15" cy="15" r="1.2" fill="currentColor" stroke="none"></circle>
                </svg>
                <span>Juego</span>
            </NavLink>
        </nav>
    )
}