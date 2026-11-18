# Kampüs Etkinlik API (Sprint 8)

## Çalıştırma

```bash
cd backend
npm install
cp .env.example .env   # PORT ve MONGODB_URI (kendi Atlas adresini sadece .env'e yaz)
npm run seed   # örnek 6 etkinliği veritabanına yazar (önce siler)
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
