interface RootState {
    galleries: GalleriesMap
    images: ImagesMap
    users: UsersMap
}

type Subtract<T, K> = Omit<T, keyof K>;