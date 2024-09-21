import Image from "next/image"
import "./styles.scss"
export const Header = ()=>{
    return (
    <>
        <header className="wrapper">
        <div className="container">
            <Image
            src="/images/logo.png"
            alt="logo"
            layout="responsive"
            width={5}
            height={10}
            objectFit="contain"
            className="img"
            />
            <h2>Bem-vindo de volta, Marcus</h2>
            <h4>Segunda, 01 de dezembro de 2025</h4>
        </div>
    </header>
    </>
    )
}