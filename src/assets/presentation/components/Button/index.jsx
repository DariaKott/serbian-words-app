import './styles.scss';
import classNames from 'classnames';

export const Button = ({ children, onClick, variant = 'primary', className = '', ...props }) => {
  return (
    <button
      className={classNames('button', `button--${variant}`, className)}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};
