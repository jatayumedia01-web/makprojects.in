type ScriptOpts = {
  id: string
  src: string
  defer?: boolean
  attrs?: Record<string, string>
}

export function loadExternalScript({
  id,
  src,
  defer = true,
  attrs = {},
}: ScriptOpts): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.getElementById(id)) {
      resolve()
      return
    }

    const script = document.createElement('script')
    script.id = id
    script.src = src
    script.defer = defer
    Object.entries(attrs).forEach(([key, value]) => {
      script.setAttribute(key, value)
    })
    script.onload = () => resolve()
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`))
    document.body.appendChild(script)
  })
}
