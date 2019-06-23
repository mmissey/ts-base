interface RootState {
    images: ImagesMap
}

type Subtract<T, K> = Omit<T, keyof K>;