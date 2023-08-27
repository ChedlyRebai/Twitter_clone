interface ButtonProps {
    label: string;
    secondary?: boolean;
    fullWidth?: boolean;
    large?: boolean;
    onClick: () => void;
    disabled?: boolean;
    outline?: boolean;
  }
  
  const Button = ({ 
    label, 
    secondary, 
    fullWidth, 
    onClick, 
    large, 
    disabled, 
    outline 
  }:ButtonProps) => {
    return ( 
      <button
        type="button"
        disabled={disabled}
        onClick={onClick}
        className={`
          disabled:opacity-70
          disabled:cursor-not-allowed
          rounded-full
          font-semibold
          hover:opacity-80
          transition
          border-2
          ${fullWidth ? 'w-full' : 'w-fit'}
          ${secondary ? 'bg-white' : 'bg-sky-500'}
          ${secondary ? 'text-black' : 'text-white'}
          ${secondary ? 'border-black' : 'border-sky-500'}
          ${large ? 'text-xl' : 'text-base  '}
          ${large ? 'px-5' : 'px-2'}
          ${large ? 'py-3' : 'py-1'}
          ${outline ? 'bg-transparent' : ''}
          ${outline ? 'border-white' : ''}
          ${outline ? 'text-white' : ''}
        `}
      >
        {label}
      </button>
     );
  }
   
  export default Button;