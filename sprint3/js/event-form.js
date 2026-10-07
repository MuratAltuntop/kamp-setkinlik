import { events } from "./data.js";

const form = document.querySelector("#etkinlik-formu");
const mesajBox = document.querySelector("#form-mesaj");

if (form && form.dataset.mode === "guncelle") {
    const id = new URLSearchParams(location.search).get("id");
    const etkinlik = events.find((e) => e.id === id);

    if (id && etkinlik) {
        form.elements.ad.value = etkinlik.title;
        form.elements.kategori.value = etkinlik.category;
        form.elements.tarih.value = etkinlik.date;
        form.elements.saat.value = etkinlik.time;
        form.elements.yer.value = etkinlik.location;
        form.elements.kontenjan.value = etkinlik.capacity !== null ? etkinlik.capacity : "";
        form.elements.aciklama.value = etkinlik.description;
    } else {
        form.outerHTML = `
            <div style="border: 1px solid red; padding: 1rem; color: red; margin-bottom: 1rem;">
                Güncellenecek etkinlik seçilmedi veya bulunamadı. Önce listeden bir etkinlik seçin, detay sayfasındaki "Bu etkinliği güncelle" butonunu kullanın.
            </div>
            <a href="etkinlikler.html" style="display:inline-block; padding: 0.5rem 1rem; background: green; color: white; text-decoration: none; border-radius: 4px;">Etkinliklere git</a>
        `;
    }
}

// We re-query the form because outerHTML might have removed it
const activeForm = document.querySelector("#etkinlik-formu");

if (activeForm) {
    activeForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const fd = new FormData(activeForm);
        const data = {
            id: activeForm.dataset.mode === "guncelle" ? new URLSearchParams(location.search).get("id") : "event-" + Date.now(),
            title: fd.get("ad").trim(),
            category: fd.get("kategori"),
            date: fd.get("tarih"),
            time: fd.get("saat"),
            location: fd.get("yer").trim(),
            capacity: fd.get("kontenjan") ? Number(fd.get("kontenjan")) : null,
            description: fd.get("aciklama").trim()
        };

        const errors = {};

        const fields = ["ad", "kategori", "tarih", "saat", "yer", "kontenjan", "aciklama"];
        fields.forEach(f => {
            const el = activeForm.elements[f];
            if(el) {
                el.removeAttribute("aria-invalid");
                const errSpan = document.getElementById(`${f}-hata`);
                if(errSpan) errSpan.textContent = "";
            }
        });

        if (data.title.length < 3) {
            errors.ad = "En az 3 karakter olmalı.";
            activeForm.elements.ad.setAttribute("aria-invalid", "true");
            document.getElementById("ad-hata").textContent = errors.ad;
            document.getElementById("ad-hata").style.color = "red";
        }

        if (!data.category) {
            errors.kategori = "Bir kategori seçin.";
            activeForm.elements.kategori.setAttribute("aria-invalid", "true");
            document.getElementById("kategori-hata").textContent = errors.kategori;
            document.getElementById("kategori-hata").style.color = "red";
        }

        if (!data.date) {
            errors.tarih = "Tarih seçin.";
            activeForm.elements.tarih.setAttribute("aria-invalid", "true");
            document.getElementById("tarih-hata").textContent = errors.tarih;
            document.getElementById("tarih-hata").style.color = "red";
        }

        if (!data.time) {
            errors.saat = "Saat seçin.";
            activeForm.elements.saat.setAttribute("aria-invalid", "true");
            document.getElementById("saat-hata").textContent = errors.saat;
            document.getElementById("saat-hata").style.color = "red";
        }

        if (!data.location) {
            errors.yer = "Yer bilgisini yazın.";
            activeForm.elements.yer.setAttribute("aria-invalid", "true");
            document.getElementById("yer-hata").textContent = errors.yer;
            document.getElementById("yer-hata").style.color = "red";
        }

        if (fd.get("kontenjan") && (data.capacity < 1 || data.capacity > 1000)) {
            errors.kontenjan = "1-1000 arası olmalı.";
            activeForm.elements.kontenjan.setAttribute("aria-invalid", "true");
            document.getElementById("kontenjan-hata").textContent = errors.kontenjan;
            document.getElementById("kontenjan-hata").style.color = "red";
        }

        if (Object.keys(errors).length > 0) {
            return;
        }

        mesajBox.innerHTML = `
            <div style="border: 1px solid green; padding: 1rem; color: green; margin-top: 1rem; border-radius: 4px; background-color: #f0fff0;">
                ${activeForm.dataset.mode === "guncelle" ? "Etkinlik güncellendi" : "Etkinlik oluşturuldu"} (bu sprintte kaydedilmez):<br>
                <pre style="margin-top: 1rem; overflow-x: auto;">${JSON.stringify(data, null, 2)}</pre>
            </div>
        `;
        
        console.log(data);
    });
}
