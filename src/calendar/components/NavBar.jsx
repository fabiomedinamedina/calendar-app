import logoCalendar from "../../assets/logo-calendar-app.svg";

export const NavBar = () => {
  return (
    <nav className="navbar bg-white shadow-sm">
      <div className="container-fluid px-4">
        <a className="navbar-brand" href="/">
          <img
            src={logoCalendar}
            alt="Logo Calendar App - Fabio Medina"
            height="40"
          />
        </a>
        <div className="dropdown">
          <button
            className="btn btn-primary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Emilio
            <span className="position-absolute top-0 start-0 translate-middle badge rounded-pill bg-warning">
              99+
              <span className="visually-hidden">unread messages</span>
            </span>
          </button>
          <ul className="dropdown-menu dropdown-menu-end shadow-lg">
            <li>
              <a className="dropdown-item" href="#">
              <i className="fa-solid fa-gear"></i> Configuraciones
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
              <i className="fa-solid fa-user"></i> Perfil
              </a>
            </li>
            <li><hr className="dropdown-divider" /></li>
            <li>
              <a className="dropdown-item" href="#">
              <i className="fa-solid fa-right-from-bracket"></i> Cerrar sesión
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
