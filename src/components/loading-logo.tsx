import Image from 'next/image';

type Props = {
  size?: number;
};

export default function LoadingLogo({ size = 100 }: Props) {
  return (
    <div className='flex size-full items-center justify-center'>
      <Image
        src={'/images/logo.svg'}
        alt='Logo'
        width={size}
        height={size}
        className='animate-pulse duration-700'
        priority
      />
    </div>
  );
}
