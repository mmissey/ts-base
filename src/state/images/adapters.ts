export const fromImageApi = (apiImage: ApiImage): Image => {
    return {
        id: apiImage.id,
        title: apiImage.title,
        description: apiImage.description,
        created: apiImage.datetime,
        type: apiImage.type,
        width: apiImage.width,
        height: apiImage.height,
        views: apiImage.views,
        nsfw: apiImage.nsfw,
        link: apiImage.link,
        mp4: apiImage.mp4,
        gifv: apiImage.gifv,
        hls: apiImage.hls
    }
};

export const fromImageApiArray = (apiJobs: ApiImage[]): Image[] =>
  apiJobs.map(fromImageApi);

