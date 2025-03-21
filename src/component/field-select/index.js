class FieldSelect {
  static toggle = (target) => {
    const options = target.nextElementSibling
    options.toggleAttribute('active')

    setTimeout(() => {
      window.addEventListener(
        'click',
        (e) => {
          if(!options.parentElement.contains(e.target))
            options.removeAttribute('active')
        },
        {once: true},
      )
    })
  }
  static change = (target) => {
    const parent = target.parentElement.parentElement
    const list = target.parentElement

    const active = list.querySelector('*[active]')
    if(active) active.toggleAttribute('active')

    target.toggleAttribute('active')
  
    const value = parent.querySelector('.field__label')

    if(value) {
      value.innerText = target.innerText
      value.classList.remove('.field__label--placeholder')
    }
    list.toggleAttribute('active')
  }
}
window.fieldSelect = FieldSelect