import { store } from './store.js';

export const renderers = {
    home: () => {
        // Already handled in app.js
    },

    players: () => {
        const container = document.getElementById('players');
        container.innerHTML = `
            <div class="section-header">
                <h2>Player Roster</h2>
            </div>
            <div class="player-grid">
                ${(store.players || []).map(p => `
                    <div class="player-card">
                        <img src="${p.img}" alt="${p.name}" class="player-img">
                        <div class="player-info">
                            <h3>${p.name}</h3>
                            <p style="color: var(--accent)">${p.style}</p>
                            <div class="player-details" style="font-size: 0.8rem; color: var(--text-muted); margin: 0.5rem 0; display: flex; justify-content: space-around;">
                                <span>${p.age || '--'} yrs</span>
                                <span>${p.height || '--'}</span>
                                <span>${p.weight || '--'}</span>
                            </div>
                            <div class="player-stats">
                                <div class="stat-item">
                                    <span class="stat-value">${p.rating}</span>
                                    <span class="stat-label">Rating</span>
                                </div>
                                <div class="stat-item">
                                    <span class="stat-value">${p.wins}W - ${p.losses}L</span>
                                    <span class="stat-label">Record</span>
                                </div>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    },

    matches: () => {
        const container = document.getElementById('matches');
        container.innerHTML = `
            <div class="section-header">
                <h2>Match History</h2>
                <a href="#admin" class="btn btn-primary">Record Match</a>
            </div>
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Winner</th>
                            <th>Loser</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${(store.matches || []).map(m => {
            const winner = (store.players || []).find(p => p.id == m.winnerId)?.name || 'Unknown';
            const loser = (store.players || []).find(p => p.id == m.loserId)?.name || 'Unknown';
            return `
                                <tr>
                                    <td>${m.date}</td>
                                    <td style="color: var(--primary)">${winner} 🏆</td>
                                    <td>${loser}</td>
                                    <td>${m.score}</td>
                                </tr>
                            `;
        }).join('')}
                    </tbody>
                </table>
            </div>
        `;
    },

    attendance: () => {
        const container = document.getElementById('attendance');
        container.innerHTML = `
            <div class="section-header">
                <h2>Attendance Tracker</h2>
                <div class="date-display">${new Date().toLocaleDateString()}</div>
            </div>
            <div class="card">
                <p style="text-align: center; color: var(--text-muted);">Attendance is managed by Administrators.</p>
                <div style="margin-top: 2rem; text-align: center;">
                    <i data-lucide="clipboard-check" style="width: 48px; height: 48px; color: var(--primary);"></i>
                    <p>View history coming soon...</p>
                </div>
            </div>
        `;
    },

    funds: () => {
        const container = document.getElementById('funds');
        const percentage = Math.min((store.funds.total / store.funds.target) * 100, 100);

        container.innerHTML = `
            <div class="section-header">
                <h2>Club Funds</h2>
            </div>
            <div class="dashboard-grid">
                <div class="card neon-border">
                    <h3>Total Collected</h3>
                    <div style="font-size: 3rem; color: var(--primary); font-weight: bold;">₹${store.funds.total}</div>
                </div>
                <div class="card">
                    <h3>Monthly Target</h3>
                    <div style="font-size: 2rem; color: var(--text-muted);">₹${store.funds.target}</div>
                    <div style="width: 100%; height: 10px; background: #333; margin-top: 1rem; border-radius: 5px; overflow: hidden;">
                        <div style="width: ${percentage}%; height: 100%; background: var(--primary);"></div>
                    </div>
                </div>
                <div class="card" style="text-align: center;">
                    <h3>Donate via UPI</h3>
                    <p style="font-size: 1.2rem; color: var(--accent); margin: 1rem 0; font-family: monospace;">${store.funds.upiId || 'Not Set'}</p>
                    ${store.funds.qrCode ? `
                    <img src="${store.funds.qrCode}" style="max-width: 200px; border-radius: 8px; margin-top: 1rem; border: 2px solid white;">
                    ` : ''}
                </div>
            </div>
        `;
    },

    rules: () => {
        const container = document.getElementById('rules');
        container.innerHTML = `
            <div class="section-header">
                <h2>Badminton Rules</h2>
            </div>
            <div class="card">
                <h3>Basic Rules (Simplified)</h3>
                <ul style="list-style-type: disc; padding-left: 1.5rem; line-height: 1.6; color: var(--text-muted);">
                    <li><strong>Scoring System:</strong> A match consists of the best of 3 games of 21 points.</li>
                    <li><strong>Winning a Point:</strong> Every time there is a serve – there is a point scored.</li>
                    <li><strong>Winning a Game:</strong> The side winning a rally adds a point to its score. At 20 all, the side which gains a 2 point lead first, wins that game. At 29 all, the side scoring the 30th point, wins that game.</li>
                    <li><strong>Service:</strong> At the beginning of the game (0-0) and when the server’s score is even, the server serves from the right service court. When the server’s score is odd, the server serves from the left service court.</li>
                    <li><strong>Faults:</strong> If the shuttle lands outside the boundaries of the court, passes through or under the net, fail to pass the net, touch the ceiling or side walls, touch the person or dress of a player, or touch any other object or person.</li>
                </ul>
                <br>
                <p style="font-size: 0.9rem; color: var(--text-muted);">Source: Wikipedia / BWF</p>
            </div>
        `;
    },

    memories: () => {
        const container = document.getElementById('memories');
        container.innerHTML = `
            <div class="section-header">
                <h2>Memories</h2>
                <label class="btn btn-secondary">
                    <i data-lucide="camera"></i> Upload Photo
                    <input type="file" accept="image/*" capture="environment" hidden onchange="window.handleImageUpload(this)">
                </label>
            </div>
            <div class="dashboard-grid" id="memories-grid" style="grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));">
                ${store.memories && store.memories.length > 0 ? store.memories.map((img) => `
                    <div class="card" style="padding: 0.5rem; position: relative;">
                        <img src="${img}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px; display: block;">
                    </div>
                `).join('') : '<p style="text-align: center; color: var(--text-muted); grid-column: 1/-1;">No memories uploaded yet.</p>'}
            </div>
         `;
    },

    admin: () => {
        const container = document.getElementById('admin');
        container.innerHTML = `
            <div class="section-header">
                <h2>Admin Panel</h2>
            </div>
            <div class="dashboard-grid">
                <!-- Daily Note -->
                <div class="card">
                    <h3>Daily Dashboard Note</h3>
                    <form onsubmit="event.preventDefault(); window.updateNote(this);">
                        <div class="form-group">
                            <textarea name="note" rows="3" placeholder="Enter today's message...">${store.dailyNote || ''}</textarea>
                        </div>
                        <button class="btn btn-secondary" style="width: 100%">Update Note</button>
                    </form>
                </div>

                <!-- Mark Attendance (Moved to Admin) -->
                <div class="card" style="grid-column: 1 / -1;">
                    <h3>Mark Attendance</h3>
                    <p style="color: var(--text-muted); margin-bottom: 1rem;">Select players present today:</p>
                    <div class="player-grid" style="grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 0.5rem;">
                        ${(store.players || []).map(p => `
                            <div class="player-card" id="att-player-${p.id}" style="padding: 0.5rem; cursor: pointer; border: 1px solid rgba(255,255,255,0.1);" onclick="window.togglePlayerSelection(this)">
                                <img src="${p.img}" style="width: 40px; height: 40px; margin: 0 auto 0.2rem;" class="player-img">
                                <h4 style="font-size: 0.9rem;">${p.name}</h4>
                            </div>
                        `).join('')}
                    </div>
                    <button class="btn btn-primary" style="margin-top: 1rem; width: 100%" onclick="window.saveAttendance()">Save Attendance</button>
                </div>

                <!-- Manage Memories (Delete Photos) -->
                <div class="card" style="grid-column: 1 / -1;">
                    <h3>Manage Gallery</h3>
                    <div style="display: flex; flex-wrap: wrap; gap: 1rem; margin-top: 1rem;">
                        ${store.memories && store.memories.length > 0 ? store.memories.map((img, index) => `
                            <div style="position: relative; width: 100px; height: 100px;">
                                <img src="${img}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 4px;">
                                <button onclick="window.deleteMemory(${index})" style="position: absolute; top: -5px; right: -5px; background: red; color: white; border: none; border-radius: 50%; width: 24px; height: 24px; cursor: pointer; display: flex; align-items: center; justify-content: center;">
                                    <i data-lucide="x" style="width: 14px; height: 14px;"></i>
                                </button>
                            </div>
                        `).join('') : '<p style="color: var(--text-muted);">No photos to manage.</p>'}
                    </div>
                </div>

                <!-- Record Match -->
                <div class="card">
                    <h3>Record Match Result</h3>
                    <form onsubmit="event.preventDefault(); window.recordMatch(this);">
                        <div class="form-group">
                            <label>Winner</label>
                            <select name="winnerId" required>
                                <option value="">Select Winner</option>
                                ${(store.players || []).map(p => `<option value="${p.id}">${p.name}</option>`).join('')}
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Loser</label>
                            <select name="loserId" required>
                                <option value="">Select Loser</option>
                                ${(store.players || []).map(p => `<option value="${p.id}">${p.name}</option>`).join('')}
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Score</label>
                            <input type="text" name="score" placeholder="e.g. 21-18, 21-19" required>
                        </div>
                        <button class="btn btn-primary" style="width: 100%">Record Match</button>
                    </form>
                </div>

                <!-- Log Donation -->
                <div class="card">
                    <h3>Log Donation</h3>
                    <form onsubmit="event.preventDefault(); window.logDonation(this);">
                        <div class="form-group">
                            <label>Donor Name</label>
                            <input type="text" name="name" required placeholder="Who paid?">
                        </div>
                        <div class="form-group">
                            <label>Amount (₹)</label>
                            <input type="number" name="amount" required placeholder="e.g. 500">
                        </div>
                        <button class="btn btn-secondary" style="width: 100%">Add Donation</button>
                    </form>
                </div>

                <!-- Add Player -->
                <div class="card">
                    <h3>Add New Player</h3>
                    <form onsubmit="event.preventDefault(); window.addPlayer(this);">
                        <div class="form-group">
                            <label>Name</label>
                            <input type="text" name="name" required placeholder="Player Name">
                        </div>
                        <div class="form-group" style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0.5rem;">
                            <input type="number" name="age" placeholder="Age">
                            <input type="text" name="height" placeholder="Height">
                            <input type="text" name="weight" placeholder="Weight">
                        </div>
                        <div class="form-group">
                            <label>Style</label>
                            <select name="style">
                                <option>Aggressive</option>
                                <option>Defensive</option>
                                <option>Balanced</option>
                                <option>Net Play</option>
                            </select>
                        </div>
                        <button class="btn btn-primary" style="width: 100%">Add Player</button>
                    </form>
                </div>

                <!-- Update Funds & QR -->
                <div class="card">
                    <h3>Funds Settings</h3>
                    <form onsubmit="event.preventDefault(); window.updateUPI(this);" style="margin-bottom: 1rem;">
                        <div class="form-group">
                            <label>UPI ID</label>
                            <input type="text" name="upi" placeholder="e.g. name@okhdfcbank" value="${store.funds.upiId || ''}">
                        </div>
                        <button class="btn btn-secondary" style="width: 100%">Update UPI</button>
                    </form>
                    
                    <label class="btn btn-secondary" style="width: 100%; text-align: center; display: block;">
                        Upload QR Image
                        <input type="file" accept="image/*" hidden onchange="window.handleQRUpload(this)">
                    </label>
                </div>

                <!-- Manage Players (Delete/Photo) -->
                <div class="card">
                    <h3>Manage Players</h3>
                    <div style="max-height: 300px; overflow-y: auto; margin-top: 1rem;">
                        ${(store.players || []).map(p => `
                            <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid rgba(255,255,255,0.05);">
                                <img src="${p.img}" style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover;">
                                <div style="flex-grow: 1;">
                                    <div>${p.name}</div>
                                    <div style="font-size: 0.7rem; color: var(--text-muted);">${p.age || '?'}y | ${p.height || '?'} | ${p.weight || '?'}</div>
                                </div>
                                <label class="btn btn-secondary" style="padding: 0.2rem 0.5rem; font-size: 0.8rem;">
                                    <i data-lucide="camera" style="width: 12px;"></i>
                                    <input type="file" accept="image/*" hidden onchange="window.updatePlayerPhoto(this, ${p.id})">
                                </label>
                                <button onclick="window.deletePlayer(${p.id})" style="background: var(--danger); color: white; border: none; padding: 0.2rem 0.5rem; border-radius: 4px; cursor: pointer;">
                                    <i data-lucide="trash-2" style="width: 12px;"></i>
                                </button>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Data Management -->
                <div class="card">
                    <h3>System</h3>
                    <p style="margin-bottom: 1rem; color: var(--text-muted);">Backup, restore, or reset your data.</p>
                    
                    <button class="btn btn-primary" style="width: 100%; margin-bottom: 0.5rem;" onclick="window.exportData()">
                        <i data-lucide="download" style="width: 16px; height: 16px; margin-right: 0.5rem;"></i>
                        Download Backup
                    </button>
                    
                    <label class="btn btn-secondary" style="width: 100%; display: block; text-align: center; margin-bottom: 0.5rem; cursor: pointer;">
                        <i data-lucide="upload" style="width: 16px; height: 16px; margin-right: 0.5rem;"></i>
                        Restore Backup
                        <input type="file" accept=".json" hidden onchange="window.importData(this)">
                    </label>
                    
                    <button class="btn btn-secondary" style="border-color: var(--danger); color: var(--danger); width: 100%" onclick="if(confirm('Reset all data to default? This will delete everything!')) window.resetApp()">
                        <i data-lucide="trash-2" style="width: 16px; height: 16px; margin-right: 0.5rem;"></i>
                        Reset All Data
                    </button>
                </div>
            </div>
        `;
    }
};

// Exported Handlers (to be attached to window in app.js)

export const handleImageUpload = (input) => {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const newMemories = [e.target.result, ...(store.memories || [])];
            store.memories = newMemories;
            renderers.memories(); // Re-render public
            alert('Photo uploaded successfully!');
        };
        reader.readAsDataURL(input.files[0]);
    }
};

export const deleteMemory = (index) => {
    if (confirm('Delete this photo permanently?')) {
        const newMemories = [...(store.memories || [])];
        newMemories.splice(index, 1);
        store.memories = newMemories;
        renderers.admin(); // Re-render Admin to update list
        alert('Photo deleted.');
    }
};

export const handleQRUpload = (input) => {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const newFunds = { ...store.funds, qrCode: e.target.result };
            store.funds = newFunds;
            renderers.funds(); // Re-render
            alert('QR Code updated!');
        };
        reader.readAsDataURL(input.files[0]);
    }
};

export const updatePlayerPhoto = (input, playerId) => {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const newPlayers = (store.players || []).map(p => {
                if (p.id === playerId) {
                    return { ...p, img: e.target.result };
                }
                return p;
            });
            store.players = newPlayers;
            renderers.admin(); // Re-render
            alert('Player photo updated!');
        };
        reader.readAsDataURL(input.files[0]);
    }
};

export const addPlayer = (form) => {
    const name = form.name.value;
    const style = form.style.value;
    const age = form.age.value;
    const height = form.height.value;
    const weight = form.weight.value;

    const newPlayer = {
        id: Date.now(),
        name,
        style,
        age,
        height,
        weight,
        rating: 1000,
        wins: 0,
        losses: 0,
        img: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`
    };
    store.players = [...(store.players || []), newPlayer];
    form.reset();
    renderers.admin(); // Re-render
    alert('Player added!');
};

