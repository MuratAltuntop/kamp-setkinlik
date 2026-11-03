import { useLocation } from "react-router-dom";

const SITE_NAME = "Kampüs Etkinlikleri";

const titles: Record<string, string> = {
  "/events": "Tüm Etkinlikler",
  "/admin": "Etkinlik Yönetimi",
  "/admin/new": "Etkinlik Ekle",
  "/login": "Giriş Yap",
  "/register": "Kayıt Ol",
  "/forgot-password": "Şifremi Unuttum",
};

const texts: Record<string, string> = {
  "/": "Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin.",
  "/events": "Ekim ayında kampüste düzenlenen etkinlikler.",
};

function Header() {
  const { pathname } = useLocation();

  let title = titles[pathname] ?? SITE_NAME;
  if (/^\/events\/[^/]+$/.test(pathname)) title = "Etkinlik Detayı";
  if (/^\/admin\/[^/]+\/edit$/.test(pathname)) title = "Etkinlik Güncelle";

  const text = texts[pathname];

  return (
    <header className="site-baslik">
      <h1>{title}</h1>
      {text && <p>{text}</p>}
    </header>
  );
}

export default Header;
