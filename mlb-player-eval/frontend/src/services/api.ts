export interface Player {
    name: string;
    team: string;
    status: string | null;
    year: number;
    war: number;
    base_value: number;
    contract_value: number;
    surplus_value: number;
}
export interface PlayerFilter {
    year?: number;
    team?: string;
    position?: string;
    sort_by?: 'war' | 'value';
    search?: string; 
}

export interface PlayerResponse {
    count: number;
    players: Array<{
        name: string;
        team: string;
        position: string;
        war: number;
        base_value: number;
        contract_value: number;
        surplus_value: number;
    }>;
}
export interface TradeAnalysis {
    team1: {
        total_value: number;
        players: Array<{
            name: string;
            team: string;
            status: string;
            total_surplus: number;
            total_contract: number;
            yearly_projections: Array<{
                year: number;
                war: number;
                base_value: number;  // Add this field
                contract_value: number;
                surplus_value: number;
                status: string;
            }>;
        }>;
    };
    team2: {
        total_value: number;
        players: Array<{
            name: string;
            team: string;
            status: string;
            total_surplus: number;
            total_contract: number;
            yearly_projections: Array<{
                year: number;
                war: number;
                base_value: number;  // Add this field
                contract_value: number;
                surplus_value: number;
                status: string;
            }>;
        }>;
    };
}

const API_BASE = 'http://localhost:8000/api';

export const getPlayers = async (year: number = 2024): Promise<Player[]> => {
    try {
        const response = await fetch(`${API_BASE}/players?year=${year}`);
        if (!response.ok) throw new Error('Failed to fetch players');
        const data = await response.json();
        return data.players; // Return just the players array for Trade Analyzer
    } catch (error) {
        console.error('Error fetching players:', error);
        throw error;
    }
};


export const analyzeTrade = async (
    team1Players: string[],
    team2Players: string[]
): Promise<TradeAnalysis> => {
    try {
        const response = await fetch(`${API_BASE}/trades/analyze`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ team1_players: team1Players, team2_players: team2Players })
        });
        if (!response.ok) throw new Error('Failed to analyze trade');
        return response.json();
    } catch (error) {
        console.error('Error analyzing trade:', error);
        throw error;
    }
};

export const filterPlayers = async (filters: PlayerFilter): Promise<PlayerResponse> => {
    const params = new URLSearchParams();
    if (filters.year) params.append('year', filters.year.toString());
    if (filters.team) params.append('team', filters.team);
    if (filters.position) params.append('position', filters.position);
    if (filters.sort_by) params.append('sort_by', filters.sort_by);
    if (filters.search) params.append('search', filters.search);  // Add search handling

    try {
        const response = await fetch(`${API_BASE}/players/?${params}`);
        if (!response.ok) throw new Error('Failed to fetch players');
        return response.json();
    } catch (error) {
        console.error('Error fetching players:', error);
        throw error;
    }
};

export interface PlayerStats {
    name: string;
    team: string;
    position: string;
    projections: Array<{
      year: number;
      war: number;
      value: {
        base: number;
        contract: number;
        surplus: number;
      };
      hitting?: {
        age: number;
        bb_pct: number;
        k_pct: number;
        avg: number;
        obp: number;
        slg: number;
        woba: number;
        wrc_plus: number;
        ev: number;
        off: number;
        bsr: number;
        def: number;
      };
      pitching?: {
        age: number;
        fip: number;
        siera: number;
        k_pct: number;
        bb_pct: number;
        gb_pct: number;
        fb_pct: number;
        stuff_plus: number;
        location_plus: number;
        pitching_plus: number;
        fbv: number;
      };
    }>;
  }
  
  export const getPlayerDetails = async (playerName: string): Promise<PlayerStats> => {
    try {
        console.log(`Fetching details for player: ${playerName}`); // Debug log
        const response = await fetch(`${API_BASE}/players/${encodeURIComponent(playerName)}/details`);
        if (!response.ok) {
            console.error(`API Error: ${response.status}`); // Debug log
            throw new Error('Failed to fetch player details');
        }
        const data = await response.json();
        console.log('API Response:', data); // Debug log
        return data;
    } catch (error) {
        console.error('Error fetching player details:', error);
        throw error;
    }
};