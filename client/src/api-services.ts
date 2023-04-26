import TutorInterface from './custom-types/tutor-interface'

type HttpMethod = 'GET' | "POST" | 'PUT' | 'DELETE'

export default async function fetchFunction <T>(url: string, method: HttpMethod, setter: React.Dispatch<React.SetStateAction<T>>, body?: TutorInterface): Promise<void> {
  // fetch api returns a promise that resolves to a response object readable stream, when calling .json on it returns another promise that resolves to JS object of data

  const fetchOptions: RequestInit = {
    method: method,
    headers: {
      'Content-Type': 'application/json'
    }
  }
  if (body) {
    fetchOptions.body = JSON.stringify(body);
  }

  try {
    const responseObj = await fetch(url, fetchOptions);
    const tutors = await responseObj.json();
    setter(tutors);
  } catch (e: unknown) {
    console.log(e);
  }
}