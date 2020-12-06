function importElementImages(r) {
    let images = {}
    r.keys().forEach(item => { images[item.replace('./', '')] = r(item) })
    return images
}

const images = importElementImages(require.context('../../images/elements/', false, /\.png/))

export default images