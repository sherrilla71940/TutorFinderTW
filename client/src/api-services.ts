import { Tutor, User, Credentials } from './custom-types/types'

type HttpMethod = 'GET' | "POST" | 'PUT' | 'DELETE'

interface messageData { 
  party2Id: string,
  message?: string 
}

export default async function fetchFunction (
  url: string, 
  method: HttpMethod, 
  // TODO: COME UP WITH A TYPE FOR THE SETTERS
  setter: any, 
  body?: Tutor | User | { isComplete: boolean } | messageData | { otherId: string | undefined } | Credentials
  )
  : Promise<void | Response> {

  const fetchOptions: RequestInit = {
    method: method,
    headers: {
      'Authorization': sessionStorage.getItem('token') || 'no credentials',
      'Content-Type': 'application/json'
    }
  }
  if (body) {
    fetchOptions.body = JSON.stringify(body);
    console.log(fetchOptions.body);
  }

  try {
    const response = await fetch(url, fetchOptions);
    try {
      const parsedResponse = await response.json();
      console.log(parsedResponse);
      setter(parsedResponse);
      return parsedResponse;
    } catch (error) {
      return response;
    }
  } catch (error: unknown) {
    console.log(error);
  }
}