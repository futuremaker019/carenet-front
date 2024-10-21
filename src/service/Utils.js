export const getQueryString = (pageable) => {
    return Object.entries(pageable)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');
}

