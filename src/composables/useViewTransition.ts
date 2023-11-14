((doc: any) => {
  if (!doc.startViewTransition) {
    doc.startViewTransition = <T extends (...args: any) => any>(cb: T) => cb()
  }
})(document)

const useViewTransition = <T extends (...args: any) => any>(cb: T): void => {
  (document as any).startViewTransition(cb)
}

export default useViewTransition
