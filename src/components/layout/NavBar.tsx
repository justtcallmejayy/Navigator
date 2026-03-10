import { NavLink } from 'react-router-dom';
import styles from './NavBar.module.scss';

const links = [
  { to: '/', label: 'Home' },
  { to: '/theory', label: 'Theory Library' },
  { to: '/vocabulary', label: 'Vocabulary Hub' },
  { to: '/admin/login', label: 'Admin' },
];

export default function NavBar() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <p className={styles.brand}>Navigator</p>
        <nav className={styles.nav}>
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                [styles.link, isActive ? styles.linkActive : ''].filter(Boolean).join(' ')
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
