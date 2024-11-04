export const getQueryString = (pageable) => {
    return Object.entries(pageable)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');
}

export const initSlicePageable = {
    size: 15,
    page: 0,
    sort: 'createdAt,desc',
    last: false
}

