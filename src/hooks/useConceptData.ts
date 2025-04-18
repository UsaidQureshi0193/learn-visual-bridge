
import { useQuery } from "@tanstack/react-query";

const fetchConceptData = async (slug: string) => {
  const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/get-concept-details`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
    },
    body: JSON.stringify({ concept: slug.split('-').join(' ') })
  });

  if (!response.ok) {
    throw new Error('Failed to fetch concept data');
  }

  return response.json();
};

export const useConceptData = (slug: string) => {
  return useQuery({
    queryKey: ['concept', slug],
    queryFn: () => fetchConceptData(slug),
    enabled: !!slug,
  });
};
