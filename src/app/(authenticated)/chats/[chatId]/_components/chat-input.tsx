import { Button } from '@/components/ui/shadcn/button';
import { Card } from '@/components/ui/shadcn/card';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/shadcn/form';
import useChats from '@/hooks/useChats';
import { useMutationState } from '@/hooks/useMutationState';
import { zodResolver } from '@hookform/resolvers/zod';
import { api } from '@rootdir/convex/_generated/api';
import { ConvexError } from 'convex/values';
import { SendHorizonalIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import TextareaAutosize from 'react-textarea-autosize';
import { toast } from 'sonner';
import z from 'zod';

const chatMessageSchema = z.object({
  content: z.string().min(1, { error: 'This field cannot be empty' }),
});

export default function ChatInput() {
  const { chatId } = useChats();

  const { mutate: createMessage, pending } = useMutationState(api.message.create);

  const form = useForm<z.infer<typeof chatMessageSchema>>({
    resolver: zodResolver(chatMessageSchema),
    defaultValues: {
      content: '',
    },
  });

  const handleSubmit = async (values: z.infer<typeof chatMessageSchema>) => {
    createMessage({ chatId, type: 'text', content: [values.content] })
      .then(() => {
        form.reset();
      })
      .catch(error => {
        toast.error(error instanceof ConvexError ? error.data : 'Unexpected error occured');
      });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleInputChange = (event: any) => {
    const { value, selectionStart } = event.target;

    if (selectionStart !== null) {
      form.setValue('content', value);
    }
  };

  return (
    <Card className='relative w-full rounded-lg p-2'>
      <div className='flex w-full items-end gap-2'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className='flex w-full items-end gap-2'
          >
            <FormField
              control={form.control}
              name='content'
              render={({ field }) => (
                <FormItem className='size-full'>
                  <FormControl>
                    <TextareaAutosize
                      onKeyDown={async e => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          await form.handleSubmit(handleSubmit)();
                        }
                      }}
                      rows={1}
                      maxRows={3}
                      {...field}
                      onChange={handleInputChange}
                      onClick={handleInputChange}
                      placeholder='Type a message...'
                      className='bg-card text-card-foreground placeholder:text-muted-foreground min-h-full w-full resize-none border-0 p-1.5 outline-0'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={pending}
              size={'icon'}
              type='submit'
            >
              <SendHorizonalIcon />
            </Button>
          </form>
        </Form>
      </div>
    </Card>
  );
}
