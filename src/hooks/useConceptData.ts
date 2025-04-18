
import { useQuery } from "@tanstack/react-query";

const fetchConceptData = async (slug: string) => {
  const response = await fetch('https://ehhpgbylbplcgujeohpd.supabase.co/functions/v1/gemini-api-integration', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
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
    retry: false,
  });
};
