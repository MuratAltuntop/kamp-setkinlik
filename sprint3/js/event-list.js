import { events } from "./data.js";

function createCard(event) {
    const dateObj = new Date(event.date);
    const formattedDate = dateObj.toLocaleDateString("tr-TR", { day: 'numeric', month: 'long', year: 'numeric' });
    
    return `<article class="kart">
        <img src="${event.image || 'Afis.png'}" alt="${event.title} afişi" style="width: 100%; border-radius: 8px; margin-bottom: 15px; aspect-ratio: 4/3; object-fit: cover; display: block;">
        <h3 style="margin-top: 0;">${event.title}</h3>
        <p class="kategori-badge"><strong>${event.category}</strong></p>
        <p>Tarih: ${formattedDate}, ${event.time}</p>
        <p>Yer: ${event.location}</p>
        <p>Kontenjan: ${event.capacity ? event.capacity + ' kişi' : 'Belirtilmemiş'}</p>
        <p>${event.description}</p>
        <br>
        <a href="etkinlik-detay.html?id=${event.id}">Detayları gör &rarr;</a>
    </article>`;
}

const list = document.querySelector("#etkinlik-listesi");

function render(dizi) {
    list.innerHTML = dizi.map(createCard).join(""); 
}

if (list) {
    if (list.dataset.limit) {
        const yaklasan = [...events]
            .sort((a, b) => a.date.localeCompare(b.date))
            .slice(0, Number(list.dataset.limit));
        render(yaklasan);
    } else {
        render(events);

        const categorySelect = document.querySelector("#kategori-filtre");
        const searchInput = document.querySelector("#arama");
        const sonucSatiri = document.querySelector("#sonuc");

        if (categorySelect && searchInput) {
            const categories = [...new Set(events.map(e => e.category))];
            categories.forEach(cat => {
                const option = document.createElement("option");
                option.value = cat;
                option.textContent = cat;
                categorySelect.appendChild(option);
            });

            function filtrele() {
                const aranan = searchInput.value.toLocaleLowerCase("tr-TR");
                const secilenKategori = categorySelect.value;

                const sonuc = events.filter((e) => {
                    const metinUyuyor = e.title.toLocaleLowerCase("tr-TR").includes(aranan) || 
                                        e.description.toLocaleLowerCase("tr-TR").includes(aranan) ||
                                        e.location.toLocaleLowerCase("tr-TR").includes(aranan);
                    const kategoriUyuyor = secilenKategori === "" || e.category === secilenKategori;
                    return metinUyuyor && kategoriUyuyor;
                });

                if (sonuc.length === 0) {
                    list.innerHTML = "";
                    sonucSatiri.textContent = "Aramanıza uygun etkinlik bulunamadı.";
                } else {
                    render(sonuc);
                    sonucSatiri.textContent = `${sonuc.length} etkinlik listeleniyor.`;
                }
            }

            searchInput.addEventListener("input", filtrele);
            categorySelect.addEventListener("change", filtrele);
            
            const form = document.querySelector("#filtre-formu");
            if (form) {
                form.addEventListener("submit", (e) => e.preventDefault());
            }

            sonucSatiri.textContent = `${events.length} etkinlik listeleniyor.`;
        }
    }
}
