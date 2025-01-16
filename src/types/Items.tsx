export type UserItem =
{
    id: string,
    login: string
};

export type ReleaseItem = 
{
    id: string,
    name: string,
    releaseDate: Date
};

export type Category = 
{
    id: string,
    name: string
};

export type MobileAppItem =
{
    id: string,
    developer: string,
    category: Category,
    name: string,
    packageName: string,
    description: string,
    versions: ReleaseItem[],
    latest: string,
    rate: boolean,
    downloads: number
};