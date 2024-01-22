import which from "which"
import {
  execa,
  execaCommand,
  execaCommandSync,
  execaSync,
  SyncOptions as ExecaSyncOptions,
  ExecaSyncReturnValue,
  Options as ExecaOptions,
  ExecaChildProcess,
} from "execa"

/** Detect if sudo is available */
export function hasSudo(): boolean {
  return which.sync("sudo", { nothrow: true }) !== null
}

/**
 * Detect if the process has root privilege on Posix.
 *
 * @example
 *
 * ```js
 * import { isRoot } from "admina"
 *
 * console.log(isRoot())
 * //=> false
 * ```
 *
 * @returns Whether the process is running as root.
 */
export function isRoot(): boolean {
  // TODO not all CI systems are root
  return process.getuid?.() === 0 || Boolean(process.env.CI)
}

/** Detect if sudo is available and the user has root privileges */
export function isSudo(): boolean {
  return isRoot() && hasSudo()
}

/** Prepend `sudo` to the command if sudo is available */
export function prependSudo(command: string) {
  if (isSudo()) {
    return `sudo ${command}`
  }
  return command
}

/** Default exec options `{ stdio: "inherit", shell: true }` */
export const defaultExecOptions: ExecaSyncOptions = { stdio: "inherit", shell: true }

/**
 * Execute a command as root if sudo is available. Otherwise executes the command normally without sudo.
 *
 * @param program The program to spawn
 * @param args The command arguments
 * @param execOptions The options passed to `execa`. Defaults to `{ stdio: "inherit", shell: true }`
 * @returns The execution result
 */
export function execRootSync(
  program: string,
  args: string[] = [],
  execOptions: ExecaSyncOptions = defaultExecOptions,
): ExecaSyncReturnValue<string> {
  if (isSudo()) {
    const command = getSudoCommand(program, args)
    return execaCommandSync(command, execOptions)
  } else {
    return execaSync(program, quote(args), execOptions)
  }
}

/**
 * Asynchronously execute a command as root if sudo is available. Otherwise executes the command normally without sudo.
 *
 * @param program The program to spawn
 * @param args The command arguments
 * @param execOptions The options passed to `execa`. Defaults to `{ stdio: "inherit", shell: true }`
 * @returns A promise to the execution result
 */
export function execRoot(
  program: string,
  args: string[] = [],
  execOptions: ExecaOptions = defaultExecOptions,
): ExecaChildProcess<string> {
  if (isSudo()) {
    const command = getSudoCommand(program, args)
    return execaCommand(command, execOptions)
  } else {
    return execa(program, quote(args), execOptions)
  }
}

function getSudoCommand(program: string, args: string[]) {
  return `sudo ${quote([program, ...args]).join(" ")}`
}

function quote(strings: string[]) {
  return strings.map((str) => `'${str}'`)
}
