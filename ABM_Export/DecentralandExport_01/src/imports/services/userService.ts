import { getUserPublicKey } from "@decentraland/Identity";
import { HttpService } from "./httpService";

// DCL helpers
import * as eth from "@decentraland/EthereumController"

export const URL_SERVER = 'https://v2.lowpolyhub.com:3000';
const URL_LOGIN_ENDPOINT = `${URL_SERVER}/login`
// Only used locally
// Payload
type UserInfoDCL = {
    wallet: string;
    signature: string;
    from: string
}

// Answers Types from REQUEST
type LoginCorrectAnswer = {
    userId: string,
    token: {
        access_token: string;
    }
}

type LoginFailedAnswer = {
    statusCode: number;
    message: string;
    error: string;
}

export class UserService {

    private static instanceRef: UserService;

    loginInfo: UserInfoDCL = {
        wallet: '',
        signature: '',
        from: 'DCL'
    };

    private accessToken: string = null;
    private userId: string = null;

    private constructor() { }
    // Singleton Instance of the Object
    static instance(): UserService {
        return this.instanceRef || (this.instanceRef = new this());
    }

    async login(): Promise<string> {
        const http = HttpService.instance();

        let res: (LoginFailedAnswer | LoginCorrectAnswer) = await http.postRequest(URL_LOGIN_ENDPOINT, this.loginInfo)
        console_log('RES LOGIN', res);

        if ("error" in res) {
            return res.message
        }
        if ("token" in res) {
            this.accessToken = res.token.access_token
            this.userId = res.userId
        }
    }

    async loadUserInfo(): Promise<string> {
        //Public key of the user
        this.loginInfo.wallet = await getUserPublicKey()
        // msg needed for sign - change to constant
        // Get signature
        const msg = `# DCL Signed message
            signed: true`
        const convertedMessage = await eth.convertMessageToObject(msg)
        try {
            const { signature } = await eth.signMessage(convertedMessage)
            if (signature) {
                //throw new Error("MetaMask Message Signature: User denied message signature.");
                
                this.loginInfo.signature = signature
                
            }
        } catch (error) {
            return "MetaMask Message Signature: User denied message signature.";
        }
    }
    logoutUser(): void {
        this.loginInfo = null;
        this.accessToken = null;
        this.userId = null;
    }
    userSigned(): boolean {
        return this.loginInfo.signature ? true : false;
    }
    userIsAuth(): boolean {
        return this.accessToken ? true : false;
    }
    getAccessToken(): string {
        return this.accessToken
    }
    getWalletId(): string {
        return this.loginInfo.wallet
    }
    getUserId(): string {
        return this.userId
    }

    async signAndLogin(): Promise<string> {

   
        let exceptionSign: string, messageError: string;
    
        if (!this.userSigned()) {
            exceptionSign = await this.loadUserInfo();
            if (!exceptionSign) {
                messageError = await this.login();
            }
        }
    
        if (messageError || exceptionSign) {
            console_log("ERROR LOGIN:", messageError, exceptionSign);
            // let cornerUI = new ui.CornerLabel("Please sign the message for starting the quest.")
            // utils.setTimeout(4500, () => {
            //   cornerUI.hide();
            // })
            let errorMessage = "Login failed. Please sign again.";
            return errorMessage;
        }
    }
}




