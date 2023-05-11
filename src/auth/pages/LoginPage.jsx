import imageAuth from "../../assets/image-auth.png";
import logoCalendar from "../../assets/logo-calendar-app.svg";
import { FooterAuth, TabsForms } from "../components";

export const LoginPage = () => {
  
  return (
    <div id="login_page_wrapper">
      <div className="login_page_container row g-0 flex-fill">
        <div className="col-12 col-lg-7 d-none d-md-block">
          <div
            style={{ backgroundImage: `url(${imageAuth})` }}
            className="wrapper-content-auth d-flex flex-column justify-content-center justify-content-lg-start h-100  text-center text-lg-start"
          >
            <div className="container-information m-3 px-5 py-3 py-lg-5 ">
              <h1
                className="text-primary"
              >Programa tu día y administra tus eventos</h1>
              <p>
                Te ayudamos a organizar y administrar tus eventos en un solo
                lugar. Solo iniciar sesión o registrate y empieza a colaborar en
                un solo calendario.
              </p>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-5">
          <div className="wrapper-form-auth d-flex flex-column justify-content-center text-center h-100 p-2 p-lg-5">
            
            <div className="container-form">
              <div className="container-logo mb-5 pb-3">
                <img src={logoCalendar} alt="Logo Calendar App - Fabio Medina" />
              </div>
              <TabsForms />
            </div>
            <div className="container-copyrgith py-4 py-lg-5">
              <FooterAuth />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
