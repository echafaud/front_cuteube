export default async (action) => {
    try {
        return await action().then(value => {
            if (value.data.error) {
                return value.data.error
            } else {
                return value.data.result
            }
        })
    } catch (error) {
        console.log(error)
    }
}


