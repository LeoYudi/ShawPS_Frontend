import styles from './style.module.css';

function LineProfile({ label, value, url = false }) {
  const RenderValue = ({ value, url }) => {
    if (url)
      return <a href={value} target='_blank' rel="noreferrer">{value}</a>

    return <>{value}</>
  }

  return (
    <div className={styles.line}>
      <div className={styles.label}>{label}:</div>
      <div className={styles.value}>
        <RenderValue value={value} url={url} />
      </div>
    </div>
  );
}

export { LineProfile };