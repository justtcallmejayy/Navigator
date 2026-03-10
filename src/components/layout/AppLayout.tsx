import { Outlet } from 'react-router-dom';
import styles from './AppLayout.module.scss';
import NavBar from './NavBar';

export default function AppLayout() {
  return (
    <div className={styles.root}>
      <NavBar />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}
