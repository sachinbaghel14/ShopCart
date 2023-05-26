import { HashLoader } from "react-spinners";
import styles from "./LoadinSpinner.module.css"


export function LoadingSpinner() {
    return (
        <div className={styles.LoadingSpinner}>
            <HashLoader color="#fe696a" size={80}></HashLoader>
            <p>Loading, Please wait...</p>
        </div>
    )
}