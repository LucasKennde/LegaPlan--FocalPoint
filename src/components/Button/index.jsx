import "./style.scss"
export const Button = ({modal,text, type, noBTN}) =>{
    return (
        <>
            <button onClick={modal} type={noBTN ? 'button':'submit'} className={type}>{text}</button>
        </>
    )
}