console.log("Hello JS")

/* {
    const isDeveloper = true
    console.log('isDeveloper block', isDeveloper)
}

console.log('isDeveloper outside', isDeveloper) */
const person = {
    name: 'Andrew Mead',
    age: 26
}

const field = 'age'

console.log(field, person[field])

const sum = (x, y) => x + y

console.log(sum(10, 5))
console.log(sum(10, '5'))

const t = [1, 2, 3]
const square = x => x * x
const tSquared = t.map(square)

console.log(tSquared)