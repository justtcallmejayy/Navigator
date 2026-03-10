import type { ButtonHTMLAttributes } from 'react';
import styles from './Button.module.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button(props: ButtonProps) {
  return (
    <button
      {...props}
      className={[styles.button, props.className]
        .filter(Boolean)
        .join(' ')}
    />
  );
}