export const deletePlayer = (id) => {
    if (confirm('Are you sure you want to delete this player? This cannot be undone.')) {
        store.players = (store.players || []).filter(p => p.id !== id);
        renderers.admin(); // Re-render
        alert('Player deleted.');
    }
};

export const updateNote = (form) => {
    store.dailyNote = form.note.value;
    alert('Daily note updated!');
};

export const updateUPI = (form) => {
    const newFunds = { ...store.funds, upiId: form.upi.value };
    store.funds = newFunds;
    alert('UPI ID updated!');
};

export const logDonation = (form) => {
    const name = form.name.value;
    const amount = parseInt(form.amount.value);

    if (name && !isNaN(amount)) {
        const newDonation = { name, amount, date: new Date().toISOString() };
        store.donations = [...(store.donations || []), newDonation];

        const newFunds = { ...store.funds };
        newFunds.total += amount;
        store.funds = newFunds;

        form.reset();
        alert('Donation logged!');
    }
};

export const recordMatch = (form) => {
    const winnerId = parseInt(form.winnerId.value);
    const loserId = parseInt(form.loserId.value);
    const score = form.score.value;

    if (winnerId && loserId && score && winnerId !== loserId) {
        const newMatch = {
            id: Date.now(),
            date: new Date().toISOString().split('T')[0],
            winnerId,
            loserId,
            score
        };
        store.matches = [newMatch, ...(store.matches || [])];

        const newPlayers = (store.players || []).map(p => {
            if (p.id === winnerId) return { ...p, wins: p.wins + 1, rating: p.rating + 10 };
            if (p.id === loserId) return { ...p, losses: p.losses + 1, rating: p.rating - 5 };
            return p;
        });
        store.players = newPlayers;

        form.reset();
        alert('Match recorded!');
    } else {
        alert('Please select different players for winner and loser.');
    }
};

