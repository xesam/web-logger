class Logger {
    constructor(host) {
        this.host = host;
    }

    log(data) {
        return fetch(`${this.host}/log`, {
            body: JSON.stringify(data),
            cache: 'no-cache',
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST',
            mode: 'cors'
        }).then(res => res.json());
    }
}