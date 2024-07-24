

const about = {
    namespace: "about",
    afterEnter(data) {
        console.log(`enter ${this.namespace}`);
    },
    beforeLeave() {
        console.log(`leave ${this.namespace}`);
    }
}

export default about