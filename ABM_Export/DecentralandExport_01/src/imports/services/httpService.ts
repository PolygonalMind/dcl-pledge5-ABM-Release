import * as utils from "@dcl/ecs-scene-utils"

export class HttpService {
    private static instanceRef: HttpService;

    // Llamar singleton en el constructor
    private constructor() { }
    // Singleton Instance of the Object
    static instance(): HttpService {
        return this.instanceRef || (this.instanceRef = new this());
    }
    postRequest(url: string, payload: any, tokenID?: string): Promise<any> {
        let headers = createHeaders(tokenID);
        
        return utils.sendRequest(
            url,
            'POST',
            headers,
            payload
        )
    }
    putRequest(url: string, payload: any, tokenID?: string,): Promise<any> {
        let headers = createHeaders(tokenID);
        
        return utils.sendRequest(
            url,
            'PUT',
            headers,
            payload
        )
    }
    getRequest(url: string, tokenID: string): Promise<any> {
        let headers = createHeaders(tokenID);
        
        return utils.sendRequest(
            url,
            'GET',
            headers
        )
    }
    async deleteRequest(url: string): Promise<any> {
        await utils.sendRequest(
            url,
            'DELETE'
        )
    }

}

function createHeaders(tokenID?: string): {} {
    let headers: any;

    if (tokenID) {
        headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenID}`
        }
        return headers;
    }
    return {
        'Content-Type': 'application/json'
    };
}