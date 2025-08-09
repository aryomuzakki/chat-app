import { ConvexError } from 'convex/values';
import type { Id } from './_generated/dataModel';
import { query, type MutationCtx, type QueryCtx } from './_generated/server';
import { getUserByClerkId } from './_utils';

export const get = query({
  args: {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new ConvexError('Unauthorized');
    }

    const currentUser = await getUserByClerkId({ ctx, clerkId: identity.subject });

    if (!currentUser) {
      throw new ConvexError('User not found');
    }

    const chatMemberships = await ctx.db
      .query('chatMembers')
      .withIndex('by_memberId', q => q.eq('memberId', currentUser._id))
      .collect();

    const chats = await Promise.all(
      chatMemberships?.map(async membership => {
        const chat = await ctx.db.get(membership.chatId);

        if (!chat) {
          throw new ConvexError('Chat could not be found');
        }

        return chat;
      }),
    );

    const chatWithDetails = await Promise.all(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      chats.map(async (chat, index) => {
        const allChatMemberships = await ctx.db
          .query('chatMembers')
          .withIndex('by_chatId', q => q.eq('chatId', chat._id))
          .collect();

        const lastMessage = await getLastMessageDetails({ ctx, id: chat.lastMessageId });

        if (chat.isGroup) {
          return { chat, lastMessage };
        } else {
          const otherMembership = allChatMemberships.filter(
            membership => membership.memberId !== currentUser._id,
          )[0];

          const otherMember = await ctx.db.get(otherMembership.memberId);

          return { chat, otherMember, lastMessage };
        }
      }),
    );

    return chatWithDetails;
  },
});

const getLastMessageDetails = async ({
  ctx,
  id,
}: {
  ctx: QueryCtx | MutationCtx;
  id?: Id<'messages'>;
}) => {
  if (!id) return null;

  const message = await ctx.db.get(id);

  if (!message) return null;

  const sender = await ctx.db.get(message.senderId);

  if (!sender) return null;

  const content = getMessageContent(message.type, message.content as unknown as string);

  return {
    content,
    sender: sender?.username,
  };
};

const getMessageContent = (type: string, content: string) => {
  switch (type) {
    case 'text':
      return content;
    default:
      return '[Non-text]';
  }
};
