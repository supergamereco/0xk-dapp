/**
 * General runtime error
 */
export class RuntimeError extends Error {
    constructor () {
        super()
        this.message =
            'Something bad happened. Please try again later or contact the system owner.'
        this.name = 'RuntimeError'
    }
}

/**
 * The metamask can not be connected
 */
export class MetamaskConnectionError extends RuntimeError {
    constructor () {
        super()
        this.message = 'Error when try to connect Metamask.'
        this.name = 'MetamaskConnectionError'
    }
}

/**
 * The metamask balance can not be connected
 */
export class MetamaskBalanceError extends RuntimeError {
    constructor () {
        super()
        this.message = 'Error when get Metamask balance.'
        this.name = 'MetamaskBalanceError'
    }
}

/**
 * The metamask can not be processing
 */
export class MetamaskProcessingError extends RuntimeError {
    constructor () {
        super()
        this.message = 'Error! Metamask is not processing.'
        this.name = 'MetamaskProcessingError'
    }
}

/**
 * The metamask getting data error
 */
export class MetamaskGettingDataError extends RuntimeError {
    constructor () {
        super()
        this.message = 'Error! Some problems when getting data from Metamask.'
        this.name = 'MetamaskGettingDataError'
    }
}

/**
 * The metamask network error
 */
export class MetamaskNetworkError extends RuntimeError {
    constructor () {
        super()
        this.message = 'Error! Check the network.'
        this.name = 'MetamaskNetworkError'
    }
}

/**
 * The not found error
 */
export class NotFoundError extends Error {
    constructor () {
        super()
        this.message = 'Something bad happened. Please try again later.'
        this.name = 'NotFoundError'
    }
}
