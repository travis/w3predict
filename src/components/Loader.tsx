import { ArrowPathIcon } from '@heroicons/react/20/solid'

const Loader = ({ className = '' }: { className?: string }) => (
  <ArrowPathIcon className={`animate-spin ${className}`} />
)

export default Loader