import type { Category } from "../../types/campus-event";

const categoryOptions: Category[] = ["Seminer", "Atölye", "Söyleşi", "Yarışma"];

interface EventFormProps {
  onSubmit: () => void;
}

function EventForm({ onSubmit }: EventFormProps) {
  return (
    <>
      <p>Bu sprintte form sadece görünüm; kayıt yapılmaz.</p>
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <label htmlFor="title">Etkinlik Adı</label>
        <input
          type="text"
          id="title"
          maxLength={80}
          placeholder="Örn. Kariyer Günleri 2026"
          required
        />

        <label htmlFor="category">Kategori</label>
        <select id="category" defaultValue="" required>
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
        <input type="date" id="date" required />

        <label htmlFor="time">Saat</label>
        <input type="time" id="time" required />

        <label htmlFor="location">Yer</label>
        <input
          type="text"
          id="location"
          placeholder="Örn. A Blok Konferans Salonu"
          required
        />

        <label htmlFor="capacity">Kontenjan</label>
        <input type="number" id="capacity" min={1} required />

        <label htmlFor="description">Açıklama</label>
        <textarea id="description" rows={5} required />

        <button type="submit">Kaydet</button>
      </form>
    </>
  );
}

export default EventForm;
