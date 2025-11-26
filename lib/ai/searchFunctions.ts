import { FunctionDeclaration, SchemaType } from '@google/generative-ai';
import { searchWithTavily, formatSearchResults } from './tavilyClient';


export const searchFunctionDeclarations: FunctionDeclaration[] = [
  {
    name: 'web_search',
    description: 'Search the web for current information, facts, or knowledge that you dont have. Use this when asked about current events, specific people, places, recent developments, or any information you are unsure about.',
    parameters: {
      type: SchemaType.OBJECT,
      properties: {
        query: {
          type: SchemaType.STRING,
          description: 'The search query to look up on the web. Be specific and clear.'
        }
      },
      required: ['query']
    }
  }
];


export async function performWebSearch(args: unknown): Promise<{
  success: boolean;
  results?: string;
  query?: string;
  error?: string;
}> {
  try {

    if (!args || typeof args !== 'object' || !('query' in args)) {
      return {
        success: false,
        error: 'Invalid search query'
      };
    }

    const { query } = args as { query: string };

    console.log('Performing web search for:', query);


    const searchResponse = await searchWithTavily(query);


    const formattedResults = formatSearchResults(searchResponse.results);

    return {
      success: true,
      query,
      results: formattedResults
    };
  } catch (error) {
    console.error('Web search error:', error);
    return {
      success: false,
      error: 'Failed to perform web search'
    };
  }
}
