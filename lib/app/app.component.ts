import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SocketService } from './service/socket.service';
import { ConfigService } from './service/config.service';
import { StatusComponent } from './status/status.component';
import { Observable } from 'rxjs/Observable';

var cp = nw.require("child_process");
var path = nw.require("path");
var fs = nw.require("fs");
var os = nw.require("os");

var PROXY_ERR_OUT_PATH = path.join(os.tmpdir(), "pro-xy-tmp-err.log");

@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    constructor(private socketService: SocketService, private configService: ConfigService) { }

    statusObservable: Observable<boolean>
    configObservable: Observable<Object>

    @ViewChild('status') status: StatusComponent;

    ngOnInit(): void {
        this.statusObservable = this.socketService.getConnectStatusObservable();
        this.socketService.getConfigObservable().subscribe(config => {
            var replaces = config.proxyUrlReplace.replaces;
            var activeUrlReplaces = replaces.filter(r => !r.disabled).map(r => r.name);
            document.title = activeUrlReplaces.length ? `PRO-XY (${activeUrlReplaces.join(", ")})` : "PRO-XY";
        });
    }

    startProxy() {
        try {
            var cs = this.configService;
            if (!cs.configExists()) {
                var create = confirm("Config does not exists. Create default config?");
                if (!create) {
                    return;
                }
                cs.createDefaultConfig();
            }
            var config = cs.getConfig();
            if (!~config.plugins.indexOf("pro-xy-ws-api")) {
                throw new Error("Config does not contain 'pro-xy-ws-api' plugin which is needed for pro-xy-ui. Not starting pro-xy.")
            }

            var proxyPath = path.resolve(path.dirname(process.mainModule.filename), "./node_modules/.bin/pro-xy");
            if (/^win/.test(process.platform)) {
                proxyPath += ".cmd";
            }
            var errFileDesc = fs.openSync(PROXY_ERR_OUT_PATH, "w+");
            var proxyProcess = cp.spawn(proxyPath, [], { detached: true, stdio: ["ignore", "ignore", errFileDesc] });
            proxyProcess.unref();

            setTimeout(() => this.checkErrOut(errFileDesc), 1000); //wait 1sec then check if theres some err out of started process
        } catch (e) {
            alert(`Error while starting proxy: ${e.message}`);
        }
    }

    killProxy() {
        this.socketService.sendKillSignal();
    }

    toggleStatus() {
        this.status.toggle();
    }

    checkErrOut(fd) {
        var content = fs.readFileSync(PROXY_ERR_OUT_PATH, "utf8");
        if (!!content) {
            alert("Error while starting pro-xy: " + content);
        }
    }

    handleModified(event) {
        debugger;
        console.log(event);
    }
}
