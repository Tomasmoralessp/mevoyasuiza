import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for our database
export interface UserProfile {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  target_move_date?: string;
  target_canton?: string;
  current_phase: string;
  onboarding_completed: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserProgress {
  id: string;
  user_id: string;
  task_id: string;
  status: 'blocked' | 'active' | 'completed';
  notes?: string;
  uploaded_file_name?: string;
  uploaded_file_url?: string;
  completed_at?: string;
  created_at: string;
  updated_at: string;
}

// Swiss cantons for the onboarding form
export const SWISS_CANTONS = [
  { code: 'AG', name: 'Aargau', name_es: 'Argovia' },
  { code: 'AI', name: 'Appenzell Innerrhoden', name_es: 'Appenzell Rodas Interiores' },
  { code: 'AR', name: 'Appenzell Ausserrhoden', name_es: 'Appenzell Rodas Exteriores' },
  { code: 'BE', name: 'Bern', name_es: 'Berna' },
  { code: 'BL', name: 'Basel-Landschaft', name_es: 'Basilea-Campiña' },
  { code: 'BS', name: 'Basel-Stadt', name_es: 'Basilea-Ciudad' },
  { code: 'FR', name: 'Fribourg', name_es: 'Friburgo' },
  { code: 'GE', name: 'Geneva', name_es: 'Ginebra' },
  { code: 'GL', name: 'Glarus', name_es: 'Glaris' },
  { code: 'GR', name: 'Graubünden', name_es: 'Grisones' },
  { code: 'JU', name: 'Jura', name_es: 'Jura' },
  { code: 'LU', name: 'Lucerne', name_es: 'Lucerna' },
  { code: 'NE', name: 'Neuchâtel', name_es: 'Neuchâtel' },
  { code: 'NW', name: 'Nidwalden', name_es: 'Nidwalden' },
  { code: 'OW', name: 'Obwalden', name_es: 'Obwalden' },
  { code: 'SG', name: 'St. Gallen', name_es: 'San Galo' },
  { code: 'SH', name: 'Schaffhausen', name_es: 'Schaffhausen' },
  { code: 'SO', name: 'Solothurn', name_es: 'Soleura' },
  { code: 'SZ', name: 'Schwyz', name_es: 'Schwyz' },
  { code: 'TG', name: 'Thurgau', name_es: 'Turgovia' },
  { code: 'TI', name: 'Ticino', name_es: 'Tesino' },
  { code: 'UR', name: 'Uri', name_es: 'Uri' },
  { code: 'VD', name: 'Vaud', name_es: 'Vaud' },
  { code: 'VS', name: 'Valais', name_es: 'Valais' },
  { code: 'ZG', name: 'Zug', name_es: 'Zug' },
  { code: 'ZH', name: 'Zurich', name_es: 'Zúrich' }
];