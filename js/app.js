class app extends HTMLElement {
  constructor() {
    super()

    let shadow = this.attachShadow({ mode: 'open' })
    this.divCards = document.createElement('div')
    this.divCards.classList.add('cards-grid')
    shadow.appendChild(this.divCards)
  }

  connectedCallback() {
    let dataUsers = []
    const getUsers = async () => {
      const resp1 = await fetch('https://reqres.in/api/users?page=1')
      const { data: data1 } = await resp1.json()
      const resp2 = await fetch('https://reqres.in/api/users?page=2')
      const { data: data2 } = await resp2.json()
      return [...data1, ...data2]
    }

    if (localStorage.getItem('dataUsers')) {
      let data = JSON.parse(localStorage.getItem('dataUsers'))
      dataUsers = [...data]
    } else {
      getUsers().then((data) => {
        localStorage.setItem('dataUsers', JSON.stringify([...data]))
        dataUsers = [...data]
        location.reload()
      })
    }
    this.divCards.innerHTML = `
    <style>
    .cards-grid{
        display:flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        gap:2rem;
    }
    
    </style>
    `

    dataUsers.forEach(({ id, email, first_name, last_name, avatar }) => {
      this.divCards.innerHTML += `
        <item-list 
         data-id=${id}
         data-first_name=${first_name}
         data-last_name=${last_name}
         data-url=${avatar}
         data-email=${email}
        >
       </item-list> 
       `
    })
  }
}

customElements.define('app-users', app)
