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
            const { body, status } = await client.postShortenUrl({ url: 'abc.fr' })

            expect(status).toBe(200)
            expect(body).toEqual({ slug_shorten_url: "su7a2e22" })

            const shortenedUrl = (await shortedUrlClient().findOne({ origin: 'abc.fr' })) as ShortenedURL | null
            expect(shortenedUrl?.origin).toEqual('abc.fr')
            expect(shortenedUrl?.hashed).toEqual('7a2e223932392cce89d0211d4ea7cc317e39f2c7056a8f5a5152bcb7e54183e3')
            expect(shortenedUrl?.slug).toEqual('su7a2e22')

            const { body: body1, status: status2 } = await client.postShortenUrl({ url: 'abc.fr' })

            expect(status2).toBe(200)
            expect(body1).toEqual({ slug_shorten_url: "su7a2e22" })

            const doc = await shortedUrlClient().countDocuments({ origin: 'abc.fr' })
            expect(doc).toBe(1)

        })
    })
})
