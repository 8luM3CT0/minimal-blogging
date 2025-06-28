import { createClient } from "@supabase/supabase-js";

const supaUrl = 'https://joszfjstfxchisajaiye.supabase.co';
const supaKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impvc3pmanN0ZnhjaGlzYWphaXllIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4NzA3NDEyNywiZXhwIjoyMDAyNjUwMTI3fQ.Rw8aLx7RAVMcGDM043n7DFodIW_cHBd-5m1m8OPdMhU'

const supabaseClient = createClient(supaUrl, supaKey)

export default supabaseClient