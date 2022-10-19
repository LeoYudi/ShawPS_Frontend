import { useRouter } from 'next/router';
import Head from 'next/head';
import { useState, useEffect } from 'react';

import { Button } from '../components/Button';
import { ListItem } from '../components/ListItem';
import { Loading } from '../components/Loading';

import { listUsers } from '../services/api';

import styles from '../styles/Home.module.css';

export default function Home() {
  const router = useRouter();

  const [users, setUsers] = useState([]);
  const [curr, setCurr] = useState(0);
  const [next, setNext] = useState(null);

  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const getList = async () => {
      setLoading(true);
      const response = await listUsers(curr, 15);

      if (response.error) {
        console.log(error);
        setUsers([]);
      }
      else {
        setUsers(response.users);
        setNext(response.next);
      }
      setLoading(false);
    }

    if (!users.length)
      getList();
    else if (curr === next)
      getList();

  }, [users, curr, next]);


  return (
    <div className={styles.container}>
      <Head>
        <title>Shaw & Partners</title>
      </Head>
      <div className={styles.list}>
        <ListItem >
          <div className={styles.id}>ID</div>
          <div className={styles.login}>Login</div>
        </ListItem>

        {users.map(user => (
          <ListItem
            key={user.id}
            clickHandler={() => { router.push(`/user/${user.login}`) }}
          >
            <div className={styles.id}>{user.id}</div>
            <div className={styles.login}>{user.login}</div>
          </ListItem>
        ))}

      </div>

      <div className={styles.buttonsContainer}>
        <Button
          active={true}
          text={'Next'}
          secondary={false}
          clickHandler={() => {
            setCurr(next);
          }}
        />
      </div>
      <Loading isLoading={isLoading} />
    </div>
  )
}
