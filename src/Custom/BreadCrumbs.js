export const breadCrumbsFromPathname = pathname => {
    const r = /(\/\w+)/gm
    return [...pathname.matchAll(r)].map(grp => grp[0])
}