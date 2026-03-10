import type { InputHTMLAttributes } from 'react';
import styles from './Input.module.scss';

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export default function Input(props: InputProps) {
  return (
    <input
      {...props}
      className={[styles.input, props.className]
        .filter(Boolean)
        .join(' ')}
    />
  );
}
