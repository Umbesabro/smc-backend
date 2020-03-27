import selfsigned from 'selfsigned';
import fs from 'fs';

export default class Config {

    private static readonly config = new Config();

    private host: string;
    private port: string;
    private https_mode: boolean;
    private pathToCert: string;
    private pathToKey: string;

    public constructor() {
        this.init();
    }

    public static instance() {
        return this.config;
    }

    public get Host(): string {
        return this.host;
    }

    public get Port(): string {
        return this.port;
    }

    public get HttpsMode(): boolean {
        return this.https_mode;
    }

    public get PathToCert() {
        return this.pathToCert;
    }

    public get PathToKey() {
        return this.pathToKey;
    }

    private init() {
        this.loadSystemVariablesFromDotEnv();
        this.host = process.env.HOST;
        this.port = process.env.PORT;
        this.pathToCert = process.env.PATH_TO_CERT;
        this.pathToKey = process.env.PATH_TO_KEY;
        this.https_mode = process.env.HTTPS_MODE === 'true';

        if(this.certificatesExist()) {
            this.genertSelfSignedCertificates();
        }
    }

    private loadSystemVariablesFromDotEnv() {
        if (process.env.NODE_ENV) {
            require('custom-env').env(process.env.NODE_ENV);
        }
        else {
            require('custom-env').env();
        }
    }

    private certificatesExist():boolean {
        return fs.existsSync(this.pathToCert) && fs.existsSync(this.pathToKey);
    }

    private genertSelfSignedCertificates(): void {
        const certsDir = 'certificates';
        const attributes = [{ name: 'commonName', value: 'smc-backend' }]
        const pems = selfsigned.generate(attributes, { days: 365 });
        fs.mkdirSync(certsDir, { recursive: true });
        fs.writeFileSync(this.pathToCert, pems.cert);
        fs.writeFileSync(this.pathToKey, pems.private);
    }
}
