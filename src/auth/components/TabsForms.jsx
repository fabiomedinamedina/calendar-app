import { LoginForm, RegisterForm } from "./";

export const TabsForms = () => {
  return (
    <div className="wrapper-tabs">
      <ul
        className="nav nav-pills justify-content-center"
        id="myTab"
        role="tablist"
      >
        <li className="nav-item" role="presentation">
          <button
            className="nav-link active"
            id="login-tab"
            data-bs-toggle="tab"
            data-bs-target="#login-tab-pane"
            type="button"
            role="tab"
            aria-controls="login-tab-pane"
            aria-selected="true"
          >
            Iniciar sesión
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link"
            id="singup-tab"
            data-bs-toggle="tab"
            data-bs-target="#singup-tab-pane"
            type="button"
            role="tab"
            aria-controls="singup-tab-pane"
            aria-selected="true"
          >
            Registrarse
          </button>
        </li>
      </ul>
      <div className="tab-content" id="myTabContent">
        <div
          className="tab-pane fade show active"
          id="login-tab-pane"
          role="tabpanel"
          aria-labelledby="login-tab"
        >
          <LoginForm />
        </div>
        <div
          className="tab-pane fade"
          id="singup-tab-pane"
          role="tabpanel"
          aria-labelledby="singup-tab"
        >
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};
