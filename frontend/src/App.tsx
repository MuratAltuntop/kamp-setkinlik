import "./App.css";
import { useEffect, useState } from "react";
import type { Category } from "./types/campus-event";
import type { PageName } from "./types/page";
import { events } from "./data/events";
import { filterByCategory, findEventById, searchEvents } from "./utils/filter-events";
import Header from "./components/layout/Header";
import Navigation from "./components/layout/Navigation";
import Footer from "./components/layout/Footer";
import EventList from "./components/events/EventList";
import EventFilter from "./components/events/EventFilter";
import EventDetail from "./components/events/EventDetail";
import EventForm from "./components/forms/EventForm";

const SITE_NAME = "Kampüs Etkinlikleri";

function App() {
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");

  function go(next: PageName, id: string | null = null) {
    setPage(next);
    setSelectedId(id);
  }

  const upcoming = [...events].sort((a, b) => a.date.localeCompare(b.date)).slice(0, 2);
  const categories = [...new Set(events.map((e) => e.category))];
  const filtered = filterByCategory(searchEvents(events, searchText), category);
  const selected = selectedId ? findEventById(events, selectedId) : undefined;

  let title = SITE_NAME;
  if (page === "events") title = "Tüm Etkinlikler";
  if (page === "add") title = "Etkinlik Ekle";
  if (page === "update") title = "Etkinlik Güncelle";
  if (page === "detail") title = selected ? selected.title : "Etkinlik bulunamadı";

  const text =
    page === "home"
      ? "Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin."
      : page === "events"
        ? "Kampüste düzenlenen tüm etkinlikler."
        : undefined;

  useEffect(() => {
    document.title = title === SITE_NAME ? SITE_NAME : `${SITE_NAME} — ${title}`;
  }, [title]);

  return (
    <>
      <Header title={title} text={text} />
      <Navigation current={page} onNavigate={go} />

      <main>
        {page === "home" && (
          <>
            <h2>Yaklaşan 2 Etkinlik</h2>
            <EventList events={upcoming} onShowDetail={(id) => go("detail", id)} />
            <div className="hepsi-buton">
              <button type="button" onClick={() => go("events")}>Tüm etkinlikleri gör</button>
            </div>
          </>
        )}

        {page === "events" && (
          <>
            <EventFilter
              searchText={searchText}
              category={category}
              categories={categories}
              onSearchChange={setSearchText}
              onCategoryChange={setCategory}
            />
            {filtered.length > 0 && <p className="sonuc">{filtered.length} etkinlik listeleniyor.</p>}
            <EventList
              events={filtered}
              onShowDetail={(id) => go("detail", id)}
              emptyText="Aramanıza uygun etkinlik bulunamadı."
            />
          </>
        )}

        {page === "detail" && !selected && (
          <section>
            <div className="hata-kutusu">
              "{selectedId ?? "id yok"}" numaralı bir etkinlik yok. Listeden bir etkinlik seçin.
            </div>
            <button type="button" onClick={() => go("events")}>&larr; Listeye dön</button>
          </section>
        )}

        {page === "detail" && selected && (
          <EventDetail event={selected} onBack={() => go("events")} onEdit={(id) => go("update", id)} />
        )}

        {(page === "add" || page === "update") && (
          <EventForm onSubmit={() => window.scrollTo(0, 0)} />
        )}
      </main>

      <Footer />
    </>
  );
}

export default App;
