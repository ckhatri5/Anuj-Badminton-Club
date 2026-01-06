import { store, seedData, resetData } from './store.js';
import { initRouter } from './router.js';
import {
    renderers,
    handleImageUpload,
    deleteMemory,
    handleQRUpload,
    updatePlayerPhoto,
    addPlayer,
    deletePlayer,
    updateNote,
    updateUPI,
    logDonation,
    recordMatch,
    updateFunds,
    togglePlayerSelection,
    saveAttendance,
    startStopwatch,
    stopStopwatch,
    resetStopwatch,
    exportData,
    importData
} from './renderers.js';

// Expose Global Handlers
window.resetApp = resetData;
window.handleImageUpload = handleImageUpload;
window.deleteMemory = deleteMemory;
window.handleQRUpload = handleQRUpload;
window.updatePlayerPhoto = updatePlayerPhoto;
window.addPlayer = addPlayer;
window.deletePlayer = deletePlayer;
window.updateNote = updateNote;
window.updateUPI = updateUPI;
window.logDonation = logDonation;
window.recordMatch = recordMatch;
window.updateFunds = updateFunds;
window.togglePlayerSelection = togglePlayerSelection;
window.saveAttendance = saveAttendance;
window.startStopwatch = startStopwatch;
window.stopStopwatch = stopStopwatch;
window.resetStopwatch = resetStopwatch;
window.exportData = exportData;
window.importData = importData;

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    console.log('Anuj Badminton Club App Initializing...');

    // Seed data if new
    seedData();

    // Init Router
    initRouter();

    // Mobile Menu Toggle
    const menuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');

    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('open');
        });
    }

    // Initial Render
    renderDashboard();

    // Hook into hash changes to render specific pages
    window.addEventListener('hashchange', () => {
        const page = window.location.hash.substring(1) || 'home';
        if (renderers[page]) {
            renderers[page]();
        }
        lucide.createIcons();
    });
});

// Listen for state changes to re-render
window.addEventListener('stateChange', (e) => {
    console.log('State changed:', e.detail);
    renderDashboard(); // Always update home

    // Update current page if active
    const page = window.location.hash.substring(1);
    if (page && renderers[page]) {
        renderers[page]();
    }
    lucide.createIcons();
});

function renderDashboard() {
    // Schedule
    const scheduleEl = document.getElementById('today-schedule');
    if (scheduleEl) {
        const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
        scheduleEl.innerHTML = `<div class="schedule-item">
            <i data-lucide="calendar-clock"></i>
            <span>${today}: 6:00 PM - 8:00 PM</span>
        </div>`;
    }

    // Daily Note
    const noteEl = document.getElementById('daily-note');
    if (noteEl) {
        noteEl.innerHTML = `<p style="font-style: italic; color: var(--accent); text-align: center;">"${store.dailyNote || 'Welcome!'}"</p>`;
    }

    // Recent Donations
    const donationEl = document.getElementById('recent-donations');
    if (donationEl) {
        const recent = [...(store.donations || [])].reverse().slice(0, 5);
        if (recent.length === 0) {
            donationEl.innerHTML = '<p style="text-align:center; color:var(--text-muted);">No donations yet.</p>';
        } else {
            donationEl.innerHTML = recent.map(d => `
                <div style="display:flex; justify-content:space-between; padding: 0.5rem 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
                    <span>${d.name}</span>
                    <span style="color: var(--primary);">₹${d.amount}</span>
                </div>
            `).join('');
        }
    }

    // Clock
    const clockEl = document.getElementById('live-clock');
    if (clockEl) {
        const updateClock = () => {
            const now = new Date();
            clockEl.innerText = now.toLocaleTimeString();
        };
        updateClock();
        if (!window.clockInterval) {
            window.clockInterval = setInterval(updateClock, 1000);
        }
    }

    // Stopwatch
    const stopwatchEl = document.getElementById('stopwatch-widget');
    if (stopwatchEl && !stopwatchEl.hasChildNodes()) {
        stopwatchEl.innerHTML = `
            <div style="font-size: 2rem; font-family: monospace; text-align: center; margin-bottom: 0.5rem;" id="sw-display">00:00:00</div>
            <div style="display: flex; gap: 0.5rem; justify-content: center;">
                <button class="btn btn-primary" onclick="window.startStopwatch()">Start</button>
                <button class="btn btn-secondary" onclick="window.stopStopwatch()">Stop</button>
                <button class="btn btn-secondary" onclick="window.resetStopwatch()">Reset</button>
            </div>
        `;
    }

    // Leaderboard (Top 3)
    const leaderboardEl = document.getElementById('mini-leaderboard');
    if (leaderboardEl) {
        const sortedPlayers = [...(store.players || [])].sort((a, b) => b.rating - a.rating).slice(0, 3);

        leaderboardEl.innerHTML = sortedPlayers.map((p, index) => `
            <div class="leaderboard-row">
                <span class="rank">#${index + 1}</span>
                <span class="name">${p.name}</span>
                <span class="rating">${p.rating}</span>
            </div>
        `).join('');
    }

    // Calendar
    const calendarEl = document.getElementById('calendar-widget');
    if (calendarEl) {
        const date = new Date();
        const month = date.getMonth();
        const year = date.getFullYear();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDay = firstDay.getDay();

        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        let calendarHTML = `
            <div style="text-align: center; margin-bottom: 0.5rem; font-weight: bold;">${monthNames[month]} ${year}</div>
            <div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 2px; text-align: center; font-size: 0.8rem;">
                <div style="color: var(--text-muted)">S</div>
                <div style="color: var(--text-muted)">M</div>
                <div style="color: var(--text-muted)">T</div>
                <div style="color: var(--text-muted)">W</div>
                <div style="color: var(--text-muted)">T</div>
                <div style="color: var(--text-muted)">F</div>
                <div style="color: var(--text-muted)">S</div>
        `;

        // Empty slots
        for (let i = 0; i < startingDay; i++) {
            calendarHTML += `<div></div>`;
        }

        // Days
        for (let i = 1; i <= daysInMonth; i++) {
            const dayDate = new Date(year, month, i);
            const dateString = dayDate.toISOString().split('T')[0];
            const hasMatch = (store.matches || []).some(m => m.date === dateString);
            const isToday = i === date.getDate();

            let style = "padding: 5px; cursor: pointer; border-radius: 4px;";
            if (isToday) style += " border: 1px solid var(--primary); color: var(--primary);";
            if (hasMatch) style += " background: rgba(255,255,255,0.1); font-weight: bold;";

            calendarHTML += `<div style="${style}" onclick="window.viewMatchesOnDate('${dateString}')">${i}</div>`;
        }

        calendarHTML += `</div>`;
        calendarEl.innerHTML = calendarHTML;
    }
}

// Calendar Handler
window.viewMatchesOnDate = (dateString) => {
    const matches = (store.matches || []).filter(m => m.date === dateString);
    if (matches.length > 0) {
        const msg = matches.map(m => {
            const winner = (store.players || []).find(p => p.id == m.winnerId)?.name || 'Unknown';
            const loser = (store.players || []).find(p => p.id == m.loserId)?.name || 'Unknown';
            return `${winner} def. ${loser} (${m.score})`;
        }).join('\n');
        alert(`Matches on ${dateString}:\n\n${msg}`);
    } else {
        alert(`No matches recorded on ${dateString}.`);
    }
};
