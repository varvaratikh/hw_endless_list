import styles from './index.module.css'

export const ListItem = ({ item }: { item: number }) => {
    return (
        <div className={styles.item}>
            {item}
        </div>
    )
}