import TutorInterface from './custom-types/tutor-interface'

type HttpMethod = 'GET' | "POST" | 'PUT' | 'DELETE'

export async function fetchFunction (url: string, method: HttpMethod, setter: React.Dispatch<React.SetStateAction<TutorInterface[]>>, body?: TutorInterface): Promise<void> {
  // returns promise that resolves to a response object readable stream
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
    const tutorsJsonData = await responseObj.json();
    setter(tutorsJsonData);
  } catch (e: unknown) {
    console.log(e);
  }
}


//     const response = await fetch(`http://${host}:${port}`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: mockTutorJSON
//     });
//     const jsonData: string = await response.json();
//     tutorIds.push((JSON.parse(jsonData)._id).toString())
//     expect(jsonData).toContain('_id');
//     console.log(tutorIds);