import { sql1Query, sql2Query, sql3Query } from './querys.js'

const sql1result: string[] = await sql1Query()
console.log(sql1result)

const sql2result: number = await sql2Query()
console.log(sql2result)

const sql3result: string[] = await sql3Query()
console.log(sql3result)
