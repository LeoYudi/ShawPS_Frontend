import styles from './style.module.css';

function Button({ active, text, secondary, clickHandler }) {
  return (
    <div
      className={`${styles.button} ${secondary ? styles.secondary : ''} ${active ? '' : styles.disable}`}
      onClick={e => {
        if (active)
          clickHandler(e);
      }}
    >
      {text}
    </div>
  );
}

export { Button };