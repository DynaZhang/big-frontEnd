import moduleA from './modules/a'
import './styles/global.scss'

const set = new Set([1,2,3,4,5,1,1])
const arr = Array.from(set)

console.log(moduleA.age)
console.log(arr)