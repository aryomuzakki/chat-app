import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/shadcn/avatar';
import { Button } from '@/components/ui/shadcn/button';
import { Card } from '@/components/ui/shadcn/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/shadcn/dialog';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/shadcn/dropdown-menu';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/shadcn/form';
import { Input } from '@/components/ui/shadcn/input';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/shadcn/tooltip';
import { useMutationState } from '@/hooks/useMutationState';
import { zodResolver } from '@hookform/resolvers/zod';
import { api } from '@rootdir/convex/_generated/api';
import { useQuery } from 'convex/react';
import { ConvexError } from 'convex/values';
import { CirclePlusIcon, XIcon } from 'lucide-react';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';

type Props = {};

const createGroupFormSchema = z.object({
  name: z.string().min(1, { error: 'This field cannot be empty' }),
  members: z.string().array().min(1, { error: 'You must select at least 1 friend' }),
});

export default function CreateGroupDialog({}: Props) {
  const friends = useQuery(api.friends.get);

  const { mutate: createGroup, pending } = useMutationState(api.chat.createGroup);

  const form = useForm<z.infer<typeof createGroupFormSchema>>({
    resolver: zodResolver(createGroupFormSchema),
    defaultValues: {
      name: '',
      members: [],
    },
  });

  const members = form.watch('members', []);

  const unselectedFriends = useMemo(
    () => (friends ? friends.filter(friend => !members.includes(friend._id)) : []),
    [members, friends],
  );

  const handleSubmit = async (values: z.infer<typeof createGroupFormSchema>) => {
    await createGroup({ name: values.name, members: values.members })
      .then(() => {
        form.reset();
        toast.success('Group created!');
      })
      .catch(error => {
        toast.error(error instanceof ConvexError ? error.data : 'Unexpected error occurred');
      });
  };

  return (
    <Dialog>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size={'icon'}
            variant={'outline'}
            asChild
          >
            <DialogTrigger>
              <CirclePlusIcon />
            </DialogTrigger>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Create Group</p>
        </TooltipContent>
      </Tooltip>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Group</DialogTitle>
          <DialogDescription>Add your friends to get started!</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className='space-y-8'
          >
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Group Name...'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='members'
              render={() => (
                <FormItem>
                  <FormLabel>Friends</FormLabel>
                  <FormControl>
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        asChild
                        disabled={unselectedFriends.length === 0}
                      >
                        <Button
                          className='w-full'
                          variant={'outline'}
                        >
                          Select
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className='w-full'>
                        {unselectedFriends.map(friend => (
                          <DropdownMenuCheckboxItem
                            key={friend._id}
                            className='flex w-full items-center gap-2 p-2'
                            onCheckedChange={checked => {
                              if (checked) {
                                form.setValue('members', [...members, friend._id]);
                                form.trigger('members');
                              }
                            }}
                          >
                            <Avatar className=''>
                              <AvatarImage src={friend.imageUrl} />
                              <AvatarFallback>{friend.username.substring(0, 1)}</AvatarFallback>
                            </Avatar>
                            <h4 className='truncate'>{friend.username}</h4>
                          </DropdownMenuCheckboxItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {members && members.length ? (
              <Card className='no-scrollbar flex h-24 w-full flex-row items-center gap-3 overflow-x-auto p-2 pt-4'>
                {friends
                  ?.filter(friend => members.includes(friend._id))
                  .map(friend => (
                    <div
                      key={friend._id}
                      className='flex flex-col items-center gap-1'
                    >
                      <div className='relative'>
                        <Avatar className=''>
                          <AvatarImage src={friend.imageUrl} />
                          <AvatarFallback>{friend.username.substring(0, 1)}</AvatarFallback>
                        </Avatar>
                        <XIcon
                          className='text-muted-foreground bg-muted absolute bottom-8 left-7 size-4 cursor-pointer rounded-full'
                          onClick={() => {
                            form.setValue(
                              'members',
                              members.filter(id => id !== friend._id),
                            );
                          }}
                        />
                      </div>
                      <p className='truncate text-sm'>{friend.username.split(' ')[0]}</p>
                    </div>
                  ))}
              </Card>
            ) : null}

            <DialogFooter>
              <Button
                disabled={pending}
                type='submit'
              >
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
