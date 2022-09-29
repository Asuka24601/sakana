export default class myTick {
    constructor(model_, touchBox_) {
        this.model = model_;
        this.touchBox = touchBox_;
        this.x = model_.offsetLeft;
        this.y = model_.offsetTop;
        this.angle = 0;
        this.isDown = false;

        console.assert(this.model !== undefined && this.model !== Array, "null elem!");
    }

    getAngle(angle, zpx, zpy, oldx, oldy, newx, newy) {

        let rx = newx * Math.cos(angle) + newy * (0 - Math.sin(angle));
        let ry = newx * Math.sin(angle) + newy * Math.cos(angle);
        newx = rx;
        newy = ry;

        let vabx = zpx - oldx;
        let vaby = zpy - oldy;
        // console.log(vabx, vaby);
        let mab = Math.sqrt(Math.pow(vabx, 2) + Math.pow(vaby, 2));

        let vacx = zpx - newx;
        let vacy = zpy - newy;
        // console.log(vacx, vacy);
        let mac = Math.sqrt(Math.pow(vacx, 2) + Math.pow(vacy, 2));

        let vbcx = newx - oldx;
        let vbcy = newy - oldy;
        // console.log(vbcx, vbcy);
        let mbc = Math.sqrt(Math.pow(vbcx, 2) + Math.pow(vbcy, 2));

        let ca = Math.acos((Math.pow(mac, 2) + Math.pow(mab, 2) - Math.pow(mbc, 2)) / (2 * mab * mac));

        if (vbcx < 0) { ca *= -1; }
        // console.log(mab, mac, mbc);

        return 360 * ca / (2 * Math.PI);
    }

    work() {

        var obj = this;
        var pagex = 0;
        var pagey = 0;
        var angle = obj.angle;
        const zeropx = obj.x + obj.model.offsetWidth / 2;
        const zeropy = obj.y + obj.model.offsetHeight;
        var roldx = 0;
        var roldy = 0;

        const trs = "translate(-50%, -100%) ";

        document.addEventListener("mousedown", (event) => {
            if (event.target !== obj.touchBox) {
                return;
            }

            console.log("Touched");

            pagex = event.pageX;
            pagey = event.pageY;
            roldx = pagex * Math.cos(angle) + pagey * (0 - Math.sin(angle));
            roldy = pagex * Math.sin(angle) + pagey * Math.cos(angle);
            pagex = roldx;
            pagey = roldy;
            roldx = zeropx * Math.cos(angle) + zeropy * (0 - Math.sin(angle));
            roldy = zeropx * Math.sin(angle) + zeropy * Math.cos(angle);

            obj.isDown = true;
        });

        document.addEventListener("mousemove", (event) => {
            if (!obj.isDown) return;
            // if (event.target !== obj.touchBox) {
            //     return;
            // }
            const nx = event.pageX;
            const ny = event.pageY;
            angle = obj.angle + 2 * obj.getAngle(obj.angle, roldx, roldy, pagex, pagey, nx, ny);

            console.log(`rotate(${angle}deg)`);

            obj.model.style.transform = trs + `rotate(${angle}deg)`;

        });

        document.addEventListener("mouseup", () => {
            obj.angle = angle;
            obj.isDown = false;
        });
    }
}