import type { FeedItemsQuery } from 'graphql/feedItems/queries/__generated__/feed-items.generated';

export interface FeedItem {
  feedItem:
    | Exclude<FeedItemsQuery['feedRelay'], null | undefined>['edges'][number]
    | null
    | undefined;
}
