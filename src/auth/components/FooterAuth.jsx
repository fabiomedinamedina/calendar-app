import logoFM from "/logo-fm-copyright.svg";

export const FooterAuth = () => {
  return (
    <footer className="mt-3 lg-5 mb-4 mx-3 d-flex flex-column text-center text-lg-end">
      <a href="https://fabiomedina.com">
        <img src={logoFM} alt="Logo Fabio Medina" className="pb-2" />
      </a>
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
      <div className="social-links d-flex gap-2 justify-content-center justify-content-lg-end">
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
    </footer>
    
  );
};
