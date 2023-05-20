import { Tutor, User, Credentials } from './custom-types/types'
import { Dispatch, SetStateAction } from 'react'
import { PORT } from './env'

type HttpMethod = 'GET' | "POST" | 'PUT' | 'DELETE'

interface messageData {
  party2Id: string,
  message?: string
}

export default async function fetchFunction(
  url: string,
  method: HttpMethod,
  setter: SetStateAction<any>,
  body?: Tutor | User | messageData | { otherId: string | undefined } | Credentials
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

export async function sendUserData(formDataObj: FormData) {
  const send = await fetch(
    `http://localhost:${PORT}/signup`,
    {
      method: 'POST',
      body: formDataObj
    }
  )
  return send;
}