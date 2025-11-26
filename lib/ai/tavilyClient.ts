export interface TavilySearchResult {
  title: string;
  url: string;
  content: string;
  score: number;
}

export interface TavilyResponse {
  results: TavilySearchResult[];
  query: string;
}

export async function searchWithTavily(query: string): Promise<TavilyResponse> {
  const apiKey = process.env.TAVILY_API_KEY;

  if (!apiKey) {
    throw new Error('TAVILY_API_KEY is not set');
  }

  try {
    const response = await fetch('https://api.tavily.com/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_key: apiKey,
        query: query,
        search_depth: 'basic',
        include_answer: false,
        include_raw_content: false,
        max_results: 5,
        include_domains: [],
        exclude_domains: [],
      }),
    });

    if (!response.ok) {
      throw new Error(`Tavily API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Tavily search error:', error);
    throw error;
  }
}


export function formatSearchResults(results: TavilySearchResult[]): string {
  if (!results || results.length === 0) {
    return 'No search results found.';
  }

  return results
    .map((result, index) => {
      return `Result ${index + 1}:
Title: ${result.title}
URL: ${result.url}
Content: ${result.content}
---`;
    })
    .join('\n\n');
}
