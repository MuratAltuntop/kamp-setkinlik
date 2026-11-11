# Kampüs Etkinlik API (Sprint 7)

## Çalıştırma

```bash
cd backend
npm install
cp .env.example .env   # PORT değişkeni (varsayılan 3000)
npm run dev
```

## REST sözleşmesi

| Method | Endpoint     | Amaç           | Başarılı | Hata     | Durum    |
|--------|--------------|----------------|----------|----------|----------|
| GET    | /health      | Sunucu durumu  | 200      | —        | Bu sprint |
| GET    | /events      | Listeyi getir  | 200      | —        | Bu sprint |
| GET    | /events/:id  | Tek etkinlik   | 200      | 404      | Bu sprint |
| POST   | /events      | Yeni etkinlik  | 201      | 400      | Bu sprint |
| PATCH  | /events/:id  | Güncelle       | 200      | 400, 404 | Sprint 9 |
| DELETE | /events/:id  | Sil            | 204      | 404      | Sprint 9 |

Bütün hatalar aynı biçimde döner:

```json
{ "error": { "message": "Event not found" } }
```
