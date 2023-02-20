import style from "../styles/styled.module.css"

export default function Styled() {

    return (
        <div className={style.fullscreen}>
            <h3 className={style.red} >Just a stlyed page to show how component level styling works</h3>
            <div className={style.animated} ></div>
        </div>
    )
}
