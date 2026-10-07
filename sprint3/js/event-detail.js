import { events } from "./data.js";

const id = new URLSearchParams(location.search).get("id");
const event = events.find((e) => e.id === id);
const container = document.querySelector("#detay");

if (!event) {
    container.innerHTML = `
        <div style="border: 1px solid red; padding: 1rem; color: red; margin-bottom: 1rem;">
            "${id || 'id yok'}" numaralı bir etkinlik yok. Listeden bir etkinlik seçin.
        </div>
        <a href="etkinlikler.html" style="display:inline-block; padding: 0.5rem 1rem; background: green; color: white; text-decoration: none; border-radius: 4px;">&larr; Listeye dön</a>
    `;
} else {
    document.title = event.title;
    const dateObj = new Date(event.date);
    const formattedDate = dateObj.toLocaleDateString("tr-TR", { day: 'numeric', month: 'long', year: 'numeric' });

    container.innerHTML = `
        <figure style="margin:0;">
            <img src="${event.image || 'Afis.png'}" alt="${event.title} afişi" style="width: 100%; border-radius: 8px; display: block;">
            <figcaption><i>${event.title} afişi</i></figcaption>
        </figure>

        <div>
            <h2>${event.title}</h2>
            <dl>
                <dt><strong>Tarih</strong></dt>
                <dd>${formattedDate}, ${event.time}</dd>
                
                <dt><strong>Yer</strong></dt>
                <dd>${event.location}</dd>
                
                <dt><strong>Kategori</strong></dt>
                <dd>${event.category}</dd>

                <dt><strong>Kontenjan</strong></dt>
                <dd>${event.capacity ? event.capacity + ' kişi' : 'Sınırsız'}</dd>
            </dl>
            
            <h3>Açıklama</h3>
            <p>${event.description}</p>
            <br>
            <a href="etkinlikler.html" style="display:inline-block; padding: 0.5rem 1rem; background: green; color: white; text-decoration: none; border-radius: 4px; margin-right: 0.5rem;">&larr; Listeye dön</a>
            <a href="etkinlik-guncelle.html?id=${event.id}" style="display:inline-block; padding: 0.5rem 1rem; background: green; color: white; text-decoration: none; border-radius: 4px;">Bu etkinliği güncelle</a>
        </div>
    `;
}
