interface Image {
    id: string;
    title: string;
    description: string,
    datetime: number,
    type: string, //enum
    animated: boolean,
    width: number,
    height: number,
    size: number,
    views: number,
    bandwidth: number,
    vote: null,
    favorite: false,
    nsfw: false,
    section: string,
    account_url: null,
    account_id: null,
    is_ad: boolean,
    in_most_viral: boolean,
    has_sound: boolean,
    tags: [],
    ad_type: number,
    ad_url: string,
    edited: number,
    in_gallery: boolean,
    link: string,
    mp4_size: number,
    mp4: string,
    gifv: string,
    hls: string,
    ad_config: {
        safeFlags: string[],
        highRiskFlags: string[],
        unsafeFlags: [],
        showsAds: true
    },
    comment_count: null,
    favorite_count: null,
    ups: null,
    downs: null,
    points: null,
    score: number,
    is_album: false
}

 type ImagesMap = Record<string, Image>
 type QueryObj = Record<string, string>