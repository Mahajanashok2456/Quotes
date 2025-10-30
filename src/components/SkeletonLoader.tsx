interface SkeletonLoaderProps {
  className?: string;
  variant?: 'card' | 'text' | 'circle' | 'rectangle';
  lines?: number;
}

export default function SkeletonLoader({
  className = '',
  variant = 'rectangle',
  lines = 1
}: SkeletonLoaderProps) {
  const baseClasses = 'animate-pulse bg-gray-200 dark:bg-gray-700';

  if (variant === 'card') {
    return (
      <div className={`rounded-xl bg-deep-teal/70 backdrop-blur-lg border border-white/10 p-6 ${className}`}>
        <div className={`${baseClasses} h-4 w-3/4 mb-4`}></div>
        <div className={`${baseClasses} h-4 w-full mb-2`}></div>
        <div className={`${baseClasses} h-4 w-5/6 mb-4`}></div>
        <div className={`${baseClasses} h-3 w-1/4 ml-auto`}></div>
        <div className={`${baseClasses} h-3 w-1/3 ml-auto mt-2`}></div>
        <div className="flex justify-end gap-4 mt-4">
          <div className={`${baseClasses} h-8 w-16 rounded-full`}></div>
          <div className={`${baseClasses} h-8 w-16 rounded-full`}></div>
        </div>
      </div>
    );
  }

  if (variant === 'circle') {
    return <div className={`${baseClasses} rounded-full ${className}`}></div>;
  }

  if (variant === 'text') {
    return (
      <div className={className}>
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={`${baseClasses} h-4 mb-2 ${index === lines - 1 ? 'w-3/4' : 'w-full'}`}
          ></div>
        ))}
      </div>
    );
  }

  // Default rectangle variant
  return <div className={`${baseClasses} ${className}`}></div>;
}