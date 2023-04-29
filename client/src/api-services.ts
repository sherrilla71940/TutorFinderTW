import TutorInterface, { User } from './custom-types/types'

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
    console.log(tutors)
    setter(tutors);
  } catch (e: unknown) {
    console.log(e);
  }
}

export async function signUpRequest(newUser: {name: string, email: string, password: string, type: string}): Promise<void | Response> {
  try {
    const response = await fetch("http://localhost:8080/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newUser)
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function loginRequest(user: {email: string, password: string}): Promise<boolean | User> {
  try {
    const response = await fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    });
    const parsedResponse = await response.json();
    sessionStorage.setItem('id', parsedResponse.userData._id);
    sessionStorage.setItem('session', parsedResponse.token);
    sessionStorage.setItem('name', parsedResponse.userData.name);
    sessionStorage.setItem('type', parsedResponse.userData.type);
    sessionStorage.setItem('email', parsedResponse.userData.email);
    return parsedResponse.userData;
  } catch (error) {
    console.log(error);
    return false;
  }
}