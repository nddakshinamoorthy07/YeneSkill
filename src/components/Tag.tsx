interface TagProps {
  text: string;
  variant?: 'primary' | 'secondary' | 'accent';
  size?: 'sm' | 'md';
}

const Tag = ({ text, variant = 'secondary', size = 'md' }: TagProps) => {
  const variants = {
    primary: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
    secondary: 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300',
    accent: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300',
  };

  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
  };

  return (
    <span className={`inline-block rounded-full font-medium ${variants[variant]} ${sizes[size]}`}>
      {text}
    </span>
  );
};

export default Tag;
