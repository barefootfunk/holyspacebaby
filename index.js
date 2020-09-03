import React from "react"
import CMS from 'netlify-cms'
// Now the registry is available via the CMS object.
CMS.registerPreviewTemplate('my-template', MyTemplate)

export default function Home() {
  return <div>Hello world!</div>
}
