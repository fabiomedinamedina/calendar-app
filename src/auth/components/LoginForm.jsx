export const LoginForm = () => {
  return (
    <form>
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
        Iniciar sesión
      </button>
    </form>
  );
};
