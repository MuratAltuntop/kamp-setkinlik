import "./App.css";
import { useEffect, useState } from "react";
import type { CampusEvent, Category } from "./types/campus-event";
import { events } from "./data/events";
import {
  filterByCategory,
  findEventById,
  searchEvents,
} from "./utils/filter-events";

type PageName = "home" | "events" | "detail" | "add" | "update";

const SITE_NAME = "Kampüs Etkinlikleri";

const menu: { name: PageName; label: string }[] = [
  { name: "home", label: "Ana Sayfa" },
  { name: "events", label: "Etkinlikler" },
  { name: "add", label: "Ekle" },
];

const categoryOptions: Category[] = ["Seminer", "Atölye", "Söyleşi", "Yarışma"];

const formatDate = (date: string) =>
  new Date(`${date}T00:00:00`).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

function App() {
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");

  function go(next: PageName, id: string | null = null) {
    setPage(next);
    setSelectedId(id);
  }

  const upcoming = [...events]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 2);

  const categories = [...new Set(events.map((e) => e.category))];
  const filtered = filterByCategory(searchEvents(events, searchText), category);

  const selected = selectedId ? findEventById(events, selectedId) : undefined;

  let title = SITE_NAME;
  if (page === "events") title = "Tüm Etkinlikler";
  if (page === "add") title = "Etkinlik Ekle";
  if (page === "update") title = "Etkinlik Güncelle";
  if (page === "detail") title = selected ? selected.title : "Etkinlik bulunamadı";

  useEffect(() => {
    document.title = title === SITE_NAME ? SITE_NAME : `${SITE_NAME} — ${title}`;
  }, [title]);

  function renderCard(event: CampusEvent) {
    return (
      <article className="kart" key={event.id}>
        <h3>{event.title}</h3>
        <p className="kategori-badge">
          <strong>{event.category}</strong>
        </p>
        <p>
          Tarih: {formatDate(event.date)}, {event.time}
        </p>
        <p>Yer: {event.location}</p>
        <p>Kontenjan: {event.capacity} kişi</p>
        <p>{event.description}</p>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            go("detail", event.id);
          }}
        >
          Detayları gör &rarr;
        </a>
      </article>
    );
  }

  return (
    <>
      <header className="site-baslik">
        <h1>{title}</h1>
        {page === "home" && <p>Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin.</p>}
        {page === "events" && <p>Kampüste düzenlenen tüm etkinlikler.</p>}
      </header>

      <nav className="menu">
        {menu.map((item) => (
          <a
            key={item.name}
            href="#"
            aria-current={page === item.name ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              go(item.name);
            }}
          >
            {item.label}
          </a>
        ))}
      </nav>

      <main>
        {page === "home" && (
          <>
            <h2>Yaklaşan 2 Etkinlik</h2>
            <section className="grid-container ana-sayfa-grid">
              {upcoming.map(renderCard)}
            </section>
            <div className="hepsi-buton">
              <button type="button" onClick={() => go("events")}>
                Tüm etkinlikleri gör
              </button>
            </div>
          </>
        )}

        {page === "events" && (
          <>
            <form
              className="filtre"
              onSubmit={(e) => e.preventDefault()}
            >
              <label htmlFor="arama">Etkinlik ara</label>
              <input
                type="search"
                id="arama"
                placeholder="Örn. atölye, kariyer"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <label htmlFor="kategori-filtre">Kategori</label>
              <select
                id="kategori-filtre"
                value={category}
                onChange={(e) => setCategory(e.target.value as Category | "")}
              >
                <option value="">Tümü</option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </form>
            <p className="sonuc">
              {filtered.length === 0
                ? "Aramanıza uygun etkinlik bulunamadı."
                : `${filtered.length} etkinlik listeleniyor.`}
            </p>
            <section className="grid-container tum-etkinlikler-grid">
              {filtered.map(renderCard)}
            </section>
          </>
        )}

        {page === "detail" && !selected && (
          <section>
            <div className="hata-kutusu">
              "{selectedId ?? "id yok"}" numaralı bir etkinlik yok. Listeden bir
              etkinlik seçin.
            </div>
            <button type="button" onClick={() => go("events")}>
              &larr; Listeye dön
            </button>
          </section>
        )}

        {page === "detail" && selected && (
          <article className="detay detay-grid">
            {selected.image && (
              <figure className="detay-afis">
                <img src={selected.image} alt={`${selected.title} afişi`} />
                <figcaption>
                  <i>{selected.title} afişi</i>
                </figcaption>
              </figure>
            )}
            <div className="detay-kunye">
              <h2>{selected.title}</h2>
              <dl>
                <dt>
                  <strong>Tarih</strong>
                </dt>
                <dd>
                  {formatDate(selected.date)}, {selected.time}
                </dd>
                <dt>
                  <strong>Yer</strong>
                </dt>
                <dd>{selected.location}</dd>
                <dt>
                  <strong>Kategori</strong>
                </dt>
                <dd>{selected.category}</dd>
                <dt>
                  <strong>Kontenjan</strong>
                </dt>
                <dd>{selected.capacity} kişi</dd>
              </dl>
            </div>
            <div className="detay-aciklama">
              <h3>Açıklama</h3>
              <p>{selected.description}</p>
              <button type="button" onClick={() => go("events")}>
                &larr; Listeye dön
              </button>
              <button type="button" onClick={() => go("update", selected.id)}>
                Bu etkinliği güncelle
              </button>
            </div>
          </article>
        )}

        {(page === "add" || page === "update") && (
          <>
            <p>Bu sprintte form sadece görünüm; kayıt yapılmaz.</p>
            <form className="form" onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="title">Etkinlik Adı</label>
              <input
                type="text"
                id="title"
                maxLength={80}
                placeholder="Örn. Kariyer Günleri 2026"
              />

              <label htmlFor="category">Kategori</label>
              <select id="category" defaultValue="">
                <option value="" disabled>
                  Seçiniz
                </option>
                {categoryOptions.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>

              <label htmlFor="date">Tarih</label>
              <input type="date" id="date" />

              <label htmlFor="time">Saat</label>
              <input type="time" id="time" />

              <label htmlFor="location">Yer</label>
              <input
                type="text"
                id="location"
                placeholder="Örn. A Blok Konferans Salonu"
              />

              <label htmlFor="capacity">Kontenjan</label>
              <input type="number" id="capacity" min={1} />

              <label htmlFor="description">Açıklama</label>
              <textarea id="description" rows={5} />

              <button type="submit">Kaydet</button>
            </form>
          </>
        )}
      </main>

      <footer>
        <p>Murat Altuntop &middot; 2321032030 &middot; 2026</p>
      </footer>
    </>
  );
}

export default App;
