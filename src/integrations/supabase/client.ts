// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://mlonxemzfvdvgixvxumr.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1sb254ZW16ZnZkdmdpeHZ4dW1yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI5MDMxMjcsImV4cCI6MjA1ODQ3OTEyN30.Sbsx6JYfmKJwwmg4qXIj8ANiGnT1vWxKO2A4BHya-YE";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);