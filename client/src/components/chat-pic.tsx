import React, { RefObject, useEffect, useRef } from 'react';
import { Tutor, User } from '../custom-types/types';
import getImage from '../utils/image-getter';

interface Props {
  tutor: Tutor | User
}

export default function ChatPic({ tutor }: Props) {
  const myRef = useRef() as RefObject<HTMLImageElement>;
  
  useEffect(() => {
    (async () => {
      console.log(tutor.picPath);
      const url = await getImage(tutor.picPath as string);
      myRef.current?.setAttribute('src', url as string);
    })();
  })

  return (
    <>
      <img ref={myRef} className="is-rounded" alt="userpic" />
    </>
  )
}
