import { Form } from "../../script/form"
import { saveSession, getTokenSession, getSession } from "../../script/session" 


class SignupConfirmForm extends Form {
  FIELD_NAME = {
    CODE: 'code',
  }
  FIELD_ERROR = {
    IS_EMPTY: 'Введіть значення в поле',
    IS_BIG: 'Перевищено максимальну довжину значення',
  }

  validate = (name, value) => {
    if (String(value).length < 1) {
      return this.FIELD_ERROR.IS_EMPTY
    }
    if (String(value).length > 20) {
      return this.FIELD_ERROR.IS_BIG
    }
  }
  submit = async () => {
    if (this.disabled === true) {
      this.validateAll()
    } else {
      this.setAlert('progress', 'Завантаження...')
      try {
        const res = await fetch('/signup-confirm', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: this.convertData()
        })
        const data = await res.json()
        if(res.ok) {
          this.setAlert('success', data.message)
          saveSession(data.session)
          location.assign('/')
        } else {
          this.setAlert('error', data.message)
        }
      } catch (error) {
        this.setAlert('error', error.message)
      }
    }
  }
  convertData = () => {
    return JSON.stringify({
      [this.FIELD_NAME.CODE]: Number(this.value[this.FIELD_NAME.CODE]),
      token: getTokenSession(),
    })
  }
}

window.signupConfirmForm = new SignupConfirmForm()

document.addEventListener('DOMContentLoaded', () => {
  try {
      if(window.session) {
      if (window.session.user.isConfirm) {
        location.assign('/')
      }
    } else {
      location.assign('/')
    }
  } catch (e) {}

  document.querySelector('#renew').addEventListener('click', (e) => {e.preventDefault()
    const session = getSession()
    
    location.assign(`signup-confirm?renew=true&email=${session.user.email}`)
  })
})