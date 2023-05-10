export const RegisterForm = () => {
  return (
    <form>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Nombre completo"
        />
      </div>
      <div className="mb-3">
        <input
          type="email"
          className="form-control"
          placeholder="Correo electrónico"
        />
      </div>
      <div className="mb-3">
        <input
          type="password"
          className="form-control"
          placeholder="Contraseña"
        />

        <div className="form-text">
          Nunca compartas tu contraseña con alguien más
        </div>
      </div>
      <button type="submit" className="btn btn-primary col-12 mx-auto d-grid">
        Registrarme
      </button>
    </form>
  );
};
