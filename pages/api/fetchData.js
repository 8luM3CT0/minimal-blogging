import { createClient } from '@supabase/supabase-js';

const supaUrl = 'https://joszfjstfxchisajaiye.supabase.co';
const supaKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impvc3pmanN0ZnhjaGlzYWphaXllIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODcwNzQxMjcsImV4cCI6MjAwMjY1MDEyN30.l9bAK4GP1SGcYdSCGkxzC-12ZVBRLsIlFBuihFA-F_0';
const secure = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impvc3pmanN0ZnhjaGlzYWphaXllIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4NzA3NDEyNywiZXhwIjoyMDAyNjUwMTI3fQ.Rw8aLx7RAVMcGDM043n7DFodIW_cHBd-5m1m8OPdMhU';

const supabase = createClient(supaUrl, secure)

const fetchData = async () => {
    const {data, error} = await supabase.from('support_table').select();
  
    if(error){
      console.error('Error fetching data>>>>', error);
      return [];
    }
  
    return data;
  }
  
  async function handler(req, res){
    try{
      const data = await fetchData();
      res.status(200).json(data)
    } catch(error){
      console.error('Error fetching data >>>', error);
      res.status(500).jon({error: 'Data fetching failed.'});
    }
  }
  
  