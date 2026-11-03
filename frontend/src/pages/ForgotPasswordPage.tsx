import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = email.includes("@") ? "" : "Geçerli bir e-posta girin.";
    setError(found);
    setSent(found === "");
  }

  return (
    <>
      <p>Kayıtlı e-posta adresinizi yazın, şifre yenileme bağlantısı gönderelim.</p>
      <form className="form" noValidate onSubmit={handleSubmit}>
        {sent && (
          <p className="mesaj mesaj-basari">
            Bağlantı {email} adresine gönderildi (demo).
          </p>
        )}

        <label htmlFor="email">E-posta</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={error ? true : undefined}
        />
        <span className="hata-metni">{error}</span>

        <button type="submit">Bağlantı gönder</button>

        <p className="auth-linkler">
          <Link to="/login">&larr; Girişe dön</Link>
        </p>
      </form>
    </>
  );
}

export default ForgotPasswordPage;
