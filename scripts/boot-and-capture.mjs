import { spawn } from 'child_process'

const cmd = process.platform === 'win32' ? 'npm.cmd' : 'npm'
const proc = spawn(cmd, ['run', 'dev'], { shell: true, cwd: process.cwd(), env: process.env })

let ready = false
const out = []

proc.stdout.on('data', (d) => {
  const s = d.toString()
  out.push(s)
  process.stdout.write(s)
  if (!ready && /Local:\s+http:\/\/localhost:\d+\//.test(s)) {
    ready = true
    process.stdout.write('\n[boot-and-capture] Detected dev server ready. Stopping server.\n')
    // give a moment for any trailing logs
    setTimeout(() => {
      proc.kill()
    }, 400)
  }
})

proc.stderr.on('data', (d) => {
  const s = d.toString()
  out.push(s)
  process.stderr.write(s)
})

proc.on('close', (code, signal) => {
  process.stdout.write(`\n[boot-and-capture] dev server process stopped (code=${code} signal=${signal})\n`)
  // print a summary
  process.stdout.write('\n=== Captured dev server output (tail) ===\n')
  const tail = out.slice(-60).join('')
  process.stdout.write(tail + '\n')
  process.exit(code === 0 ? 0 : 0)
})
