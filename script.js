// script.js

const symbols = ['🍒', '🍋', '🍉', '🍇', '🔔', '⭐'];
let slotIntervals = [];
let attemptCount = 0;
let saldo = 100000;

function spinSlots() {
    const betAmount = parseInt(document.getElementById("betAmount").value);

    // Validasi agar pengguna harus mengisi taruhan
    if (!betAmount || betAmount <= 0) {
        alert("Silakan masukkan jumlah taruhan yang valid.");
        return;
    }

    if (betAmount > saldo) {
        showModal(); // Tampilkan modal jika saldo tidak mencukupi
        return;
    }

    saldo -= betAmount;
    document.getElementById("saldo").textContent = saldo;
    document.getElementById("slotMessage").textContent = "";

    slotIntervals.push(spinSingleSlot("slot1", 100));
    slotIntervals.push(spinSingleSlot("slot2", 150));
    slotIntervals.push(spinSingleSlot("slot3", 200));

    setTimeout(() => stopSlots(betAmount), 3000);
}

function spinSingleSlot(slotId, interval) {
    return setInterval(() => {
        const slotElement = document.getElementById(slotId);
        const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
        slotElement.textContent = randomSymbol;
    }, interval);
}

function stopSlots(betAmount) {
    slotIntervals.forEach(clearInterval);
    slotIntervals = [];

    const slot1 = document.getElementById("slot1").textContent;
    const slot2 = document.getElementById("slot2").textContent;
    const slot3 = document.getElementById("slot3").textContent;
    const slotMessage = document.getElementById("slotMessage");

    if (slot1 === slot2 && slot2 === slot3) {
        const multiplier = Math.floor(Math.random() * 3) + 1;
        const winnings = betAmount * multiplier;
        saldo += winnings;
        document.getElementById("saldo").textContent = saldo;
        slotMessage.textContent = "Udah berapa kali coba, baru menang kan? kalahnya 10x menangnya 1x, yang bener aja, rugi dong";
        slotMessage.style.color = "green";
        attemptCount = 0;
    } else {
        attemptCount++;
        slotMessage.style.color = "red";
        if (attemptCount === 1) {
            slotMessage.textContent = "Udah deh, judol ga bikin kaya, masi mau lanjut?";
        } else if (attemptCount === 2) {
            slotMessage.textContent = "Nah kan masih kalah, udah gausa lanjut";
        } else {
            slotMessage.textContent = "Belum puas juga nih";
        }
    }
}
// script.js

const modal = document.getElementById("modal");

function showModal() {
    modal.style.display = "flex";
}

function closeModal() {
    modal.style.display = "none";
}

// Menutup modal saat mengklik di luar area konten modal
window.onclick = function(event) {
    if (event.target === modal) {
        closeModal();
    }
}

// script.js

function shareSimulation() {
    const shareData = {
        title: 'Izin Bagikan Simulasi Judol ini',
        text: `Izin Bagikan Simulasi Judol ini\n\n${window.location.href}\n\nCoba klik link diatas, dan Ayo coba simulasi ini untuk tahu alur dan bahaya dari judi online. Judol itu bisa bikin nagih, dan ujung-ujungnya bikin rugi! Yuk coba simulasinya di sini! Aman kok, ini hanya simulasi tentang bahaya judi online :)`,
        url: window.location.href
    };

    if (navigator.share) {
        navigator.share(shareData)
            .then(() => console.log('Berhasil dibagikan!'))
            .catch((error) => console.error('Gagal membagikan', error));
    } else {
        alert("Fitur berbagi tidak tersedia di browser ini. Silakan salin tautan ini dan bagikan secara manual.");
    }
}
