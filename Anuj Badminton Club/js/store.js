// Initial State
const initialState = {
    players: [],
    matches: [],
    attendance: {}, // Date string keys
    funds: {
        total: 0,
        target: 5000,
        logs: [],
        qrCode: null,
        upiId: 'example@upi'
    },
    notices: [],
    memories: [],
    donations: [], // { name, amount, date }
    dailyNote: "Welcome to Anuj Badminton Club! Smash hard today!"
};

// Load from localStorage or use initial state
const loadState = () => {
    const saved = localStorage.getItem('eveningSmashersData');
    if (saved) {
        return { ...initialState, ...JSON.parse(saved) };
    }
    return initialState;
};

// Save to localStorage
const saveState = (state) => {
    localStorage.setItem('eveningSmashersData', JSON.stringify(state));
};

// Create Reactive Store
const handler = {
    set(target, property, value) {
        target[property] = value;
        saveState(target);
        // Dispatch event for UI updates
        window.dispatchEvent(new CustomEvent('stateChange', { detail: { property, value } }));
        return true;
    }
};

export const store = new Proxy(loadState(), handler);

// Helper to reset data (for Admin)
export const resetData = () => {
    localStorage.removeItem('eveningSmashersData');
    Object.assign(store, initialState);
    window.location.reload();
};

// Seed Data (if empty)
export const seedData = () => {
    if (store.players.length === 0) {
        store.players = [
            { id: 1, name: 'Arjun', rating: 1200, wins: 10, losses: 2, style: 'Aggressive', age: 24, height: '5\'10"', weight: '70kg', img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun' },
            { id: 2, name: 'Rahul', rating: 1150, wins: 8, losses: 4, style: 'Defensive', age: 26, height: '5\'8"', weight: '68kg', img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul' },
            { id: 3, name: 'Vikram', rating: 1100, wins: 6, losses: 6, style: 'Balanced', age: 25, height: '5\'11"', weight: '75kg', img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram' },
            { id: 4, name: 'Sneha', rating: 1180, wins: 9, losses: 3, style: 'Net Play', age: 23, height: '5\'6"', weight: '55kg', img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha' },
            { id: 5, name: 'Anjali', rating: 1050, wins: 4, losses: 8, style: 'Power', age: 22, height: '5\'5"', weight: '58kg', img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anjali' },
            { id: 6, name: 'Rohan', rating: 1000, wins: 2, losses: 10, style: 'Speed', age: 27, height: '6\'0"', weight: '78kg', img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rohan' }
        ];

        store.notices = [
            { id: 1, title: 'Tournament Next Week', date: '2025-11-30', content: 'Get ready for the monthly smashdown!' },
            { id: 2, title: 'New Shuttles Arrived', date: '2025-11-24', content: 'We have stocked up on Yonex Mavis 350.' }
        ];

        store.matches = [
            { id: 1, date: '2025-11-20', winnerId: 1, loserId: 2, score: '21-18, 21-19' },
            { id: 2, date: '2025-11-21', winnerId: 4, loserId: 3, score: '21-15, 18-21, 21-19' }
        ];

        console.log('Data seeded!');
    }
};
