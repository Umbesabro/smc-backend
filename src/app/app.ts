import express, { Express } from 'express';
import Config from './configuration/config';
import https from 'https';
import http from 'http';
import fs from 'fs';

export default class App {
    private express: Express;

    private httpsServer: https.Server;
    private httpServer: http.Server;
    public constructor() {
        this.express = express();
    }

    private start(): void {
        if (Config.instance().HttpsMode) {
            this.createHttpsServer();
            this.listenHttpsServer();
        } else {
            this.createHttpServer();
            this.listenHttpServer();
        }
    }

    private createHttpsServer(): void {
        this.httpsServer = https.createServer(
            {
                cert: fs.readFileSync(Config.instance().PathToCert),
                key: fs.readFileSync(Config.instance().PathToKey)
            },
            this.express);
    }

    private createHttpServer(): void {
        this.httpServer = http.createServer(this.express);
    }

    private listenHttpServer(): void {
        this.httpServer.listen(Config.instance().Port, () => {
            console.log('smc-backend http server has started.');
        })
    }

    private listenHttpsServer(): void {
        this.httpsServer.listen(Config.instance().Port, () => {
            console.log('smc-backend https server has started.')
        })
    }

    private enableHealthCheck(): void {
        this.express.get('/healthcheck', (req, res) => res.sendStatus(200));
    }
}
