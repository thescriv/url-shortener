import createError from 'http-errors'

import { ContextApp, ShortenedURL } from '../../interface'

import { validateShortenerUrldBody } from './shorten.schema'
import { encodeUrl } from './shorten.lib'
import { shortedUrlClient } from '../../helpers/db_mongo'


async function postShortenUrlController(ctx: ContextApp) {
    const {
        request: { body }
    } = ctx

    const validator = validateShortenerUrldBody(body)

    if (!validator.isValid) {
        throw createError(400, validator.errors[0])
    }

    const hashedUrl = encodeUrl(body.url)

    const hashedSlug = hashedUrl.slice(0, 6)

    const slug = `su${hashedSlug}`

    const shortenedUrl: ShortenedURL = {
        origin: body.url,
        hashed: hashedUrl,
        slug
    }

    const hashedCount = await shortedUrlClient().count({ hashed: hashedUrl })
    if (hashedCount === 0) {
        await shortedUrlClient().insertOne(shortenedUrl)
    }

    ctx.body = { slug_shorten_url: slug }
}

async function postRedirectShortedUrlController(ctx: ContextApp) {
    const { url } = ctx

    console.log( url.slice(1, 9))

    const res = await shortedUrlClient().findOne({slug: url.slice(1, 9)}) as ShortenedURL | null
    console.log(res)

    if (res === undefined) {
        return ctx.body = {}
    }

    console.log(res)

    ctx.status = 301
    ctx.body = res?.origin
}

export { postShortenUrlController, postRedirectShortedUrlController }
