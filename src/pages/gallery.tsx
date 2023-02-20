import Image from "next/image"





export default function Gallery() {

    return (
        <div>
            <span>a</span>
            <Image src={"/img1.jpg"} alt='pic of eminem' width={'300'} height={400} />
            <Image src={'/img2.jpg'} alt='pic of eminem' width={'300'} height={400} />
            <span>b</span>
        </div>
    )
}