import config from '../../../src/config'
import translate from '../../../src/utils/i18n'

describe('i18n LIB', () => {
  test('should get a translation', async () => {
    config.ENABLE_I18N_TRANSLATION = true

    expect(translate('errors.default')).toBe('An error occured !')
  })

  test('should get a translation (in another language)', async () => {
    config.ENABLE_I18N_TRANSLATION = true

    expect(translate('errors.default', { lng: 'fr' })).toBe(
      'Une erreur est survenue !'
    )
  })

  test('should not get a translation (language asked is not supported)', async () => {
    config.ENABLE_I18N_TRANSLATION = true

    expect(translate('errors.default', { lng: 'foobar' })).toBe(
      'errors.default'
    )
  })

  test('should not get a translation (ENABLE_I18N_TRANSLATION = false', async () => {
    config.ENABLE_I18N_TRANSLATION = false

    expect(translate('errors.default')).toBe('errors.default')
  })

  test('should not get a translation (translation does not exist', async () => {
    config.ENABLE_I18N_TRANSLATION = true

    expect(translate('HELLO_WORLD')).toBe('HELLO_WORLD')
  })
})
