import { supabase } from '../../lib/supabase/client';

export async function isAdmin() {
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) return false;
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', data.user.id)
    .single();
  return profile?.role === 'admin';
}
