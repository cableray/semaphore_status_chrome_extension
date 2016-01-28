import html from './lib/html'

const process = function({options: {page} = {}, buildPath, scripts}) {
  // try{
  if(!page) return

  scripts.push(html(page, buildPath))

  return true
// } catch (e) {console.log(e)}
}

export default function(manifest, {buildPath}) {

  const {options_ui} = manifest

  const scripts = []

  process({options: options_ui, buildPath, scripts})

  return {scripts}
}

