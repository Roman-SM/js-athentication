export const createElement = (tag, className, text) => {
  const elem = document.createElement(tag)

  if(className) {
    elem.className = className
  }
  if(text) {
    elem.innerHTML = text
  }
  return elem
}