class MissingBreakpoint extends Error {
  rawElement: JSX.Element

  constructor(option: JSX.Element) {
    super('Missing breakpoint for a gien viewport option')

    this.rawElement = option
  }
}

export {MissingBreakpoint}
