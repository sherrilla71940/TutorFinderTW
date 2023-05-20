import React, { CSSProperties, RefObject, useEffect, useRef } from 'react';
import { Tutor, User } from '../custom-types/types';
import getImage from '../utils/image-getter';

interface Props {
  tutor: Tutor | User
}

const styleObj: CSSProperties = {
  // height: '64px',
  // width: '64px',
  // position: 'absolute',
  // clipPath: 'circle(40%)'
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
      <figure className="image is-64x64">
        <img ref={myRef} className="is-rounded" alt="userpic" style={styleObj} />
      </figure>
    </>
  )
}
