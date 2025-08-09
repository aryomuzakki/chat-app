import { ConvexError, v } from 'convex/values';
import { mutation } from './_generated/server';
import { getUserByClerkId } from './_utils';

export const remove = mutation({
  args: {
    chatId: v.id('chats'),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new ConvexError('Unauthorized');
    }

    const currentUser = await getUserByClerkId({ ctx, clerkId: identity.subject });

    if (!currentUser) {
      throw new ConvexError('User not found');
    }

    const chat = await ctx.db.get(args.chatId);

    if (!chat) {
      throw new ConvexError('Chat not found');
    }

    const memberships = await ctx.db
      .query('chatMembers')
      .withIndex('by_chatId', q => q.eq('chatId', args.chatId))
      .collect();

    if (!memberships || memberships.length !== 2) {
      throw new ConvexError('This conversation does not have any members');
    }

    const friendships = await ctx.db
      .query('friends')
      .withIndex('by_chatId', q => q.eq('chatId', args.chatId))
      .unique();

    if (!friendships) {
      throw new ConvexError('Friendships could not be found');
    }

    const messages = await ctx.db
      .query('messages')
      .withIndex('by_chatId', q => q.eq('chatId', args.chatId))
      .collect();

    await ctx.db.delete(args.chatId);

    await ctx.db.delete(friendships._id);

    await Promise.all(
      memberships.map(async membership => {
        await ctx.db.delete(membership._id);
      }),
    );

    await Promise.all(
      messages.map(async message => {
        await ctx.db.delete(message._id);
      }),
    );
  },
});
