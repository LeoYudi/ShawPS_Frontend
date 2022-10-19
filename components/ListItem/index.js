import styles from './style.module.css';

function ListItem({ clickHandler = () => { }, children }) {
  return (
    <div
      className={styles.item}
      onClick={clickHandler}
    >
      {children}
    </div>
  )
}

export { ListItem }