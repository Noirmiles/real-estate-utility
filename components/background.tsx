import Image from 'next/image'
import cityscape from '../public/cityscape.jpg'

export default function Background(){
    return (
        <div>
            <div className="z[0]">
                <Image
                alt="cityscape"
                src={cityscape}
                placeholder="blur"
                quality={100}
                fill
                sizes="100vw"

                style={{
                objectFit: 'cover',
                zIndex: -1,
                }}
                />
            </div>
        </div>
    )
}
