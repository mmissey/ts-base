export const fromGalleryApi = (apiGallery: ApiGallery): Gallery => {
    return {
        id: apiGallery.id,
        title: apiGallery.title,
        description: apiGallery.description,
        datetime: apiGallery.datetime,
        cover: apiGallery.cover,
        link: apiGallery.link,
        isAlbum: apiGallery.is_album,
        nsfw: apiGallery.nsfw,
        section: apiGallery.section,
        imagesCount: apiGallery.images_count,
        images: apiGallery.images.map((img) => img.id)
    }
};

export const fromGalleryApiArray = (apiJobs: ApiGallery[]): Gallery[] =>
  apiJobs.map(fromGalleryApi);

