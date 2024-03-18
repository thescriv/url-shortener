import crypto from 'crypto'

function encodeUrl(url: string) {
    const hash = crypto.createHash('sha256');

    const hashedUrl = hash.update(url)

    return hashedUrl.digest('hex')
}

export { encodeUrl }