export const updateFunds = (form) => {
    const amount = parseInt(form.amount.value);
    if (!isNaN(amount)) {
        const newFunds = { ...store.funds };
        newFunds.total += amount;
        store.funds = newFunds;
        form.reset();
        alert('Funds updated!');
    }
};

// Attendance Handlers
export const togglePlayerSelection = (element) => {
    element.classList.toggle('neon-border');
    const isSelected = element.dataset.selected === 'true';
    element.dataset.selected = isSelected ? 'false' : 'true';
    console.log('Toggled player:', element.querySelector('h4').innerText, 'Selected:', !isSelected);
};

export const saveAttendance = () => {
    console.log('Saving attendance...');
    const selected = document.querySelectorAll('.player-card[data-selected="true"]');
    const names = Array.from(selected).map(el => el.querySelector('h4').innerText);

    if (names.length > 0) {
        console.log('Players present:', names);
        alert(`Attendance saved for: ${names.join(', ')}`);
        // In a real app, save to store
        // store.attendance = [...store.attendance, { date: new Date(), present: names }];
    } else {
        console.warn('No players selected');
        alert('Please select players first (tap them to highlight).');
    }
};

// Stopwatch Handlers
let swInterval;
let swSeconds = 0;

export const startStopwatch = () => {
    if (!swInterval) {
        swInterval = setInterval(() => {
            swSeconds++;
            const h = Math.floor(swSeconds / 3600).toString().padStart(2, '0');
            const m = Math.floor((swSeconds % 3600) / 60).toString().padStart(2, '0');
            const s = (swSeconds % 60).toString().padStart(2, '0');
            const display = document.getElementById('sw-display');
            if (display) display.innerText = `${h}:${m}:${s}`;
        }, 1000);
    }
};

export const stopStopwatch = () => {
    clearInterval(swInterval);
    swInterval = null;
};

export const resetStopwatch = () => {
    stopStopwatch();
    swSeconds = 0;
    const display = document.getElementById('sw-display');
    if (display) display.innerText = "00:00:00";
};

// Backup/Restore Handlers
export const exportData = () => {
    const dataStr = JSON.stringify(store, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const timestamp = new Date().toISOString().split('T')[0];
    link.download = `anuj-club-backup-${timestamp}.json`;
    link.click();
    URL.revokeObjectURL(url);
    alert('Data exported successfully! Save this file in a safe location.');
};

export const importData = (input) => {
    if (input.files && input.files[0]) {
        const file = input.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const importedData = JSON.parse(e.target.result);

                // Update all store properties
                Object.keys(importedData).forEach(key => {
                    store[key] = importedData[key];
                });

                alert('Data imported successfully! Refreshing page...');
                setTimeout(() => window.location.reload(), 500);
            } catch (error) {
                alert('Error importing data: Invalid file format. Please select a valid backup file.');
                console.error('Import error:', error);
            }
        };
        reader.readAsText(file);
    }
};

console.log('Renderers Loaded');
