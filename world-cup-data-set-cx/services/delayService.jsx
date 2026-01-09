class DelayService {

    static async getDelay(delayId) {

        return window.Liferay.Util.fetch('/o/c/delays/' + delayId)
            .then(response => {
                if (!response.ok) {
                    console.log(response.statusText);
                    throw new Error('Network response was not ok ' + response.statusText);
                }

                if (response.status === 204) {
                    return null;
                }

                return response.json();
            })
            .catch(error => {
                console.error(error.response?.data || error.message);
            });

    }

    static async getDelayByERC(delayERC) {

        return window.Liferay.Util.fetch('/o/c/delays/by-external-reference-code/' + delayERC)
            .then(response => {
                if (!response.ok) {
                    console.log(response.statusText);
                    throw new Error('Network response was not ok ' + response.statusText);
                }

                if (response.status === 204) {
                    return null;
                }

                return response.json();
            })
            .catch(error => {
                console.error(error.response?.data || error.message);
            });

    }    

    static async updateDelayMinutes(delayId, value) {

        return window.Liferay.Util.fetch('/o/c/delays/' + delayId, {

            headers: new Headers({
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                delayTimeMinutes: value
            }),
            method: 'PATCH'

        }).then(response => {
            if (!response.ok) {
                console.log(response.statusText);
                throw new Error('Network response was not ok ' + response.statusText);
            }

            if (response.status === 204) {
                return null;
            }

            return response.json();
        })
        .catch(error => {
            console.error(error.response?.data || error.message);
        });

    }

    static async updateDelayReasonByERC(delayERC, value) {

        return window.Liferay.Util.fetch('/o/c/delays/by-external-reference-code/' + delayERC, {

            headers: new Headers({
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                reason: { key: value }
            }),
            method: 'PATCH'

        }).then(response => {
            if (!response.ok) {
                console.log(response.statusText);
                throw new Error('Network response was not ok ' + response.statusText);
            }

            if (response.status === 204) {
                return null;
            }

            return response.json();
        })
        .catch(error => {
            console.error(error.response?.data || error.message);
        });

    }    

    static async getReasons() {

        return window.Liferay.Util.fetch('/o/headless-admin-list-type/v1.0/list-type-definitions/by-external-reference-code/DELAY_REASON_PICKLIST/list-type-entries', {

            headers: new Headers({
                Accept: 'application/json'
            }),
            method: 'GET'

        }).then(response => {
            if (!response.ok) {
                console.log(response.statusText);
                throw new Error('Network response was not ok ' + response.statusText);
            }

            if (response.status === 204) {
                return null;
            }

            return response.json();
        })
        .catch(error => {
            console.error(error.response?.data || error.message);
        });

    }

}

export default DelayService;