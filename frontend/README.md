Canlı link: 

# Kampüs Etkinlikleri · Sprint 4

Sprint 3'teki 5 sayfalı site Vite + React + TypeScript ile yeniden yazıldı. React Router yok; sayfa geçişi `useState` ile yapılır (Router Sprint 6'da).

## Çalıştırma

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # üretim derlemesi (dist/)
npm run preview  # build çıktısını aç
```

## Dosyalar

| Dosya | Görevi |
|---|---|
| `package.json` | Proje adı, komutlar (dev, build) ve paket listesi. |
| `package-lock.json` | Yüklenen paketlerin tam sürümleri. |
| `node_modules/` | İndirilen paketler; GitHub'a gitmez. |
| `tsconfig*.json` | TypeScript ayarları. |
| `vite.config.ts` | Vite ayarı ve React eklentisi. |
| `index.html` | Tek HTML dosyası; içinde boş `div#root` var. |
| `src/main.tsx` | React'i başlatır, `App`'i `root`'a çizer. |
| `src/App.tsx` | Uygulamanın ana bileşeni; 5 sayfanın hepsi burada. |
| `src/App.css` | Sprint 3 CSS'i ve Sprint 4 eklemeleri. |
| `src/index.css` | Tüm sayfaya genel stil; bu sprintte boş. |
| `src/types/campus-event.ts` | `Category` ve `CampusEvent` tipleri. |
| `src/data/events.ts` | Tipli 6 etkinlik kaydı. |
| `src/utils/filter-events.ts` | Saf fonksiyonlar: `searchEvents`, `filterByCategory`, `findEventById`. |
| `public/` | Olduğu gibi kopyalanan dosyalar (afiş, favicon). |
