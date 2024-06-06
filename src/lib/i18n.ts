import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

export const resources = {
  en: {
    translation: {
      root_phrase:
        'Good design is as little design as possible. Less, but better - because it concentrates on the essential aspects, and the products are not burdened with non-essentials. Back to purity, back to simplicity.',
      login_title: 'Sign In',
      login_subtitle: 'Enter your credentials below to continue',
      login_email: 'Email',
      login_email_placeholder: 'name@acme.com',
      login_password: 'Password',
      login_password_placeholder: 'password',
      login_continue: 'Continue',
      login_terms:
        'By clicking continue, you agree to our <2>Terms of Service</2> and <6>Privacy Policy</6>.',
      login_error_title: 'Oops!',
      login_error_description:
        'Could not log in. Please check your credentials and try again.',
      user_title: 'My Account',
      user_subtitle: 'See your details below',
      user_firstname: 'First name',
      user_lastname: 'Last name',
      user_signout: 'Sign Out',
      user_error:
        'An error occurred while fetching your details. Please try again later.'
    }
  },
  pt: {
    translation: {
      root_phrase:
        'Bom design é o mínimo possível. Menos, mas melhor - porque se concentra nos aspectos essenciais, e os produtos não são sobrecarregados com não essenciais. De volta à pureza, de volta à simplicidade.',
      login_title: 'Entrar',
      login_subtitle: 'Digite suas credenciais abaixo para continuar',
      login_email: 'Email',
      login_email_placeholder: 'name@acme.com',
      login_password: 'Senha',
      login_password_placeholder: 'senha',
      login_continue: 'Continuar',
      login_terms:
        'Ao clicar em continuar, você concorda com nossos <2>Termos de Serviço</2> e <6>Política de Privacidade</6>.',
      login_error_title: 'Oops!',
      login_error_description:
        'Não foi possível fazer login. Verifique suas credenciais e tente novamente.',
      user_title: 'Minha Conta',
      user_subtitle: 'Veja seus detalhes abaixo',
      user_firstname: 'Primeiro nome',
      user_lastname: 'Sobrenome',
      user_signout: 'Sair',
      user_error:
        'Ocorreu um erro ao buscar seus detalhes. Por favor, tente novamente mais tarde.'
    }
  },
  de: {
    translation: {
      root_phrase:
        'Gutes Design ist so wenig Design wie möglich. Weniger, aber besser - weil es sich auf die wesentlichen Aspekte konzentriert und die Produkte nicht mit Unwesentlichem belastet sind. Zurück zur Reinheit, zurück zur Einfachheit.',
      login_title: 'Einloggen',
      login_subtitle:
        'Geben Sie unten Ihre Anmeldeinformationen ein, um fortzufahren',
      login_email: 'E-Mail',
      login_email_placeholder: 'name@acme.com',
      login_password: 'Passwort',
      login_password_placeholder: 'passwort',
      login_continue: 'Fortsetzen',
      login_terms:
        'Durch Klicken auf Fortsetzen stimmen Sie unseren <2>Servicebedingungen</2> und unserer <6>Datenschutzrichtlinie</6> zu.',
      login_error_title: 'Hoppla!',
      login_error_description:
        'Anmeldung fehlgeschlagen. Bitte überprüfen Sie Ihre Anmeldeinformationen und versuchen Sie es erneut.',
      user_title: 'Mein Konto',
      user_subtitle: 'Sehen Sie unten Ihre Details',
      user_firstname: 'Vorname',
      user_lastname: 'Nachname',
      user_signout: 'Ausloggen',
      user_error:
        'Beim Abrufen Ihrer Details ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.'
    }
  }
} as const

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false
  }
})
