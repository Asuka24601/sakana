export default class myLove {
    constructor(father) {
        this.list = [];
        this.count = 0;
        this.father = father;
    }

    creatLove = function (xpos, ypos, elemId) {
        if (this.count > 10) return;
        var elem = document.createElement("div");
        elem.id = elemId;
        elem.style.left = xpos + "px";
        elem.style.top = ypos + "px";
        this.list[this.count] = elem;
        this.count++;

        this.father.appendChild(this.list[this.count - 1]);
    }

    pop = function () {
        console.assert(this.count > 0, "love is lie!");
        this.father.removeChild(this.list[0]);
        if (this.count > 1) {
            for (let i = 1; i < this.count; i++) {
                this.list[i - 1] = this.list[i];
                this.list[i] = null;
            }
        }
        this.count -= 1;
    }

    work() {
        var obj = this;

        this.father.addEventListener("click", () => {
            var event = event || window.event;
            console.assert(event !== undefined, event);
            obj.creatLove(event.pageX - 15, event.pageY - 15, "love");
            setTimeout(() => {
                obj.pop();
            }, 880);
        });
    }
}