let fruits = [
  {id:1, title: "Яблоко", price: 20, img: "https://m.dom-eda.com/uploads/images/catalog/item/86df51de21/c25c94fe96_1000.jpg"},
  {id:2, title: "Манго", price: 50, img: "https://yesfrukt.com/storage/source/9f93a6908db208b5cf81fd540adc1ff5/product/1/7B2zZiW3DrZjuZPK4ZnI6xlgNBE0dk78.jpg"},
  {id:3, title: "Апельсин", price: 30, img: "https://zakroma.sumy.ua/image/cache/catalog/frukti/apelsin-500x500.jpg"},
]

const toHTML = fruit => `
  <div class="col">
    <div class="card" style="width: 18rem;">
      <img src="${fruit.img}" class="card-img-top" alt="${fruit.title}">
      <div class="card-body">
        <h5 class="card-title">${fruit.title}</h5>
        <a href="#" class="btn btn-primary" data-btn="price" data-id="${fruit.id}">Price</a>
        <a href="#" class="btn btn-danger" data-btn = "remove" data-id="${fruit.id}">Delit</a>
      </div>
    </div>
  </div>
`

function render() {
  const html = fruits.map(toHTML).join("")
  document.querySelector("#fruitsCards").innerHTML = html
}

render()



const priceModal = $.modal({
  title: "Price",
  closable: true,
  width: "400px",
  footerButtons: [
    {text: "close", type: "primary", handler(){
      priceModal.close()
    }},
  ]
});


document.addEventListener("click", ev => {
  ev.preventDefault()

  const btnType = ev.target.dataset.btn
  const id = +ev.target.dataset.id
  const fruit = fruits.find(f => f.id === id)
  
  if(btnType === "price") {
    priceModal.setContent(`
     <p>Цена за 1кг : <strong>${fruit.price}$</strong></p>
    `)
    priceModal.open()
  } else if (btnType === "remove") {
    $.confirm({
      title: "Вы уверены?",
      content: `<p>Вы удаляете фрукт : <strong>${fruit.title}</strong></p>`
    }).then(() => {
      fruits = fruits.filter(f => f.id !== id)
      render()
    }).catch(() => {
      console.log("cansel");
    })
    }
})

