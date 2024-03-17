import Image from 'next/image'
import cityscape from '../public/38bc76ac7c5dc2bb57554ea2899814d8.jpg'

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
                aspectRatio: "16/9",
                objectFit: 'cover',
                zIndex: -1,
                }}
                />
            </div>
        </div>
    )
}
