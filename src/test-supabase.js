import { supabase } from './lib/supabase.js';

async function testSupabase() {
  console.log('Probando conexión a Supabase...');
  
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .limit(1);
    
  if (error) {
    console.error('Error de Supabase:', error);
  } else {
    console.log('Conexión exitosa. Datos:', data);
  }
}

testSupabase();