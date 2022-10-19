import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState, useCallback } from 'react';

import { Button } from '../../components/Button';
import { LineProfile } from '../../components/LineProfile';
import { ListItem } from '../../components/ListItem';
import { Loading } from '../../components/Loading';

import { userDetails, userRepos } from '../../services/api';
import { parseDate } from '../../utils/date';

import styles from './style.module.css';

export default function User() {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState(null);
  const [reposPage, setReposPage] = useState(1);

  const [isLoading, setLoading] = useState(false);

  const username = router.query.username;

  const updateRepos = useCallback(() => {
    (async () => {
      setLoading(true);
      const responseRepos = await userRepos(username, reposPage);

      if (responseRepos.error) {
        console.log(responseRepos.error);
        return;
      }

      setRepos(responseRepos.repos);
      setLoading(false);
    })();
  }, [reposPage, username])

  useEffect(() => {
    if (!user && router.isReady) {
      setLoading(true);

      (async () => {
        const responseUser = await userDetails(username);

        if (responseUser.error) {
          setUser({});
          console.log(responseUser.error);
          return;
        }

        setUser(responseUser.user);

        await updateRepos();
        setLoading(false);
      })()
    }
  }, [router.isReady, updateRepos, user, username]);

  useEffect(() => { updateRepos() }, [reposPage, updateRepos])

  if (!user || !repos)
    return <Loading isLoading={true} />

  return (
    <div className={styles.container}>
      <Head>
        <title>User</title>
      </Head>
      <div className={styles.title}>Profile</div>
      <div className={styles.profile}>
        <LineProfile label={'ID'} value={user.id} />
        <LineProfile label={'Login'} value={user.login} />
        <LineProfile label={'Profile URL'} value={user.html_url} url={true} />
        <LineProfile label={'Created At'} value={parseDate(user.created_at)} />
      </div>
      <div className={styles.title}>Repositories</div>
      <div className={styles.list}>
        <ListItem>
          <div className={styles.id}>ID</div>
          <div className={styles.name}>Name</div>
          <div className={styles.url}>URL</div>
        </ListItem>

        {
          repos.map(repo => (
            <ListItem key={repo.id}>
              <div className={styles.id}>{repo.id}</div>
              <div className={styles.name}>{repo.name}</div>
              <div className={styles.url}>{repo.html_url}</div>
            </ListItem>
          ))
        }

      </div>

      <div className={styles.buttonsContainer}>
        <Button
          active={reposPage - 1 !== 0}
          text={'Prev'}
          secondary={false}
          clickHandler={() => {
            setReposPage(reposPage - 1);
          }}
        />
        <Button
          active={true}
          text={'Next'}
          secondary={true}
          clickHandler={() => {
            setReposPage(reposPage + 1);
          }}
        />
      </div>
      <Loading isLoading={isLoading} />
    </div>
  );
}