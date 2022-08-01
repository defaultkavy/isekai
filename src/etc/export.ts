import path from 'path'
import fs from 'fs'

const src = './src'
const skip = [
    'src',
    'etc'
]
let text = ''

function execute(p: string) {
    const dir = fs.readdirSync(p)
    for (const f of dir) {
        const fPath = `${p}/${f}`
        if (fs.lstatSync(fPath).isDirectory()) {
            execute(fPath)
        } else if (fs.lstatSync(fPath).isFile()) {
            const dirbasename = path.basename(path.dirname(fPath))
            if (skip.includes(dirbasename)) continue
            if (!fPath.endsWith('.ts')) continue
            const newPath = '.' + fPath.replace('.ts', '').replace(src, '')
            text += `export * from "${newPath}"\n`
        }
    }
}

execute(src)
fs.writeFileSync(src + '/index.ts', text)