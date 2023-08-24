// spell-checker:words jsona

import Jsona from 'jsona'

export function attachJsonApiUnpacker (axios) {
    const jsona = new Jsona()
    axios.interceptors.response.use((success) => {
        if (success.data) {
            success.data = jsona.deserialize(success.data)
        }
        return success
    })
}
