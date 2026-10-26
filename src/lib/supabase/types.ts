export type Profile = {
  id: string
  username: string | null
  display_name: string | null
  avatar_url: string | null
  role: 'reader' | 'admin'
  created_at: string
  updated_at: string
}

export type Manhwa = {
  id: string
  title: string
  slug: string
  description: string | null
  cover_path: string | null
  author: string | null
  artist: string | null
  status: 'ongoing' | 'completed' | 'hiatus' | 'cancelled'
  publication_status: 'draft' | 'published'
  created_by: string | null
  created_at: string
  updated_at: string
}
