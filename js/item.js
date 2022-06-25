class item extends HTMLElement {
  constructor() {
    super()
    let shadow = this.attachShadow({ mode: 'open' })
    this.divCard = document.createElement('div')
    this.divCard.classList.add('card')
    shadow.appendChild(this.divCard)
  }

  connectedCallback() {
    let id = this.getAttribute('data-id'),
      first_name = this.getAttribute('data-first_name'),
      last_name = this.getAttribute('data-last_name'),
      url = this.getAttribute('data-url'),
      email = this.getAttribute('data-email')

    this.divCard.innerHTML = `
    <style>
    .card{
        width: 200px;
        padding:1rem;
        cursor:pointer;
        box-shadow: 0 15px 30px 1px grey;
        background: rgba(255, 255, 255, 0.90);
	    text-align: center;
	    border-radius: 5px;
        position:relative;
    }
    .card h6{
        position:absolute;
        left:.4rem;
        top:-1rem;
        border:1px solid #5e76bf;
        color:#5e76bf;
        width:30px;
        height:30px;
        border-radius: 99%;
        display:flex;
        justify-content: center;
        align-items: center;
    }
    .card-img{
        width:200px;
        height:200px;
        object-fit: cover;
        border-radius: 99%;
    }
    .card-text{
        text-align: center;
        color:#5e76bf;
    }
    
    
    .open-modal{
        display:block;
      }
  
      .close-modal{
          display:none;
      }
    </style>
   `
    this.divCard.innerHTML += `
        <h6 class="">${id}</h6>
        <img src=${url} alt="img-${id}" class="card-img"/>
        <p class="card-text">${first_name} ${last_name}</p>
       `

    this.divCard.addEventListener('click', () => {
      const modal = document.getElementById('myModal')
      const nombre = document.getElementById('nombre')
      const apellido = document.getElementById('apellido')
      const correo = document.getElementById('correo')
      const imgUser = document.getElementById('img-usuario')
      nombre.innerHTML = first_name
      apellido.innerHTML = last_name
      correo.innerHTML = email
      imgUser.src = url
      modal.style.display = 'block'
    })
  }
}

customElements.define('item-list', item)
