class a {
    b: number
    bb: b
    constructor() {
        this.b = 0
        this.bb = new b
    }

    replace(obj: a) {
        Object.assign(this, obj)
    }
}

class b {
    d: number
    constructor() {
        this.d = 0
    }
}

const map = new Map()
map.set(1, new a)

const c = map.get(1)

console.debug(c)

c.b = 1
c.bb.d += 1
const e = c.bb

console.debug(c)
console.debug(e)

c.replace(new a)

console.debug(c)
console.debug(e)