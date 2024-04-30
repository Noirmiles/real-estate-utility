import Image from 'next/image'
import cityscape from '../public/cityscape.jpg'

export default function Background(){


    return (
            <div className="">
            
            <Image
                alt="cityscape"
                src={cityscape}
                placeholder="blur"
                quality={100}
                fill
                style={{
                aspectRatio: "16/9",
                objectFit: 'cover',
                zIndex: -1,
                }}
                />
            </div>
       
    )
}
