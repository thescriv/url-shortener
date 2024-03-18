import nock from 'nock'

import { shortedUrlClient } from '../../../src/helpers/db_mongo'
import { ShortenedURL } from '../../../src/interface'
import { beforeAllSetupMongo } from '../../setup/jest.setup.beforeAll'

let client: any

describe('HelloWorld API', () => {
    beforeAll(async () => {
        client = await beforeAllSetupMongo(3000)
    })

    describe('POST /shorten/url', () => {
        test('do shorten url', async () => {
            const { body, status } = await client.postShortenUrl({ url: 'https://abc.fr' })

            expect(status).toBe(200)
            expect(body).toEqual({ slug_shorten_url: "suff5839" })

            const shortenedUrl = (await shortedUrlClient().findOne({ origin: 'https://abc.fr' })) as ShortenedURL | null
            expect(shortenedUrl?.origin).toEqual('https://abc.fr')
            expect(shortenedUrl?.hashed).toEqual('ff58393a07e13ea8c32558bed9a4a85a02eaa070244fd116cc0c0bf8c0c1fbdb')
            expect(shortenedUrl?.slug).toEqual('suff5839')

            const { body: body1, status: status2 } = await client.postShortenUrl({ url: 'https://abc.fr' })

            expect(status2).toBe(200)
            expect(body1).toEqual({ slug_shorten_url: "suff5839" })

            const doc = await shortedUrlClient().countDocuments({ origin: 'https://abc.fr' })
            expect(doc).toBe(1)

        })
    })

    // Unable to perform a valid test when creating a redirection.
    // TODO : check this for futur integration -> https://stackoverflow.com/a/16311147
    /* describe('GET /^\/su[\\w\\d]{6}$/', () => {
        test('do shorten url', async () => {
            nock('https://abc.fr')
                .get('/suff5839')
                .reply(302, '', { 'Location': 'https://example.com' });

            await shortedUrlClient().insertOne({
                slug: "suff5839",
                origin: "https://abc.fr",
                hashed: "ff58393a07e13ea8c32558bed9a4a85a02eaa070244fd116cc0c0bf8c0c1fbdb"
            })

            console.log(await shortedUrlClient().findOne({ slug: "suff5839" }))

            const ctx = await client.getRedirectUrl('suff5839')
            console.log(ctx.body)
            console.log(ctx.headers)

            expect(ctx.status).toBe(301)
            expect(ctx.headers.location).toEqual("https://abc.fr")
        })
    }) */
})
