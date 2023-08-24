import log from 'loglevel'

import { errors } from '@/js/errors'
import { Bus } from '@/js/helpers/event-bus'

export class ErrorHandler {
    static process (error, translationId = '') {
        const msgTrId = translationId || ErrorHandler._getTranslationId(error)

        Bus.error(msgTrId)
        log.error(error)
    }

    static processWithoutFeedback (error) {
        log.error(error)
    }

    static _getTranslationId (error) {
        let translationId

        switch (error.constructor) {
            case errors.NotFoundError:
                translationId = 'errors.not-found'
                break
            case errors.MetamaskConnectionError:
                translationId = 'errors.metamask-cannot-connect'
                break
            case errors.MetamaskBalanceError:
                translationId = 'errors.balance-error'
                break
            case errors.MetamaskProcessingError:
                translationId = 'errors.processing-error'
                break
            case errors.MetamaskGettingDataError:
                translationId = 'errors.getting-data-error'
                break
            case errors.MetamaskNetworkError:
                translationId = 'errors.getting-data-error'
                break
            default:
                translationId = 'errors.default'
        }

        return translationId
    }
}
