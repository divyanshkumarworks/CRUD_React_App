import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://wuhqnemqwxrvugevgjdu.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind1aHFuZW1xd3hydnVnZXZnamR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI4NjE1MjAsImV4cCI6MjAyODQzNzUyMH0.8RVLvklEdw-TKh9O2pflTnUnx5C86-kJqiBYQ0Xtdwo"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase