import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/shadcn/avatar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

type Props = {
  fromCurrentUser: boolean;
  senderImage: string;
  senderName: string;
  lastByUser: boolean;
  content: string[];
  createdAt: number;
  type: string;
};

export default function MessageItem({
  fromCurrentUser,
  senderImage,
  senderName,
  lastByUser,
  content,
  createdAt,
  type,
}: Props) {
  const formatTime = (timestamp: number) => format(timestamp, 'HH:mm');

  return (
    <div
      className={cn('flex items-end', {
        'justify-end': fromCurrentUser,
      })}
    >
      <div
        className={cn('mx-2 flex w-full flex-col', {
          'order-1 items-end': fromCurrentUser,
          'order-2 items-start': !fromCurrentUser,
        })}
      >
        <div
          className={cn('max-w-[70%] rounded-lg px-4 py-2', {
            'bg-primary text-primary-foreground': fromCurrentUser,
            'bg-secondary text-secondary-foreground': !fromCurrentUser,
            'rounded-br-none': !lastByUser && fromCurrentUser,
            'rounded-bl-none': !lastByUser && !fromCurrentUser,
          })}
        >
          {type === 'text' ? (
            <p className='text-wrap break-words whitespace-pre-wrap'>{content}</p>
          ) : null}
          <p
            className={cn('my-1 flex w-full text-xs', {
              'text-primary-foreground justify-end': fromCurrentUser,
              'text-secondary-foreground justify-start': !fromCurrentUser,
            })}
          >
            {formatTime(createdAt)}
          </p>
        </div>
      </div>

      <Avatar
        className={cn('relative', {
          'order-2': fromCurrentUser,
          'order-1': !fromCurrentUser,
          'invisible': lastByUser,
        })}
      >
        <AvatarImage src={senderImage} />
        <AvatarFallback>{senderName.substring(0, 1)}</AvatarFallback>
      </Avatar>
    </div>
  );
}
