export type UserItem =
{
    id: string,
    login: string
};

export type ReviewItem = 
{
    id: string,
    author: UserItem,
    content: string,
    date: Date
};

export type ReleaseItem = 
{
    id: string,
    name: string,
    date: Date
};

export type MobileAppItem =
{
    id: string,
    authorId: string,
    name: string,
    description: string,
    downloads: string,
    reviews: ReviewItem[],
    releases: ReleaseItem[]
};