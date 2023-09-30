import logoFM from "/logo-fm-copyright.svg";


export const FooterCalendar = () => {
  return (
    <footer className="mt-3 lg-5 mb-4 mx-3 row align-items-center">
      <div className="col-12 col-md-4 text-center text-md-end order-0 order-md-1">
        <a href="https://fabiomedina.com">
          <img src={logoFM} alt="Logo Fabio Medina" className="pb-2" />
        </a>
      </div>
      <div className="col-12 col-md-8 text-center text-md-start order-1 order-md-0">
        <small>
          ©2023 Todos los derechos reservados.
          <a
            href="https://fabiomedina.com"
            target="blank"
            className="ms-2 copyright-link d-inline-flex"
          >
            Fabio Medina Medina
          </a>
        </small>
        <div className="social-links d-flex gap-2 justify-content-center justify-content-md-start">
          <a
            href="https://www.linkedin.com/in/fabio-medina-medina/"
            target="blank"
            className="link-secondary"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/fabiomedinamedina"
            target="blank"
            className="link-secondary"
          >
            GitHub
          </a>
          <a
            href="https://github.com/fabiomedinamedina/calendar-app"
            target="blank"
            className="link-secondary"
          >
            Source code
          </a>
        </div>
      </div>
    </footer>
  );
};
