"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const socket_service_1 = require("../../service/socket.service");
const MINIMIZED = localStorage.getItem("statusComponent-minimized") == "true";
let StatusComponent = class StatusComponent {
    constructor(socketService, rootElement) {
        this.socketService = socketService;
        this.rootElement = rootElement;
        this.bufferSize = 20;
    }
    ngOnInit() {
        this.logs = this.socketService.logsObservable
            .scan((arr, logStr) => {
            arr.push(logStr);
            return arr.slice(-1 * this.bufferSize);
        }, []);
        let e = this.rootElement.nativeElement;
        e.classList.add("notransition");
        this.toggle(MINIMIZED);
        e.offsetHeight; // Trigger a reflow, flushing the CSS changes
        e.classList.remove("notransition");
    }
    toggle(force) {
        this.minimized = force != null ? force : !this.minimized;
        this.rootElement.nativeElement.classList.toggle("minimized", this.minimized);
        localStorage.setItem("statusComponent-minimized", this.minimized + "");
    }
};
StatusComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'status.component.html',
        styleUrls: ['status.component.css'],
        selector: 'status',
        changeDetection: core_1.ChangeDetectionStrategy.OnPush
    }),
    __metadata("design:paramtypes", [socket_service_1.SocketService, core_1.ElementRef])
], StatusComponent);
exports.StatusComponent = StatusComponent;
