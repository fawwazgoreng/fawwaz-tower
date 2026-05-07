export type Echo = {
    id: string,
    message: string,
    name: string,
    floor: number,
    rank: string,
    title: string,
    created_at: string
}

export type CreateEchoType = {
    message: string,
    name: string,
    floor: number,
    rank: string,
    title: string
}