import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/shadcn/avatar';
import { Button } from '@/components/ui/shadcn/button';
import { Card } from '@/components/ui/shadcn/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/shadcn/dropdown-menu';
import { cn } from '@/lib/utils';
import { CircleArrowLeftIcon, SettingsIcon } from 'lucide-react';
import Link from 'next/link';

type Props = {
  imageUrl?: string;
  name: string;
  options?: {
    label: string;
    destructive: boolean;
    onClick: () => void;
  }[];
};

export default function ChatHeader({ imageUrl, name, options }: Props) {
  return (
    <Card className='flex w-full flex-row items-center justify-between rounded-lg p-2'>
      <div className='flex items-center gap-2'>
        <Link
          href={'/chats'}
          className='block lg:hidden'
        >
          <CircleArrowLeftIcon />
        </Link>
        <Avatar>
          <AvatarImage src={imageUrl} />
          <AvatarFallback>{name.substring(0, 1)}</AvatarFallback>
        </Avatar>
        <h2 className='font-semibold'>{name}</h2>
      </div>
      <div className='flex gap-2'>
        {options ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size={'icon'}
                variant={'secondary'}
              >
                <SettingsIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {options.map((option, id) => (
                <DropdownMenuItem
                  key={id}
                  onClick={option.onClick}
                  className={cn('font-semibold', {
                    'text-destructive': option.destructive,
                  })}
                >
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        ) : null}
      </div>
    </Card>
  );
}
