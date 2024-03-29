import Image from 'next/image'
import cityscape from '../public/cityscape.jpg'

export default function Background(){
    return (
            <div className="z[0]">
            
            <Image
                alt="cityscape"
                src={cityscape}
                placeholder="blur"
                quality={100}
                fill
                sizes="100vw"
            

                style={{
                aspectRatio: "16/9",
                objectFit: 'cover',
                zIndex: -1,
                }}
                />
            </div>
       
    )
}
