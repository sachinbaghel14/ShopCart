import { HashLoader } from "react-spinners";
import styles from "./LoadinSpinner.module.css"


export function LoadingSpinner(props) {
    return (
        <div className={styles.LoadingSpinner}>
            <HashLoader color="#fe696a" size={80}></HashLoader>
            <p>{props.title}</p>
        </div>
    )
}